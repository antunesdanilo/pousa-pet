import { Appbar } from 'react-native-paper';

interface IModalHeaderProps {
  title: string;
  requestBackAction?: () => void;
}

/**
 * Propriedades do componente ModalHeader
 *
 * @typedef {Object} IModalHeaderProps
 * @property {string} title - O título a ser exibido no cabeçalho. (Obrigatório)
 * @property {() => void} [requestBackAction] - Função opcional que será chamada ao pressionar o botão de voltar. (Opcional)
 */

/**
 * Componente que exibe um cabeçalho para um modal com um botão de voltar e um título.
 *
 * @param {IModalHeaderProps} props - Propriedades do componente.
 * @returns {JSX.Element} - O JSX que representa o cabeçalho do modal.
 */
const ModalHeader: React.FC<IModalHeaderProps> = ({
  title,
  requestBackAction,
}) => {
  return (
    <Appbar.Header
      style={{
        marginTop: -30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        zIndex: 1,
      }}
    >
      <Appbar.BackAction onPress={requestBackAction} testID="back-button" />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export { ModalHeader };
