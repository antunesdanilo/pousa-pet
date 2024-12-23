import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface ICustomStatusBarProps {
  backgroundColor?: string;
}

const CustomStatusBar: React.FC<ICustomStatusBarProps> = ({
  backgroundColor = '#FFFFFF',
}) => {
  const scheme = useColorScheme();

  return (
    <StatusBar
      backgroundColor={backgroundColor}
      style={scheme === 'dark' ? 'dark' : 'auto'}
    />
  );
};

export { CustomStatusBar };
