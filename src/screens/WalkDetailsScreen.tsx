import React, {FC, useContext, useMemo} from 'react';
import {
  MainNavigationStackParamsList,
  MainNavigationStackScreenProps,
} from '../navigation/MainNavigationStack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {WalksContext} from '../context/WalksContext';
import {WalkListItemDetails} from '../components/WalkListItemDetails';
import {View, ViewStyle} from 'react-native';
import {WalkMapView} from '../components/WalkMapView';

type WalkDetailsScreenProps =
  MainNavigationStackScreenProps<'WalkDetailsScreen'>;

export const WalkDetailsScreen: FC<WalkDetailsScreenProps> = ({
  navigation,
}: WalkDetailsScreenProps) => {
  const {walks} = useContext(WalksContext);
  const {params} =
    useRoute<RouteProp<MainNavigationStackParamsList, 'WalkDetailsScreen'>>();

  const walk = useMemo(() => {
    if (walks.length > params.walkIndex) {
      return walks[params.walkIndex];
    } else {
      navigation.goBack();
      return null;
    }
  }, [walks, params.walkIndex, navigation]);

  return walk ? (
    <View style={$container}>
      <WalkMapView walk={walk} interactive />
      <View style={$detailsWrapper}>
        <WalkListItemDetails walk={walk} />
      </View>
    </View>
  ) : null;
};

const $container: ViewStyle = {
  flex: 1,
};

const $detailsWrapper: ViewStyle = {
  paddingBottom: 16,
  paddingTop: 8,
  alignItems: 'center',
};
