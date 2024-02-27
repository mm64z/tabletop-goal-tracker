import { StyleSheet, Text, StatusBar, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { GoalList } from './src/Goals/GoalList';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/CoreState/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { containerLight } from "./theme";
import { MenuProvider } from 'react-native-popup-menu';
import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
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
