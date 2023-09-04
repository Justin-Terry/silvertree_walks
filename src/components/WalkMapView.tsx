import React, {FC} from 'react';
import {Walk} from '../models';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {colors} from '../theme/theme';
import {ViewStyle} from 'react-native';

interface WalkMapViewProps {
  walk: Walk;
  interactive?: boolean;
}

export const WalkMapView: FC<WalkMapViewProps> = ({
  walk,
  interactive = false,
}: WalkMapViewProps) => {
  return (
    <MapView
      pitchEnabled={interactive}
      rotateEnabled={interactive}
      zoomEnabled={interactive}
      scrollEnabled={interactive}
      userInterfaceStyle={'light'}
      loadingEnabled={true}
      initialRegion={walk?.mapRegion}
      style={$container}>
      {walk?.polylineCoordinates && (
        <Polyline
          strokeColor={colors.primary}
          strokeWidth={3}
          coordinates={walk.polylineCoordinates}
        />
      )}
      {walk?.firstCoordinate && (
        <Marker pinColor={'green'} coordinate={walk.firstCoordinate} />
      )}
      {walk?.endCoordinate && (
        <Marker pinColor={'red'} coordinate={walk?.endCoordinate} />
      )}
    </MapView>
  );
};

const $container: ViewStyle = {
  flex: 1,
};
