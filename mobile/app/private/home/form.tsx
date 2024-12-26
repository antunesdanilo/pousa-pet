import React, { useEffect } from 'react';
import { BoardingProvider } from '@/providers/boarding.provider';
import { PetDto } from '@/providers/dtos/pet.dto';
import { BoardingCreateInput } from '@/providers/inputs/boarding-create.input';
import { IBoardingProvider } from '@/providers/interfaces/boarding.provider';
import { styles } from '@/styles';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Modal,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import PetForm from '../pets/form';
import { IPetProvider } from '@/providers/interfaces/pet.provider';
import { PetProvider } from '@/providers/pet.provider';
import { CustomStatusBar } from '@/components/customstatusbar';
import { ModalHeader } from '@/components/modalheader';
import { selectUser, UserSliceState } from '@/reducers/user.slice';
import { useAppSelector } from '@/hooks';
import { Button, TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface IBoardingFormProps {
  show: boolean;
  onClose: (hasChanges: boolean) => void;
}

interface IForm {
  petId: string;
  checkInDate: string;
  expectedDailyStays: number;
  insertedByUserId: string;
}

const boardingProvider: IBoardingProvider = new BoardingProvider();
const petProvider: IPetProvider = new PetProvider();

/**
 * BoardingForm Component
 *
 * A form to register a new pet boarding. Allows the user to select a pet, specify the check-in date,
 * and indicate the expected number of daily stays. Includes integration with a pet registration form
 * in case the desired pet is not listed.
 *
 * @component
 *
 * @example
 * <BoardingForm show={true} onClose={(hasChanges) => console.log(hasChanges)} />
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.show - Controls the visibility of the modal form.
 * @param {function(boolean):void} props.onClose - Function called when the form is closed. Receives a boolean indicating if there were changes.
 */
const BoardingForm: React.FC<IBoardingFormProps> = ({ show, onClose }) => {
  const { user } = useAppSelector<UserSliceState>(selectUser);

  const [pets, setPets] = useState<PetDto[]>([]);
  const [showPetForm, setShowPetForm] = useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const formInitialState: IForm = {
    petId: '',
    checkInDate: moment().startOf('day').format(),
    expectedDailyStays: 0,
    insertedByUserId: '',
  };

  const form = useForm<IForm>({
    values: formInitialState,
    shouldFocusError: false,
  });

  useEffect(() => {
    if (show) {
      getPets();
    }
  }, [show]);

  /**
   * Fetches the list of available pets from the server and updates the state.
   * Optionally selects a pet by name if provided.
   *
   * @param {string} [nameOfPetToSelect] - Name of the pet to be automatically selected, if it exists.
   */
  const getPets = (nameOfPetToSelect?: string) => {
    petProvider
      .getPets()
      .then((pets: PetDto[]) => {
        setPets(pets);
        if (nameOfPetToSelect) {
          const pet = pets.find((p) => p.name === nameOfPetToSelect);
          if (pet && form.getValues('petId') !== pet.petId) {
            form.setValue('petId', pet.petId);
            form.trigger('petId');
          }
        }
      })
      .catch((error) => console.error(error));
  };

  /**
   * Submits the form data to create a new boarding entry.
   *
   * @param {IForm} formData - The form data.
   */
  const onRegister: SubmitHandler<IForm> = (formData: IForm) => {
    const createInput: BoardingCreateInput = {
      petId: formData.petId,
      checkInDate: moment(formData.checkInDate).toDate(),
      expectedDailyStays: +formData.expectedDailyStays,
      insertedByUserId: user?.userId as string,
    };

    boardingProvider
      .createBoarding(createInput)
      .then(() => {
        ToastAndroid.show('Salvo com sucesso!', ToastAndroid.SHORT);
        form.reset();
        onClose(true);
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
    onClose(false);
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
        <ModalHeader title="Nova Hospedagem" requestBackAction={handleCancel} />
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            style={styles.modalContentScrollView}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.selectLabel}>Selecione um pet:</Text>
              <Controller
                control={form.control}
                name="petId"
                rules={{
                  required: 'Um pet deve ser selecionado',
                  minLength: {
                    value: 5,
                    message: 'Um pet deve ser selecionado',
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
                          {pets.map((pet) => (
                            <Picker.Item
                              label={pet.name}
                              value={pet.petId}
                              key={pet.petId}
                            />
                          ))}
                        </Picker>
                      </View>

                      <Text style={styles.linkToFormLabel}>
                        Não encontrou o pet na lista?
                        <TouchableOpacity onPress={() => setShowPetForm(true)}>
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
              <Text style={styles.selectLabel}>
                Selecione a data de entrada:
              </Text>
              <Controller
                control={form.control}
                name="checkInDate"
                rules={{
                  required: 'Um data deve ser selecionada',
                  minLength: {
                    value: 5,
                    message: 'Um data deve ser selecionada',
                  },
                }}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                          onPress={() => setShowDatePicker(true)}
                        >
                          <Text style={styles.dateFormLabel}>
                            {moment(field.value).format('DD/MM/yyyy')}
                          </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                          locale="pt-BR"
                          confirmTextIOS="Confirmar"
                          cancelTextIOS="Cancelar"
                          date={moment(field.value).toDate()}
                          maximumDate={moment().toDate()}
                          isVisible={showDatePicker}
                          mode="date"
                          onCancel={() => setShowDatePicker(false)}
                          onHide={() => setShowDatePicker(false)}
                          onConfirm={(event: any) => {
                            setShowDatePicker(false);
                            field.onChange(
                              moment(event).startOf('day').format(),
                            );
                          }}
                        />
                      </View>

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
                name="expectedDailyStays"
                rules={{
                  min: {
                    value: 1,
                    message: 'Deve ser selecionada no mínimo 1 diária',
                  },
                  required:
                    'É necessário informar a quantidade de diárias previstas',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <TextInput
                        {...field}
                        label="Diárias previstas"
                        mode="outlined"
                        style={styles.inputText}
                        value={String(field.value)}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        keyboardType="numeric"
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
          </ScrollView>
        </View>
      </Modal>

      <PetForm
        show={showPetForm}
        onClose={(lastInsertedName?: string) => {
          setShowPetForm(false);
          if (lastInsertedName) {
            getPets(lastInsertedName);
          }
        }}
      />
    </>
  );
};

export { BoardingForm };
