import {FlatList, RefreshControl, View, ViewStyle} from 'react-native';
import React, {FC, ReactElement, useCallback, useContext, useMemo} from 'react';
import {WalksContext} from '../context/WalksContext';
import {WalkListItem} from '../components/WalkListItem';
import {MainNavigationStackScreenProps} from '../navigation/MainNavigationStack';
import {colors} from '../theme/theme';
import {EmptyWalkListView} from '../components/EmptyWalkListView';

interface WalksListScreenProps
  extends MainNavigationStackScreenProps<'WalksListScreen'> {}

export const WalksListScreen: FC<WalksListScreenProps> = ({
  navigation,
}: WalksListScreenProps): ReactElement => {
  const {walks, fetchingWalks, fetchWalks, fetchError} =
    useContext(WalksContext);

  const refreshControl = useMemo(
    () => <RefreshControl refreshing={fetchingWalks} onRefresh={fetchWalks} />,
    [fetchWalks, fetchingWalks],
  );

  const onWalkItemPressed = useCallback(
    (index: number) => {
      navigation.navigate('WalkDetailsScreen', {walkIndex: index});
    },
    [navigation],
  );

  const itemSeparatorComponent = useMemo(
    () => <View style={$itemSeparator} />,
    [],
  );

  return (
    <FlatList
      contentContainerStyle={$listContainer}
      style={$list}
      data={walks}
      refreshControl={refreshControl}
      ItemSeparatorComponent={() => itemSeparatorComponent}
      ListEmptyComponent={
        <EmptyWalkListView
          fetchError={fetchError}
          fetchingWalks={fetchingWalks}
        />
      }
      renderItem={({item, index}) => (
        <WalkListItem
          onPress={() => onWalkItemPressed(index)}
          key={item.title}
          walk={item}
        />
      )}
    />
  );
};

const $list: ViewStyle = {
  backgroundColor: colors.primaryBackground,
};

const $listContainer: ViewStyle = {
  padding: 16,
  backgroundColor: colors.primaryBackground,
};

const $itemSeparator: ViewStyle = {
  height: 16,
};
