import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading1: {
    width: '100%',
    fontSize: 22,
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    height: 50,
  },
  inputText: {
    width: '100%',
  },
  inputError: {
    width: '100%',
    marginTop: 5,
    color: 'red',
  },
  nativePicker: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 10,
  },
});

export { styles };
