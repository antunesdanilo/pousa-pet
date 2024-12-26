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
import { Skeleton } from '@/components/skeleton';

const speciesProvider: ISpeciesProvider = new SpeciesProvider();

/**
 * Species component that displays a list of species and allows the user to add new species.
 *
 * The component fetches the list of species from a provider, displays them in a list,
 * and provides functionality to show a form for adding new species. The list can be refreshed.
 *
 * @returns {JSX.Element} The species list and add species functionality.
 */
const Species: React.FC = () => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [species, setSpecies] = useState<SpeciesDto[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  /**
   * Fetches the species list from the provider when the component is focused.
   * The species list is set to the state and loading is turned off once data is retrieved.
   */
  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getSpecies();
    }
  }, [isFocused]);

  /**
   * Fetches the list of species from the provider.
   * Updates the species state with the fetched data.
   *
   * @returns {Promise<void>} A promise indicating the completion of the data fetch.
   */
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

      {isLoading && !species.length ? (
        <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
          <Skeleton
            style={{
              width: '100%',
              height: 50,
              borderRadius: 4,
              marginTop: 20,
            }}
          />
          <Skeleton
            style={{
              width: '100%',
              height: 50,
              borderRadius: 4,
              marginTop: 20,
            }}
          />
        </View>
      ) : null}

      {species.length ? (
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
      ) : null}

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
