import { PageTitle } from '@/components/pagetitle';
import * as React from 'react';
import renderer from 'react-test-renderer';

it(`renders correctly`, () => {
  const tree = renderer.create(<PageTitle title="Teste"></PageTitle>).toJSON();

  expect(tree).toMatchSnapshot();
});
