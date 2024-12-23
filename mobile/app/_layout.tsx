import { Provider } from 'react-redux';
import { store } from '../store';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Layout: React.FC = () => {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
        <StatusBar
          backgroundColor="FFFFFF"
          style={scheme === 'dark' ? 'dark' : 'auto'}
        />
        <Provider store={store}>
          <Slot />
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Layout;
