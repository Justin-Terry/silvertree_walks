import React, {FC, ReactElement} from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';
import {colors} from '../theme/theme';

export interface EmptyWalkListViewProps {
  fetchError?: string;
  fetchingWalks: boolean;
}

export const EmptyWalkListView: FC<EmptyWalkListViewProps> = ({
  fetchError,
  fetchingWalks,
}: EmptyWalkListViewProps): ReactElement => {
  return (
    <View style={$emptyListContainer}>
      {fetchError ? (
        <Text style={$fetchErrorMessage}>{fetchError}</Text>
      ) : (
        <Text style={$emptyListMessage}>
          {fetchingWalks ? '' : 'No walks found'}
        </Text>
      )}
    </View>
  );
};

const $emptyListContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const $fetchErrorMessage: TextStyle = {
  color: colors.error,
};

const $emptyListMessage: TextStyle = {
  color: colors.primaryText,
};
