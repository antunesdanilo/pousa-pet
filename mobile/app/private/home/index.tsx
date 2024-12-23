import { BoardingDto } from '@/providers/dtos/boarding.dto';
import { styles } from '@/styles';
import { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import { BoardingForm } from './form';
import { useIsFocused } from '@react-navigation/native';
import { Empty } from '@/components/empty';
import moment from 'moment';
import { BoardingProvider } from '@/providers/boarding.provider';
import { IBoardingProvider } from '@/providers/interfaces/boarding.provider';
import { BoardingDetails } from './details';
import { PageTitle } from '@/components/pagetitle';

const boardingProvider: IBoardingProvider = new BoardingProvider();

const Home: React.FC = () => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [boardings, setBoardings] = useState<BoardingDto[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  const [showBoardingDetails, setShowBoardingDetails] =
    useState<boolean>(false);
  const [boardingToDetails, setBoardingToDetails] = useState<
    BoardingDto | undefined
  >();

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getBoardings();
    }
  }, [isFocused]);

  const getBoardings = () => {
    boardingProvider
      .getBoardings()
      .then((boardings: BoardingDto[]) => {
        setIsLoading(false);
        setBoardings(
          boardings.sort((a, b) =>
            moment(a.checkInDate).isBefore(b.checkInDate) ? 1 : -1,
          ),
        );
      })
      .catch(() => {
        setIsLoading(false);
        ToastAndroid.show(
          'Não foi possível carregar a lista de hospedagens.',
          ToastAndroid.SHORT,
        );
      });
  };

  return (
    <View style={styles.container}>
      {!boardings.length && !isLoading ? (
        <Empty message="Nenhuma hospedagem foi cadastrada ainda." />
      ) : null}

      <FlatList
        data={boardings}
        keyExtractor={(item) => item.boardingId}
        ListHeaderComponent={<PageTitle title="Hospedagens" />}
        renderItem={({ item }) => (
          <Card style={styles.listCard}>
            <Card.Content>
              <Text>Pet: {item.pet.name}</Text>
              <Text>
                Data de entrada: {moment(item.checkInDate).format('DD/MM/yyyy')}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  setShowBoardingDetails(true);
                  setBoardingToDetails(item);
                }}
              >
                Mais detalhes
              </Button>
            </Card.Actions>
          </Card>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getBoardings} />
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      />

      <BoardingForm
        show={showForm}
        onClose={(hasChanges: boolean) => {
          setShowForm(false);
          if (hasChanges) {
            getBoardings();
          }
        }}
      />

      {boardingToDetails && (
        <BoardingDetails
          show={showBoardingDetails}
          boarding={boardingToDetails}
          onClose={() => setShowBoardingDetails(false)}
        />
      )}

      <FAB
        style={styles.buttonFab}
        icon="plus"
        onPress={() => setShowForm(true)}
      />
    </View>
  );
};

export default Home;
