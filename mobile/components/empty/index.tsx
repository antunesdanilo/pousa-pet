import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { styles } from '@/styles';
import { Text, View } from 'react-native';

interface IEmptyProps {
  message?: string;
}

/**
 * Empty Component
 *
 * This component displays a message along with an icon when there are no items to show.
 * It shows a default message if no custom message is provided via the `message` prop.
 *
 * @param {string} [message] - The message to be displayed. If not provided, it will display a default message: "Nenhum item foi cadastrado ainda".
 *
 * @returns {JSX.Element} A View containing an icon and a message.
 *
 * @example
 * // Example usage:
 * <Empty message="No tasks available" />
 */
const Empty: React.FC<IEmptyProps> = ({ message }) => {
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}
      testID="empty-view"
    >
      <FontAwesome size={50} name="clock-o" color="grey" testID="icon-clock" />
      <Text style={styles.noItems}>
        {message || 'Nenhum item foi cadastrado ainda'}
      </Text>
    </View>
  );
};

export { Empty };
