import React, {FC, ReactElement} from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome';
import {faPersonWalking} from '@fortawesome/free-solid-svg-icons/faPersonWalking';
import {colors} from '../theme/theme';

interface WalkListItemTitleProps {
  title: string;
}

export const WalkListItemTitleRow: FC<WalkListItemTitleProps> = ({
  title,
}: WalkListItemTitleProps): ReactElement => {
  return (
    <View style={$container}>
      <View style={$iconWrapper}>
        <FontAwesomeIcon style={$icon} icon={faPersonWalking} size={24} />
      </View>
      <Text style={$title}>{title}</Text>
    </View>
  );
};

const $container: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
};

const $title: TextStyle = {
  fontSize: 18,
  marginBottom: 8,
  color: colors.primary,
};

const $icon: FontAwesomeIconStyle = {
  color: colors.primaryBackground,
};

const $iconWrapper: ViewStyle = {
  padding: 8,
  backgroundColor: colors.primary,
  borderRadius: 100,
  marginRight: 8,
};
