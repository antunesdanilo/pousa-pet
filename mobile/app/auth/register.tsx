import React from 'react';
import { UserCreateInput } from '@/providers/inputs/user-create.input';
import { IUserProvider } from '@/providers/interfaces/user.provider';
import { UserProvider } from '@/providers/user.provider';
import { styles } from '@/styles';
import { Image } from 'expo-image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Text, ToastAndroid, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks';
import { cleanUser, setLastRegisteredName } from '@/reducers/user.slice';

interface IForm {
  name: string;
}

const userProvider: IUserProvider = new UserProvider();

const Register = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const formInitialState: IForm = {
    name: '',
  };

  const form = useForm<IForm>({
    values: formInitialState,
  });

  const onRegister: SubmitHandler<IForm> = (form: IForm) => {
    const createInput: UserCreateInput = {
      name: form.name,
    };

    userProvider
      .createUser(createInput)
      .then(() => {
        ToastAndroid.show('Cadastrado com sucesso!', ToastAndroid.SHORT);
        dispatch(setLastRegisteredName(createInput.name));
        dispatch(cleanUser());
        router.push('/auth/login');
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.LONG);
      });
  };

  return (
    <View
      style={{
        ...styles.container,
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

      <Text style={{ ...styles.heading1, marginBottom: 20 }}>CADASTRO</Text>

      <View style={styles.inputContainer}>
        <Controller
          control={form.control}
          name="name"
          rules={{
            minLength: {
              value: 6,
              message: 'O nome do usuário deve possuir 6 caracteres ou mais',
            },
            required: 'O nome do usuário não pode ficar em branco',
          }}
          render={({ field, fieldState }) => {
            return (
              <>
                <TextInput
                  {...field}
                  label="Nome completo"
                  mode="outlined"
                  style={styles.inputText}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                {fieldState?.error && (
                  <Text style={styles.inputError}>
                    {fieldState.error.message}
                  </Text>
                )}
              </>
            );
          }}
        />
      </View>

      <Button
        mode="contained"
        style={{ marginTop: 30 }}
        onPress={form.handleSubmit(onRegister)}
      >
        Cadastrar
      </Button>

      <Button mode="outlined" style={{ marginTop: 15 }} onPress={router.back}>
        Voltar
      </Button>
    </View>
  );
};

export default Register;
