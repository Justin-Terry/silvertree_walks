import {Walk} from '../models';
import React, {FC, ReactElement} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {colors} from '../theme/theme';
import {WalkListItemTitleRow} from './WalkListItemTitleRow';
import {WalkListItemDetails} from './WalkListItemDetails';
import {WalkMapView} from './WalkMapView';

interface WalkListItemProps {
  walk: Walk;
  onPress: () => void;
}

export const WalkListItem: FC<WalkListItemProps> = ({
  walk,
  onPress,
}: WalkListItemProps): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} style={$card}>
      <WalkListItemTitleRow title={walk.title} />
      <View style={$mapWrapper}>
        <WalkMapView walk={walk} />
      </View>
      <WalkListItemDetails walk={walk} />
    </TouchableOpacity>
  );
};

const $card: ViewStyle = {
  borderRadius: 8,
  padding: 16,
  backgroundColor: colors.secondaryBackground,
};

const $mapWrapper: ViewStyle = {
  height: 200,
  borderRadius: 8,
  overflow: 'hidden',
};
