import React, { useEffect, useMemo, useState } from 'react';
import { ModalHeader } from '@/components/modalheader';
import { IPetProvider } from '@/providers/interfaces/pet.provider';
import { PetProvider } from '@/providers/pet.provider';
import { styles } from '@/styles';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Modal,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { CustomStatusBar } from '@/components/customstatusbar';
import { ITutorProvider } from '@/providers/interfaces/tutor.provider';
import { ISpeciesProvider } from '@/providers/interfaces/species.provider';
import { IBreedProvider } from '@/providers/interfaces/breed.provider';
import { TutorProvider } from '@/providers/tutor.provider';
import { SpeciesProvider } from '@/providers/species.provider';
import { BreedProvider } from '@/providers/breed.provider';
import { TutorDto } from '@/providers/dtos/tutor.dto';
import { SpeciesDto } from '@/providers/dtos/species.dto';
import { BreedDto } from '@/providers/dtos/breed.dto';
import { Picker } from '@react-native-picker/picker';
import { SpeciesForm } from '../species/form';
import { useIsFocused } from '@react-navigation/native';
import BreedForm from '../breeds/form';
import TutorForm from '../tutors/form';
import { PetCreateInput } from '@/providers/inputs/pet-create.input';

interface IPetFormProps {
  show: boolean;
  onClose: (lastInsertedName?: string) => void;
}

interface IForm {
  speciesId: string;
  breedId: string;
  tutorId: string;
  name: string;
}

const petProvider: IPetProvider = new PetProvider();
const tutorProvider: ITutorProvider = new TutorProvider();
const speciesProvider: ISpeciesProvider = new SpeciesProvider();
const breedProvider: IBreedProvider = new BreedProvider();

const PetForm: React.FC<IPetFormProps> = ({ show, onClose }) => {
  const [tutors, setTutors] = useState<TutorDto[]>([]);
  const [species, setSpecies] = useState<SpeciesDto[]>([]);
  const [breeds, setBreeds] = useState<BreedDto[]>([]);

  const [showTutorForm, setShowTutorForm] = useState<boolean>(false);
  const [showSpeciesForm, setShowSpeciesForm] = useState<boolean>(false);
  const [showBreedForm, setShowBreedForm] = useState<boolean>(false);

  const formInitialState: IForm = {
    speciesId: '',
    breedId: '',
    tutorId: '',
    name: '',
  };

  const form = useForm<IForm>({
    values: formInitialState,
    shouldFocusError: false,
  });

  const breedsFiltered = useMemo(() => {
    if (form.getValues('speciesId') && breeds.length) {
      const bF = breeds.filter(
        (b) => b.speciesId === form.getValues('speciesId'),
      );
      return bF;
    }
    return [];
  }, [breeds, form.watch('speciesId')]);

  useEffect(() => {
    if (show) {
      getTutors();
      getSpecies();
      getBreeds();
    }
  }, [show]);

  const getTutors = (nameOfTutorToSelect?: string) => {
    tutorProvider
      .getTutors()
      .then((tutors: TutorDto[]) => {
        setTutors(tutors);
        if (nameOfTutorToSelect) {
          const tutor = tutors.find((t) => t.name === nameOfTutorToSelect);
          if (tutor) {
            form.setValue('tutorId', tutor.tutorId);
            form.trigger('tutorId');
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getSpecies = (nameOfSpeciesToSelect?: string) => {
    speciesProvider
      .getSpecies()
      .then((species: SpeciesDto[]) => {
        setSpecies(species);
        if (nameOfSpeciesToSelect) {
          const specie = species.find((s) => s.name === nameOfSpeciesToSelect);
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

  const getBreeds = (nameOfBreedToSelect?: string) => {
    breedProvider
      .getBreeds()
      .then((breeds: BreedDto[]) => {
        setBreeds(breeds);
        if (nameOfBreedToSelect) {
          const breed = breeds.find((b) => b.name === nameOfBreedToSelect);
          if (breed) {
            form.setValue('breedId', breed.breedId);
            form.trigger('breedId');
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onRegister: SubmitHandler<IForm> = (formData: IForm) => {
    const createInput: PetCreateInput = {
      tutorId: formData.tutorId,
      speciesId: formData.speciesId,
      breedId: formData.breedId,
      name: formData.name.trim(),
    };

    petProvider
      .createPet(createInput)
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
        <ModalHeader title="Novo Pet" requestBackAction={handleCancel} />
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            style={styles.modalContentScrollView}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.selectLabel}>Selecione um tutor:</Text>
              <Controller
                control={form.control}
                name="tutorId"
                rules={{
                  required: 'Um tutor deve ser selecionado',
                  minLength: {
                    value: 5,
                    message: 'Um tutor deve ser selecionado',
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
                          {tutors.map((tutor) => (
                            <Picker.Item
                              label={tutor.name}
                              value={tutor.tutorId}
                              key={tutor.tutorId}
                            />
                          ))}
                        </Picker>
                      </View>

                      <Text style={styles.linkToFormLabel}>
                        Não encontrou o tutor na lista?
                        <TouchableOpacity
                          onPress={() => setShowTutorForm(true)}
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

            <View
              style={{
                ...styles.inputContainer,
                opacity:
                  form.watch('speciesId') && form.watch('speciesId') !== '0'
                    ? 1
                    : 0.2,
              }}
            >
              <Text style={styles.selectLabel}>Selecione uma raça:</Text>
              <Controller
                control={form.control}
                name="breedId"
                rules={{
                  required: 'Uma raça deve ser selecionada',
                  minLength: {
                    value: 5,
                    message: 'Uma raça deve ser selecionada',
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
                          enabled={form.watch('speciesId') !== '0'}
                        >
                          <Picker.Item
                            label=""
                            value={'0'}
                            key={Math.random()}
                          />
                          {breedsFiltered.map((breed) => (
                            <Picker.Item
                              label={breed.name}
                              value={breed.breedId}
                              key={breed.breedId}
                            />
                          ))}
                        </Picker>
                      </View>

                      <Text style={styles.linkToFormLabel}>
                        Não encontrou a raça na lista?
                        <TouchableOpacity
                          onPress={() => setShowBreedForm(true)}
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
                    message: 'O nome do pet deve possuir 3 caracteres ou mais',
                  },
                  required: 'O nome do pet não pode ficar em branco',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <TextInput
                        {...field}
                        label="Nome do pet"
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
          </ScrollView>
        </View>
      </Modal>

      <TutorForm
        show={showTutorForm}
        onClose={(lastInsertedName?: string) => {
          setShowTutorForm(false);
          if (lastInsertedName) {
            getTutors(lastInsertedName);
          }
        }}
      />

      <SpeciesForm
        show={showSpeciesForm}
        onClose={(lastInsertedName?: string) => {
          setShowSpeciesForm(false);
          if (lastInsertedName) {
            getSpecies(lastInsertedName);
          }
        }}
      />

      <BreedForm
        show={showBreedForm}
        onClose={(lastInsertedName?: string) => {
          setShowBreedForm(false);
          if (lastInsertedName) {
            getBreeds(lastInsertedName);
          }
        }}
        speciesId={form.getValues('speciesId')}
      />
    </>
  );
};

export default PetForm;
