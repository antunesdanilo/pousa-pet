import React, { useEffect, useState } from 'react';
import { ModalHeader } from '@/components/modalheader';
import { styles } from '@/styles';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Modal,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { CustomStatusBar } from '@/components/customstatusbar';
import { IBreedProvider } from '@/providers/interfaces/breed.provider';
import { BreedProvider } from '@/providers/breed.provider';
import { BreedCreateInput } from '@/providers/inputs/breed-create.input';
import { Picker } from '@react-native-picker/picker';
import { ISpeciesProvider } from '@/providers/interfaces/species.provider';
import { SpeciesProvider } from '@/providers/species.provider';
import { useIsFocused } from '@react-navigation/native';
import { SpeciesDto } from '@/providers/dtos/species.dto';
import { SpeciesForm } from '../species/form';

interface IBreedFormProps {
  show: boolean;
  onClose: (lastInsertedName?: string) => void;
  speciesId?: string;
}

interface IForm {
  speciesId: string;
  name: string;
}

const breedProvider: IBreedProvider = new BreedProvider();
const speciesProvider: ISpeciesProvider = new SpeciesProvider();

const BreedForm: React.FC<IBreedFormProps> = ({ show, onClose, speciesId }) => {
  const isFocused = useIsFocused();

  const [species, setSpecies] = useState<SpeciesDto[]>([]);
  const [showSpeciesForm, setShowSpeciesForm] = useState<boolean>(false);

  const formInitialState: IForm = {
    speciesId: '',
    name: '',
  };

  const form = useForm<IForm>({
    values: formInitialState,
    shouldFocusError: false,
  });

  useEffect(() => {
    if (speciesId) {
      form.setValue('speciesId', speciesId);
      form.trigger('speciesId');
    }
  }, [speciesId]);

  useEffect(() => {
    if (isFocused) {
      getSpecies();
    }
  }, [isFocused]);

  const getSpecies = (nameOfSpecieToSelect?: string) => {
    speciesProvider
      .getSpecies()
      .then((species: SpeciesDto[]) => {
        setSpecies(species);
        if (nameOfSpecieToSelect) {
          const specie = species.find((s) => s.name === nameOfSpecieToSelect);
          if (specie) {
            form.setValue('speciesId', specie.speciesId);
            form.trigger('speciesId');
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onRegister: SubmitHandler<IForm> = (formData: IForm) => {
    const createInput: BreedCreateInput = {
      speciesId: formData.speciesId,
      name: formData.name.trim(),
    };

    breedProvider
      .createBreed(createInput)
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
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={handleCancel}
      >
        <CustomStatusBar />
        <ModalHeader title="Nova Raça" requestBackAction={handleCancel} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.selectLabel}>Selecione uma espécie:</Text>
              <Controller
                control={form.control}
                name="speciesId"
                rules={{
                  required: 'Uma espécie deve ser selecionada',
                  minLength: {
                    value: 5,
                    message: 'Uma espécie deve ser selecionada',
                  },
                }}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <View style={{ ...styles.nativePicker, marginTop: 10 }}>
                        <Picker
                          {...field}
                          selectedValue={field.value}
                          onValueChange={field.onChange}
                          onBlur={field.onBlur}
                        >
                          <Picker.Item
                            label=""
                            value={'0'}
                            key={Math.random()}
                          />
                          {species.map((specie) => (
                            <Picker.Item
                              label={specie.name}
                              value={specie.speciesId}
                              key={specie.speciesId}
                            />
                          ))}
                        </Picker>
                      </View>

                      <Text style={styles.linkToFormLabel}>
                        Não encontrou a espécie na lista?
                        <TouchableOpacity
                          onPress={() => setShowSpeciesForm(true)}
                        >
                          <Text style={styles.linkToForm}>
                            Clique aqui para cadastrar.
                          </Text>
                        </TouchableOpacity>
                      </Text>

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
                name="name"
                rules={{
                  minLength: {
                    value: 3,
                    message: 'O nome da raça deve possuir 3 caracteres ou mais',
                  },
                  required: 'O nome da raça não pode ficar em branco',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <TextInput
                        {...field}
                        label="Nome da raça"
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

      <SpeciesForm
        show={showSpeciesForm}
        onClose={(lastInsertedName?: string) => {
          setShowSpeciesForm(false);
          if (lastInsertedName) {
            getSpecies(lastInsertedName);
          }
        }}
      />
    </>
  );
};

export default BreedForm;
