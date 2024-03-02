import { useCallback } from 'react';
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { GoalList } from './src/Goals/GoalList';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/CoreState/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { containerLight } from "./src/theme";
import { MenuProvider } from 'react-native-popup-menu';
import { ToastProvider } from 'react-native-toast-notifications';
import { useFonts } from 'expo-font';
import { Tinos_400Regular } from '@expo-google-fonts/tinos';

export default function App() {
    
  const [fontsLoaded, fontError] = useFonts({
    'ArchitectsDaughter_400Regular': require('./assets/fonts/ArchitectsDaughter-Regular.ttf'),
    'CedarvilleCursive_400Regular': require('./assets/fonts/CedarvilleCursive-Regular.ttf'),
    'IndieFlower_400Regular': require('./assets/fonts/IndieFlower-Regular.ttf'),
    'NothingYouCouldDo_Regular': require('./assets/fonts/NothingYouCouldDo-Regular.ttf'),
    'PatrickHandSC_400Regular': require('./assets/fonts/PatrickHandSC-Regular.ttf'),
    'ReenieBeanie_400Regular': require('./assets/fonts/ReenieBeanie-Regular.ttf'),
    'SueEllenFrancisco_400Regular': require('./assets/fonts/SueEllenFrancisco-Regular.ttf'),
    Tinos_400Regular,
    'WaitingfortheSunrise_400Regular': require('./assets/fonts/WaitingfortheSunrise-Regular.ttf'),
    'Zeyada_400Regular': require('./assets/fonts/Zeyada-Regular.ttf'),
  });

  return (
    <SafeAreaProvider style={styles.tabNavigator}>
    <MenuProvider>
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <View style={containerLight}>
            <GoalList/>
            <ExpoStatusBar style="auto" />
          </View>
        </PersistGate>
      </Provider>
    </ToastProvider>
    </MenuProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabNavigator: {
    marginTop: StatusBar.currentHeight,
  },
});
