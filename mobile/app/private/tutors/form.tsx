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

/**
 * Form component for registering a new tutor.
 * This form allows the user to input the tutor's name and phone number,
 * and then save it using the provided tutor provider.
 *
 * @param {ITutorFormProps} props - Properties passed to the form component.
 * @param {boolean} props.show - Flag to show or hide the form modal.
 * @param {function} props.onClose - Callback function to close the form and pass the last inserted name.
 *
 * @returns {JSX.Element} The rendered form component.
 */
const TutorForm: React.FC<ITutorFormProps> = ({ show, onClose }) => {
  const formInitialState: IForm = {
    name: '',
    phoneNumber: '',
  };

  const form = useForm<IForm>({
    values: formInitialState,
  });

  /**
   * Handles the form submission to create a new tutor.
   * The form data is passed to the tutor provider to create the tutor, and on success,
   * a success message is shown.
   *
   * @param {IForm} formData - The form data containing the tutor's name and phone number.
   */
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

  /**
   * Cancels the form and closes the modal without saving.
   */
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
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            Salvar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default TutorForm;
