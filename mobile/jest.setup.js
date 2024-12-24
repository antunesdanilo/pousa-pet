jest.mock('@expo/vector-icons', () => ({
  __esModule: true,
  Ionicons: 'Ionicons', // ou outro ícone se você estiver usando um específico
  MaterialIcons: 'MaterialIcons',
}));

jest.mock('@expo/vector-icons/FontAwesome', () => 'FontAwesome');

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}));
