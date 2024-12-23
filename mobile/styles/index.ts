import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPadding: {
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
    marginTop: 25,
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
  selectLabel: {
    paddingLeft: 10,
  },
  buttonFab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  modalContent: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  modalContentAuto: {
    width: '90%',
    borderRadius: 6,
    backgroundColor: '#F2F2F2',
    padding: 15,
    alignItems: 'center',
  },
  modalContentScrollView: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    flex: 1,
    padding: 20,
  },
  listCard: {
    width: '100%',
    marginTop: 15,
  },
  listCardTextModal: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 10,
  },
  noItems: {
    padding: 20,
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
  linkToFormLabel: {
    marginLeft: 15,
    marginTop: 10,
  },
  linkToForm: {
    color: 'blue',
    marginTop: 5,
  },
  dateFormLabel: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    height: 50,
    fontSize: 16,
    paddingLeft: 10,
    lineHeight: 45,
    justifyContent: 'center',
  },
});

export { styles };
