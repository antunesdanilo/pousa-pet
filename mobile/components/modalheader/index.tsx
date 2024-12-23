import { useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface IModalHeaderProps {
  title: string;
  requestBackAction?: () => void;
}

const ModalHeader: React.FC<IModalHeaderProps> = ({
  title,
  requestBackAction,
}) => {
  const router = useRouter();

  return (
    <Appbar.Header
      style={{
        marginTop: -30,
        elevation: 3, // Sombras em Android
        shadowColor: '#000', // Sombras em iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        zIndex: 1,
      }}
    >
      <Appbar.BackAction onPress={requestBackAction} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export { ModalHeader };
