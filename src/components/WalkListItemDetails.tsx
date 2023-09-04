import React, {FC, ReactElement, useCallback} from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';
import {colors} from '../theme/theme';
import {Walk} from '../models';
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faRoute,
  faGaugeSimple,
  faMountain,
} from '@fortawesome/free-solid-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

interface WalkListItemDetailsProps {
  walk: Walk;
}

export const WalkListItemDetails: FC<WalkListItemDetailsProps> = ({
  walk,
}: WalkListItemDetailsProps): ReactElement => {
  const renderItem = useCallback((icon: IconProp, text: string) => {
    return (
      <View style={$itemContainer}>
        <FontAwesomeIcon icon={icon} size={16} style={$itemIcon} />
        <Text style={$itemText}>{text}</Text>
      </View>
    );
  }, []);

  return (
    <View style={$container}>
      <View>
        {renderItem(faClock, `${walk.durationMinutes} minutes`)}
        {renderItem(faRoute, `${walk.distance.toFixed(2)} miles`)}
      </View>
      <View style={$secondColumn}>
        {renderItem(
          faGaugeSimple,
          `${walk.averageSpeedMph.toFixed(2)} mph (avg)`,
        )}
        {renderItem(faMountain, `${walk.elevationGain.toFixed()} ft`)}
      </View>
    </View>
  );
};

const $container: ViewStyle = {
  flexDirection: 'row',
};

const $secondColumn: ViewStyle = {
  marginLeft: 24,
};

const $itemContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
};

const $itemIcon: FontAwesomeIconStyle = {
  marginRight: 8,
  color: colors.primary,
};

const $itemText: TextStyle = {
  color: colors.primaryText,
};
