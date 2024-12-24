import React from 'react';
import { render } from '@testing-library/react-native';
import { Empty } from '@/components/empty';

test('it renders the default message when no message is passed', () => {
  const { getByText } = render(<Empty />); // Renderiza o componente sem a prop `message`

  // Verifica se o texto padrão é exibido corretamente
  const defaultMessage = getByText('Nenhum item foi cadastrado ainda');
  expect(defaultMessage).toBeTruthy();
});

test('it renders the provided message when message is passed', () => {
  const { getByText } = render(<Empty message="No items found" />);

  // Verifica se a mensagem personalizada é exibida corretamente
  const customMessage = getByText('No items found');
  expect(customMessage).toBeTruthy();
});

test('it renders the FontAwesome icon', () => {
  const { getByTestId } = render(<Empty />);

  // Verifica se o ícone FontAwesome é renderizado corretamente
  const icon = getByTestId('icon-clock');
  expect(icon).toBeTruthy();
});

test('it applies correct styles', () => {
  const { getByTestId } = render(<Empty />);

  // Verifica se o estilo de paddingTop foi aplicado corretamente à View
  const viewElement = getByTestId('empty-view');
  expect(viewElement.props.style.paddingTop).toBe(30);
});
