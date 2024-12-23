import { Empty } from '@/components/empty';
import { BreedProvider } from '@/providers/breed.provider';
import { BreedDto } from '@/providers/dtos/breed.dto';
import { IBreedProvider } from '@/providers/interfaces/breed.provider';
import { styles } from '@/styles';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import BreedForm from './form';
import { PageTitle } from '@/components/pagetitle';

const breedProvider: IBreedProvider = new BreedProvider();

const Breeds: React.FC = () => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [breeds, setBreeds] = useState<BreedDto[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getBreeds();
    }
  }, [isFocused]);

  const getBreeds = () => {
    breedProvider
      .getBreeds()
      .then((breeds: BreedDto[]) => {
        setIsLoading(false);
        setBreeds(breeds);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {!breeds.length && !isLoading ? (
        <Empty message=" Nenhuma raça foi cadastrada ainda." />
      ) : null}

      <FlatList
        data={breeds}
        keyExtractor={(item) => item.breedId}
        ListHeaderComponent={<PageTitle title="Raças" />}
        renderItem={({ item }) => (
          <Card style={styles.listCard}>
            <Card.Content>
              <Text>Espécie: {item.species.name}</Text>
              <Text>Raça: {item.name}</Text>
            </Card.Content>
          </Card>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getBreeds} />
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      />

      <BreedForm
        show={showForm}
        onClose={(lastInsertedName?: string) => {
          setShowForm(false);
          if (lastInsertedName) {
            getBreeds();
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

export default Breeds;
