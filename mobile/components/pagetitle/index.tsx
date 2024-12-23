import { Text, View } from 'react-native';

interface IPageTitleProps {
  title?: string;
}

const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
  return (
    <View style={{ paddingTop: 10 }}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
    </View>
  );
};

export { PageTitle };
