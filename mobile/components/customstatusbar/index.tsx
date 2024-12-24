import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface ICustomStatusBarProps {
  backgroundColor?: string;
}

/**
 * CustomStatusBar component
 *
 * This component is a wrapper around the StatusBar from Expo that dynamically adjusts
 * the status bar style based on the system's color scheme (dark or light mode).
 * It also allows customization of the background color of the status bar.
 *
 * @param {Object} props - The component's props.
 * @param {string} [props.backgroundColor='#FFFFFF'] - The background color for the status bar (default is white).
 *
 * @returns {JSX.Element} A StatusBar component with dynamic styling based on the current theme.
 *
 * @example
 * <CustomStatusBar backgroundColor="#FF5733" />
 */
const CustomStatusBar: React.FC<ICustomStatusBarProps> = ({
  backgroundColor = '#FFFFFF',
}) => {
  const testID = 'status-bar';
  const scheme = useColorScheme();

  return (
    <StatusBar
      {...(testID ? { testID } : {})}
      backgroundColor={backgroundColor}
      style={scheme === 'dark' ? 'dark' : 'auto'}
    />
  );
};

export { CustomStatusBar };
