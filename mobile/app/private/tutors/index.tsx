import { TutorDto } from '@/providers/dtos/tutor.dto';
import { ITutorProvider } from '@/providers/interfaces/tutor.provider';
import { TutorProvider } from '@/providers/tutor.provider';
import { styles } from '@/styles';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import TutorForm from './form';
import { Card, FAB } from 'react-native-paper';
import { applyPhoneMask } from '@/utils/apply-phone-mask.util';
import { Empty } from '@/components/empty';
import { useIsFocused } from '@react-navigation/native';
import { PageTitle } from '@/components/pagetitle';

const tutorProvider: ITutorProvider = new TutorProvider();

const Tutors: React.FC = () => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [tutors, setTutors] = useState<TutorDto[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getTutors();
    }
  }, [isFocused]);

  const getTutors = () => {
    tutorProvider
      .getTutors()
      .then((tutors: TutorDto[]) => {
        setIsLoading(false);
        setTutors(tutors);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {!tutors.length && !isLoading ? (
        <Empty message="Nenhum tutor foi cadastrado ainda." />
      ) : null}

      <FlatList
        data={tutors}
        keyExtractor={(item) => item.tutorId}
        ListHeaderComponent={<PageTitle title="Tutores" />}
        renderItem={({ item }) => (
          <Card style={styles.listCard}>
            <Card.Content>
              <Text>Nome: {item.name}</Text>
              <Text>Telefone: {applyPhoneMask(item.phoneNumber)}</Text>
            </Card.Content>
          </Card>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getTutors} />
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      />

      <TutorForm
        show={showForm}
        onClose={(lastInsertedName?: string) => {
          setShowForm(false);
          if (lastInsertedName) {
            getTutors();
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

export default Tutors;
