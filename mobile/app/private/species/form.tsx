import React from 'react';
import { ModalHeader } from '@/components/modalheader';
import { styles } from '@/styles';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, Text, ToastAndroid, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { CustomStatusBar } from '@/components/customstatusbar';
import { ISpeciesProvider } from '@/providers/interfaces/species.provider';
import { SpeciesProvider } from '@/providers/species.provider';
import { SpeciesCreateInput } from '@/providers/inputs/species-create.input';

interface ISpeciesFormProps {
  show: boolean;
  onClose: (lastInsertedName?: string) => void;
}

interface IForm {
  name: string;
}

const speciesProvider: ISpeciesProvider = new SpeciesProvider();

const SpeciesForm: React.FC<ISpeciesFormProps> = ({ show, onClose }) => {
  const formInitialState: IForm = {
    name: '',
  };

  const form = useForm<IForm>({
    values: formInitialState,
  });

  const onRegister: SubmitHandler<IForm> = (formData: IForm) => {
    const createInput: SpeciesCreateInput = {
      name: formData.name.trim(),
    };

    speciesProvider
      .createSpecies(createInput)
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
      <ModalHeader title="Nova Espécie" requestBackAction={handleCancel} />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <Controller
              control={form.control}
              name="name"
              rules={{
                minLength: {
                  value: 3,
                  message:
                    'O nome da espécie deve possuir 3 caracteres ou mais',
                },
                required: 'O nome da espécie não pode ficar em branco',
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <TextInput
                      {...field}
                      label="Nome da espécie"
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
            Salvar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export { SpeciesForm };