import {GpsCoordinate} from '../models';

export const validateGpsCoordinate = (gpsCoordinate: GpsCoordinate) => {
  return (
    typeof gpsCoordinate.timestamp !== 'undefined' &&
    typeof gpsCoordinate.altitude !== 'undefined' &&
    typeof gpsCoordinate.speed !== 'undefined' &&
    typeof gpsCoordinate.course !== 'undefined' &&
    typeof gpsCoordinate.horizontalAccuracy !== 'undefined' &&
    typeof gpsCoordinate.verticalAccuracy !== 'undefined' &&
    typeof gpsCoordinate.latitude !== 'undefined' &&
    typeof gpsCoordinate.longitude !== 'undefined'
  );
};
