import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { styles } from '@/styles';
import { Text, View } from 'react-native';

interface IEmptyProps {
  message?: string;
}

const Empty: React.FC<IEmptyProps> = ({ message }) => {
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}
    >
      <FontAwesome size={50} name="clock-o" color="grey" />
      <Text style={styles.noItems}>
        {message || 'Nenhum item foi cadastrado ainda'}
      </Text>
    </View>
  );
};

export { Empty };
