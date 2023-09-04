import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {WalksListScreen} from '../screens/WalksListScreen';
import {WalkDetailsScreen} from '../screens/WalkDetailsScreen';
import {colors} from '../theme/theme';

export type MainNavigationStackParamsList = {
  WalksListScreen: undefined;
  WalkDetailsScreen: {
    walkIndex: number;
  };
};

export type MainNavigationStackScreenProps<
  T extends keyof MainNavigationStackParamsList,
> = NativeStackScreenProps<MainNavigationStackParamsList, T>;

export const MainNavigationStack = () => {
  const Stack = createNativeStackNavigator<MainNavigationStackParamsList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.primaryBackground,
        },
        headerTitleStyle: {
          color: colors.primaryText,
        },
      }}>
      <Stack.Screen
        name="WalksListScreen"
        component={WalksListScreen}
        options={{title: 'Walks'}}
      />
      <Stack.Screen
        name={'WalkDetailsScreen'}
        component={WalkDetailsScreen}
        options={{title: 'Walk Details'}}
      />
    </Stack.Navigator>
  );
};
