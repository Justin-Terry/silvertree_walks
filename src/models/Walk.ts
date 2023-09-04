import {GpsCoordinate} from './GpsCoordinate';
import {LatLng, Region} from 'react-native-maps';
import {haversineDistanceMiles} from '../utils/haversineDistanceMiles';

export class Walk {
  coordinates: GpsCoordinate[] = [];
  polylineCoordinates: LatLng[] = [];
  distance: number = 0;
  elevationGain: number = 0;
  private minimumLatitude: number | null = null;
  private maximumLatitude: number | null = null;
  private minimumLongitude: number | null = null;
  private maximumLongitude: number | null = null;
  addCoordinate(coord: GpsCoordinate): void {
    this.coordinates.push(coord);
    this.polylineCoordinates.push({
      latitude: coord.latitude,
      longitude: coord.longitude,
    });
    this.addDistanceToLatestCoordinate();
    this.addElevationGainToLatestCoordinate();

    if (!this.minimumLatitude || coord.latitude < this.minimumLatitude) {
      this.minimumLatitude = coord.latitude;
    }

    if (!this.maximumLatitude || coord.latitude > this.maximumLatitude) {
      this.maximumLatitude = coord.latitude;
    }

    if (!this.minimumLongitude || coord.longitude < this.minimumLongitude) {
      this.minimumLongitude = coord.longitude;
    }

    if (!this.maximumLongitude || coord.longitude > this.maximumLongitude) {
      this.maximumLongitude = coord.longitude;
    }
  }

  get title(): string {
    if (this.coordinates.length > 0) {
      const timestamp = this.coordinates[0].timestamp;
      return `${timestamp.format('MM/DD/YYYY')} at ${timestamp.format(
        'hh:mm A',
      )}`;
    }
    return '';
  }

  get durationMinutes(): number {
    if (this.coordinates.length > 0) {
      const startTimestamp = this.coordinates[0].timestamp;
      const endTimestamp =
        this.coordinates[this.coordinates.length - 1].timestamp;
      return endTimestamp.diff(startTimestamp, 'minutes');
    }
    return 0;
  }

  get averageSpeedMph(): number {
    if (this.distance > 0 && this.coordinates.length > 1) {
      const startTimestamp = this.coordinates[0].timestamp;
      const endTimestamp =
        this.coordinates[this.coordinates.length - 1].timestamp;
      const hoursBetweenCoordinates =
        endTimestamp.diff(startTimestamp, 'minutes') / 60.0;
      return this.distance / hoursBetweenCoordinates;
    }

    return 0;
  }

  get mapRegion(): Region | undefined {
    if (
      !this.minimumLatitude ||
      !this.minimumLongitude ||
      !this.maximumLatitude ||
      !this.maximumLongitude
    ) {
      return;
    }

    const averageLatitude = (this.minimumLatitude + this.maximumLatitude) / 2.0;
    const averageLongitude =
      (this.minimumLongitude + this.maximumLongitude) / 2.0;
    const latitudeDelta = this.maximumLatitude - this.minimumLatitude;
    const longitudeDelta = this.maximumLongitude - this.minimumLongitude;

    return {
      latitude: averageLatitude,
      longitude: averageLongitude,
      latitudeDelta: latitudeDelta * 1.1,
      longitudeDelta: longitudeDelta * 1.1,
    };
  }

  get firstCoordinate(): LatLng | null {
    if (this.polylineCoordinates.length > 0) {
      return {
        latitude: this.polylineCoordinates[0].latitude,
        longitude: this.polylineCoordinates[0].longitude,
      };
    }
    return null;
  }
  get endCoordinate(): LatLng | null {
    if (this.polylineCoordinates.length > 0) {
      return {
        latitude:
          this.polylineCoordinates[this.polylineCoordinates.length - 1]
            .latitude,
        longitude:
          this.polylineCoordinates[this.polylineCoordinates.length - 1]
            .longitude,
      };
    }
    return null;
  }

  private addDistanceToLatestCoordinate(): void {
    if (this.coordinates.length < 2) {
      return;
    }

    const latestCoordinate = this.coordinates[this.coordinates.length - 1];
    const previousCoordinate = this.coordinates[this.coordinates.length - 2];

    const distance = haversineDistanceMiles(
      previousCoordinate,
      latestCoordinate,
    );
    this.distance += distance;
  }

  private addElevationGainToLatestCoordinate(): void {
    if (this.coordinates.length < 2) {
      return;
    }

    const latestCoordinate = this.coordinates[this.coordinates.length - 1];
    const previousCoordinate = this.coordinates[this.coordinates.length - 2];

    const elevationGain =
      latestCoordinate.altitude - previousCoordinate.altitude;
    if (elevationGain > 0) {
      this.elevationGain += elevationGain;
    }
  }
}
