import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {Parser, ParseStepResult} from 'papaparse';
import {usePapaParse} from 'react-papaparse';
import {GpsCoordinate, Walk} from '../models';
import {
  COORDINATE_TIME_FORMAT,
  MAX_MINUTES_BETWEEN_COORDINATES,
  WALKS_FILE_URL,
} from '../utils/AppConstants';
import moment from 'moment';
import {validateGpsCoordinate} from '../utils/validation';
interface WalksContextType {
  fetchWalks: () => void;
  fetchingWalks: boolean;
  fetchError?: string;
  walks: Walk[];
}

const initialWalksContext: WalksContextType = {
  fetchWalks: () => {},
  fetchingWalks: false,
  walks: [],
};

export const WalksContext =
  createContext<WalksContextType>(initialWalksContext);
const WalksContextProvider: React.FunctionComponent<{
  children: ReactNode;
}> = ({children}: {children: ReactNode}) => {
  const [fetchingWalks, setFetchingWalks] = useState<boolean>(false);
  const [walks, setWalks] = useState<Walk[]>([]);
  const [fetchError, setfetchError] = useState<string>();
  const {readRemoteFile} = usePapaParse();

  const handleParsingError = useCallback(() => {
    // In a real world application I would provide a more user-friendly error message
    setfetchError('Failed to fetch walks');
    setFetchingWalks(false);
    setWalks([]);
  }, []);

  const fetchWalks = useCallback(async () => {
    setFetchingWalks(true);
    setWalks([]);
    setfetchError(undefined);

    const allWalks: Walk[] = [];
    let currentIndex: number = -1;
    let lastCoordinate: GpsCoordinate;
    let rowError: Error;

    readRemoteFile(WALKS_FILE_URL, {
      download: true,
      header: true,
      delimiter: ';',
      dynamicTyping: true,
      step(
        {data: coordinate}: ParseStepResult<GpsCoordinate>,
        parser: Parser,
      ): void {
        if (!validateGpsCoordinate(coordinate)) {
          // Calling parser.abort() causes the complete callback to be called immediately but this error is not
          // passed to it since the parser is not the one throwing it. So I'm setting the error here so that the
          // complete callback can handle it.
          rowError = new Error('Invalid coordinate');

          // In a real world application I would skip this row and continue parsing but for the sake of simplicity
          // I'm aborting the parsing as the data set provided does not have any invalid rows.
          parser.abort();
          return;
        }

        // Papaparse struggles to convert timestamps in this format so do it manually
        coordinate.timestamp = moment(
          coordinate.timestamp,
          COORDINATE_TIME_FORMAT,
        );

        const startNewWalk =
          !lastCoordinate ||
          moment
            .duration(coordinate.timestamp.diff(lastCoordinate.timestamp))
            .asMinutes() > MAX_MINUTES_BETWEEN_COORDINATES;

        if (startNewWalk) {
          allWalks[++currentIndex] = new Walk();
        }

        allWalks[currentIndex].addCoordinate(coordinate);
        lastCoordinate = coordinate;
      },
      error(_: Error) {
        handleParsingError();
      },
      complete(): void {
        if (rowError) {
          handleParsingError();
        } else {
          setWalks([...allWalks]);
          setFetchingWalks(false);
        }
      },
    });
  }, [handleParsingError, readRemoteFile]);

  useEffect(() => {
    fetchWalks().then();
  }, [fetchWalks]);

  return (
    <WalksContext.Provider
      value={{fetchWalks, walks, fetchingWalks, fetchError}}>
      {children}
    </WalksContext.Provider>
  );
};
export default WalksContextProvider;
