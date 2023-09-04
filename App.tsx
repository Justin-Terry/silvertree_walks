import React, {JSX} from 'react';
import {SafeAreaView, ViewStyle} from 'react-native';

import WalksContextProvider from './src/context/WalksContext';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigationStack} from './src/navigation/MainNavigationStack';

function AppContent(): JSX.Element {
  return (
    <SafeAreaView style={$appContainer}>
      <MainNavigationStack />
    </SafeAreaView>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <WalksContextProvider>
        <AppContent />
      </WalksContextProvider>
    </NavigationContainer>
  );
}

export default App;

const $appContainer: ViewStyle = {
  flex: 1,
};
