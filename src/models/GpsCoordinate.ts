import {Moment} from 'moment';

export type GpsCoordinate = {
  timestamp: Moment;
  latitude: number;
  longitude: number;
  altitude: number;
  horizontalAccuracy: number;
  verticalAccuracy: number;
  speed: number;
  course: number;
};
