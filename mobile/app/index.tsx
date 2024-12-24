import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks';
import { selectUser, UserSliceState } from '@/reducers/user.slice';
import { Image } from 'expo-image';

/**
 * Splash screen component that displays a welcome message and logo while checking if the user is authenticated.
 * After a brief loading period, it navigates the user to either the home screen or the login screen based on authentication status.
 *
 * @returns {JSX.Element} The rendered splash screen component.
 */
const Splash: React.FC = () => {
  // Get the authentication status from Redux store
  const { isAuthenticated } = useAppSelector<UserSliceState>(selectUser);

  // Local state to manage the loading indicator visibility
  const [isLoading, setIsLoading] = useState(true);

  // Router instance from expo-router to navigate between screens
  const router = useRouter();

  useEffect(() => {
    // Set a timeout to simulate a loading screen for 2 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up timeout when the component is unmounted
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    // After loading is finished, navigate based on the authentication status
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
