import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingList: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginVertical: 'auto',
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <ActivityIndicator size={30} />
    </View>
  );
};

export { LoadingList };
