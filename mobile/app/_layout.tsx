import { Provider } from 'react-redux';
import { store } from '../store';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

/**
 * Layout component wraps the entire app in necessary providers.
 * It ensures that the app uses the Redux store, handles safe area insets, and manages status bar appearance.
 * The component adapts to light and dark color schemes for better user experience.
 *
 * @returns {JSX.Element} The rendered layout component with global providers.
 */
const Layout: React.FC = () => {
  // Gets the current color scheme (light or dark)
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
        <StatusBar
          backgroundColor="FFFFFF"
          style={scheme === 'dark' ? 'dark' : 'auto'}
        />
        {/* Provider to make Redux store available throughout the app */}
        <Provider store={store}>
          {/* Slot component renders the child routes */}
          <Slot />
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Layout;
