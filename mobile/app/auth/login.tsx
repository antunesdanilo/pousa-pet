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

const userProvider: IUserProvider = new UserProvider();

const Login = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

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
    userProvider
      .getUsers()
      .then((users: UserDto[]) => {
        setUsers(users);
      })
      .catch((error) => console.error(error));
  }, []);

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
        ...styles.container,
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

        <View style={{ ...styles.nativePicker, marginTop: 10 }}>
          <Picker
            key={userId}
            selectedValue={userId}
            onValueChange={(item) => setUserId(item)}
            style={styles.nativePicker}
          >
            {users.map((user) => (
              <Picker.Item
                label={user.name}
                value={user.userId}
                key={user.userId}
              />
            ))}
          </Picker>
        </View>
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
