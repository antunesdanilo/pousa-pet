import { styles } from '@/styles';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import PetForm from './form';
import { useEffect, useState } from 'react';
import { IPetProvider } from '@/providers/interfaces/pet.provider';
import { PetProvider } from '@/providers/pet.provider';
import { PetDto } from '@/providers/dtos/pet.dto';
import { useIsFocused } from '@react-navigation/native';
import { Empty } from '@/components/empty';
import { PageTitle } from '@/components/pagetitle';

const petProvider: IPetProvider = new PetProvider();

const Pets: React.FC = () => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [pets, setPets] = useState<PetDto[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getPets();
    }
  }, [isFocused]);

  const getPets = () => {
    petProvider
      .getPets()
      .then((pets: PetDto[]) => {
        setIsLoading(false);
        setPets(pets);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {!pets.length && !isLoading ? (
        <Empty message="Nenhum pet foi cadastrado ainda." />
      ) : null}

      <FlatList
        data={pets}
        keyExtractor={(item) => item.petId}
        ListHeaderComponent={<PageTitle title="Pets" />}
        renderItem={({ item }) => (
          <Card style={styles.listCard}>
            <Card.Content>
              <Text>Nome: {item.name}</Text>
              <Text>Tutor: {item.tutor?.name}</Text>
              <Text>Telefone do Tutor: {item.tutor?.phoneNumber}</Text>
              <Text>Espécie: {item.species?.name}</Text>
              <Text>Raça: {item.breed?.name}</Text>
            </Card.Content>
          </Card>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getPets} />
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      />

      <PetForm
        show={showForm}
        onClose={(lastInsertedName?: string) => {
          setShowForm(false);
          if (lastInsertedName) {
            getPets();
          }
        }}
      />

      <FAB
        style={styles.buttonFab}
        icon="plus"
        onPress={() => setShowForm(true)}
      />
    </View>
  );
};

export default Pets;
