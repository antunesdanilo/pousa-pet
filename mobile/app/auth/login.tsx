import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectUser,
  login,
  UserSliceState,
  setLastRegisteredName,
} from '@/reducers/user.slice';
import { Text, ToastAndroid, View } from 'react-native';
import { useRouter } from 'expo-router';
import { IUserProvider } from '@/providers/interfaces/user.provider';
import { UserProvider } from '@/providers/user.provider';
import { UserDto } from '@/providers/dtos/user.dto';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import { styles } from '@/styles';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Skeleton } from '@/components/skeleton';

const userProvider: IUserProvider = new UserProvider();

/**
 * @file Login component that allows the user to select an existing user for login or create a new account.
 *
 * This component manages user state and user selection, and controls the navigation flow based on the user's choice.
 *
 * @component
 */

/**
 * The Login component allows the user to select an existing user for login or create a new account.
 *
 * @function
 * @returns {JSX.Element} - The rendered Login component.
 */
const Login = () => {
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [users, setUsers] = useState<UserDto[]>([]);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { user, lastRegisteredName } =
    useAppSelector<UserSliceState>(selectUser);

  useEffect(() => {
    if (users.length && lastRegisteredName) {
      let user = users.find((u) => u.name === lastRegisteredName);
      if (user) {
        dispatch(setLastRegisteredName(undefined));
        setUserId(user.userId);
      }
    } else if (user) {
      setUserId(user.userId);
    }
  }, [users, user, lastRegisteredName]);

  useEffect(() => {
    setIsLoading(false);
    userProvider
      .getUsers()
      .then((users: UserDto[]) => {
        setIsLoading(false);
        setUsers(users);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [isFocused]);

  /**
   * Function to handle user login by checking if a user is selected and redirecting to the home page.
   *
   * @param {string} [userId] - The ID of the user to be logged in.
   */
  const handleLogin = (userId?: string) => {
    let user: UserDto | undefined;
    if (userId) {
      user = users.find((u) => u.userId === userId);
    }

    if (!user) {
      ToastAndroid.show(
        'É necessário selecionar um usuário',
        ToastAndroid.SHORT,
      );
      return;
    }

    dispatch(login(user));
    router.push('/private/home');
  };

  return (
    <View
      style={{
        ...styles.containerPadding,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        paddingBottom: 60,
      }}
    >
      <Image
        source={require('../../assets/images/logo.png')}
        style={{
          width: '30%',
          aspectRatio: 1.5,
          marginBottom: 50,
        }}
      />

      <Text style={{ fontSize: 26, marginBottom: 80 }}>
        Seja bem-vindo de volta!
      </Text>

      <View style={styles.fullWidth}>
        <Text style={{ ...styles.fullWidth, fontSize: 16 }}>
          Selecione um usuário para prosseguir:
        </Text>

        {isLoading ? (
          <Skeleton
            style={{
              width: '100%',
              height: 55,
              marginTop: 20,
            }}
          />
        ) : (
          <View style={{ ...styles.nativePicker, marginTop: 10 }}>
            <Picker
              key={userId}
              selectedValue={userId}
              onValueChange={(item) => setUserId(item)}
            >
              <Picker.Item label="" value="" key="" />
              {users.map((user) => (
                <Picker.Item
                  label={user.name}
                  value={user.userId}
                  key={user.userId}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>

      <Button
        mode="contained"
        onPress={() => handleLogin(userId)}
        style={{ marginTop: 30 }}
      >
        Continuar
      </Button>

      <Button mode="contained" onPress={() => router.push('/auth/register')}>
        Criar Conta
      </Button>
    </View>
  );
};

export default Login;
