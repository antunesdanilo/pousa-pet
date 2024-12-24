import React from 'react';
import { render } from '@testing-library/react-native';
import { PageTitle } from '@/components/pagetitle';

test('it renders the title correctly', () => {
  const { getByText } = render(<PageTitle title="Test Title" />);

  // Verifica se o título foi renderizado corretamente
  const titleElement = getByText('Test Title');
  expect(titleElement).toBeTruthy(); // Verifica se o elemento existe

  // Verifica se o estilo aplicado ao texto é o esperado (exemplo: fontSize: 20)
  expect(titleElement.props.style.fontSize).toBe(20); // Verifica a fonte
});

test('it renders with default padding', () => {
  const { getByTestId } = render(<PageTitle title="Test Title" />);

  // Verifica se a View tem o estilo de paddingTop: 10
  const viewElement = getByTestId('page-title-view');
  expect(viewElement.props.style.paddingTop).toBe(10);
});
