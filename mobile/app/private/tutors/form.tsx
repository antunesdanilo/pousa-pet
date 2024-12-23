import React from 'react';
import { ModalHeader } from '@/components/modalheader';
import { styles } from '@/styles';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, Text, ToastAndroid, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { CustomStatusBar } from '@/components/customstatusbar';
import { ITutorProvider } from '@/providers/interfaces/tutor.provider';
import { TutorProvider } from '@/providers/tutor.provider';
import { applyPhoneMask } from '@/utils/apply-phone-mask.util';
import { TutorCreateInput } from '@/providers/inputs/tutor-create.input';

interface ITutorFormProps {
  show: boolean;
  onClose: (lastInsertedName?: string) => void;
}

interface IForm {
  name: string;
  phoneNumber: string;
}

const tutorProvider: ITutorProvider = new TutorProvider();

const TutorForm: React.FC<ITutorFormProps> = ({ show, onClose }) => {
  const formInitialState: IForm = {
    name: '',
    phoneNumber: '',
  };

  const form = useForm<IForm>({
    values: formInitialState,
  });

  const onRegister: SubmitHandler<IForm> = (formData: IForm) => {
    const createInput: TutorCreateInput = {
      name: formData.name.trim(),
      phoneNumber: formData.phoneNumber,
    };

    tutorProvider
      .createTutor(createInput)
      .then(() => {
        ToastAndroid.show('Salvo com sucesso!', ToastAndroid.SHORT);
        form.reset();
        onClose(createInput.name);
      })
      .catch((error) => {
        let message =
          'Não foi possível salvar. Tente novamente em alguns instantes.';
        if ([400, 404].includes(error.response.status)) {
          message = error.response.data.error_description;
        }
        ToastAndroid.show(message, ToastAndroid.LONG);
      });
  };

  const handleCancel = () => {
    onClose();
    form.reset();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={handleCancel}
    >
      <CustomStatusBar />
      <ModalHeader title="Novo Tutor" requestBackAction={handleCancel} />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <Controller
              control={form.control}
              name="name"
              rules={{
                minLength: {
                  value: 6,
                  message: 'O nome do tutor deve possuir 6 caracteres ou mais',
                },
                required: 'O nome do tutor não pode ficar em branco',
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <TextInput
                      {...field}
                      label="Nome do tutor"
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

          <View style={styles.inputContainer}>
            <Controller
              control={form.control}
              name="phoneNumber"
              rules={{
                required: 'O número de telefone não pode ficar em branco',
                pattern: {
                  value: /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
                  message: 'Número de telefone inválido.',
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <TextInput
                      {...field}
                      label="Número de telefone"
                      mode="outlined"
                      style={styles.inputText}
                      value={field.value}
                      onChangeText={(text) => {
                        field.onChange(applyPhoneMask(text));
                      }}
                      onBlur={field.onBlur}
                      inputMode="numeric"
                      maxLength={15}
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
            Salvar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default TutorForm;
