import { Text, View } from 'react-native';

interface IPageTitleProps {
  title?: string;
}

/**
 * PageTitle Component
 *
 * This component renders a simple title for a page with a default padding at the top.
 * The title is customizable via the `title` prop.
 *
 * @param {string} title - The title to be displayed in the component.
 * If no title is provided, it will render an empty string.
 *
 * @returns {JSX.Element} A View containing a Text component to display the title.
 *
 * @example
 * // Example usage:
 * <PageTitle title="Welcome to the App" />
 */
const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
  return (
    <View style={{ paddingTop: 10 }} testID="page-title-view">
      <Text style={{ fontSize: 20 }}>{title}</Text>
    </View>
  );
};

export { PageTitle };
