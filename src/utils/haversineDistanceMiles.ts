import {GpsCoordinate} from '../models';

const EARTH_RADIUS_MILES = 3958.8;

function toRadian(degree: number) {
  return (degree * Math.PI) / 180;
}

function distanceBetweenCoords(latOrLonA: number, latOrLonB: number): number {
  return (Math.PI / 180) * (latOrLonB - latOrLonA);
}

/**
 * Calculates the distance between two GPS coordinates using the Haversine formula.
 * a = sin²(φB - φA/2) + cos φA * cos φB * sin²(λB - λA/2)
 * c = 2 * atan2( √a, √(1−a) )
 * d = R ⋅ c
 * @param coord1 represents φA
 * @param coord2 represents φB
 */

export function haversineDistanceMiles(
  coord1: GpsCoordinate,
  coord2: GpsCoordinate,
): number {
  const deltaLatitude = distanceBetweenCoords(coord1.latitude, coord2.latitude);
  const deltaLongitude = distanceBetweenCoords(
    coord1.longitude,
    coord2.longitude,
  );
  const latitude1Radians = toRadian(coord1.latitude);
  const latitude2Radians = toRadian(coord2.latitude);

  const a =
    Math.pow(Math.sin(deltaLatitude / 2), 2) +
    Math.pow(Math.sin(deltaLongitude / 2), 2) *
      Math.cos(latitude1Radians) *
      Math.cos(latitude2Radians);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_MILES * c;
}
