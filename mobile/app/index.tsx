import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks';
import { selectUser, UserSliceState } from '@/reducers/user.slice';
import { Image } from 'expo-image';

const Splash: React.FC = () => {
  const { isAuthenticated } = useAppSelector<UserSliceState>(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!isLoading && isAuthenticated) {
        router.push('/private/home');
      } else if (!isLoading) {
        router.push('/auth/login');
      }
    });
  }, [isAuthenticated, isLoading]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        paddingBottom: 50,
      }}
    >
      <Image
        source={require('../assets/images/logo.png')}
        style={{
          width: '60%',
          aspectRatio: 1.5,
        }}
      />
      <Text style={{ fontSize: 30, textAlign: 'center' }}>
        Bem-vindo ao PousaPet!
      </Text>
      <Text
        style={{ fontSize: 22, textAlign: 'center', paddingHorizontal: 40 }}
      >
        Cuidando do seu pet com carinho e conforto.
      </Text>

      <ActivityIndicator
        size="large"
        color="#007BFF"
        style={{ marginTop: 70 }}
      />
    </View>
  );
};

export default Splash;
