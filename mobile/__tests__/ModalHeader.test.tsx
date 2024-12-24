import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ModalHeader } from '@/components/modalheader';

describe('ModalHeader', () => {
  it('should display the title passed as a prop', () => {
    const title = 'Test Title';
    // Renderiza o componente com o título
    const { getByText } = render(
      <ModalHeader title={title} requestBackAction={() => null} />,
    );
    // Verifica se o título é renderizado corretamente
    expect(getByText(title)).toBeTruthy();
  });

  it('should call requestBackAction when back button is pressed', () => {
    const mockBackAction = jest.fn();

    // Renderiza o componente com a função requestBackAction
    const { getByTestId } = render(
      <ModalHeader title="Test Title" requestBackAction={mockBackAction} />,
    );

    // Encontra o botão de volta
    const backButton = getByTestId('back-button');

    // Simula o clique no botão de voltar
    fireEvent.press(backButton);

    // Verifica se a função foi chamada
    expect(mockBackAction).toHaveBeenCalledTimes(1);
  });
});
