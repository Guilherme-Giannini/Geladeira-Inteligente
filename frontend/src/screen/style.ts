import { StyleSheet, Dimensions } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'space-between', // lista em cima, botão embaixo
    backgroundColor: '#1c1b1f', 
    padding: 16,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  item: {
    backgroundColor: '#FFD700', 
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: Dimensions.get('window').width * 0.9, 
  },
  text: {
    color: '#000000', 
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 8,
    width: Dimensions.get('window').width * 0.5,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
