import { SpeciesDto } from '@/providers/dtos/species.dto';
import { ISpeciesProvider } from '@/providers/interfaces/species.provider';
import { SpeciesProvider } from '@/providers/species.provider';
import { styles } from '@/styles';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { SpeciesForm } from './form';
import { Empty } from '@/components/empty';
import { useIsFocused } from '@react-navigation/native';
import { PageTitle } from '@/components/pagetitle';

const speciesProvider: ISpeciesProvider = new SpeciesProvider();

const Species: React.FC = () => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [species, setSpecies] = useState<SpeciesDto[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getSpecies();
    }
  }, [isFocused]);

  const getSpecies = () => {
    speciesProvider
      .getSpecies()
      .then((species: SpeciesDto[]) => {
        setIsLoading(false);
        setSpecies(species);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {!species.length && !isLoading ? (
        <Empty message=" Nenhuma espécie foi cadastrada ainda." />
      ) : null}

      <FlatList
        data={species}
        keyExtractor={(item) => item.speciesId}
        ListHeaderComponent={<PageTitle title="Espécies" />}
        renderItem={({ item }) => (
          <Card style={styles.listCard}>
            <Card.Content>
              <Text>Nome: {item.name}</Text>
            </Card.Content>
          </Card>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getSpecies} />
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      />

      <SpeciesForm
        show={showForm}
        onClose={(lastInsertedName?: string) => {
          setShowForm(false);
          if (lastInsertedName) {
            getSpecies();
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

export default Species;
