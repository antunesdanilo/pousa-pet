import { BoardingDto } from '@/providers/dtos/boarding.dto';
import { styles } from '@/styles';
import moment from 'moment';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';

interface IBoardingDetailsProps {
  boarding: BoardingDto;
  show: boolean;
  onClose: () => void;
}

const BoardingDetails: React.FC<IBoardingDetailsProps> = ({
  boarding,
  show,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContentAuto}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                lineHeight: 50,
              }}
            >
              Detalhes
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ fontSize: 32 }}>&times;</Text>
            </TouchableOpacity>
          </View>
          <Card style={styles.listCard}>
            <Card.Content style={{ alignItems: 'center' }}>
              <Text style={styles.listCardTextModal}>
                Nome do pet:{'\n'}
                {boarding.pet.name}
              </Text>
              <Text style={styles.listCardTextModal}>
                Nome do tutor:{'\n'}
                {boarding.pet.tutor.name}
              </Text>
              <Text style={styles.listCardTextModal}>
                Telefone do tutor:{'\n'}
                {boarding.pet.tutor.phoneNumber}
              </Text>
              <Text style={styles.listCardTextModal}>
                Espécie:{'\n'}
                {boarding.pet.species.name}
              </Text>
              <Text style={styles.listCardTextModal}>
                Raça:{'\n'}
                {boarding.pet.breed.name}
              </Text>
              <Text style={styles.listCardTextModal}>
                Data de entrada:{'\n'}
                {moment(boarding.checkInDate).format('DD/MM/yyyy')}
              </Text>
              <Text style={styles.listCardTextModal}>
                Previsão de saída:{'\n'}
                {moment(boarding.checkInDate)
                  .add(boarding.expectedDailyStays, 'day')
                  .format('DD/MM/yyyy')}
              </Text>
              <Text style={styles.listCardTextModal}>
                Diárias previstas:{'\n'}
                {boarding.expectedDailyStays}
              </Text>
              <Text style={styles.listCardTextModal}>
                Diárias utilizadas:{'\n'}
                {moment(boarding.checkInDate)
                  .add(boarding.expectedDailyStays, 'day')
                  .isAfter(moment())
                  ? moment().diff(boarding.checkInDate, 'days')
                  : boarding.expectedDailyStays}
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </Modal>
  );
};

export { BoardingDetails };
