import { StyleSheet, Dimensions } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: '#1c1b1f',
    padding: 16,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: Dimensions.get('window').width * 0.9,
   
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',

    textAlign: 'center',
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
  input: {
  backgroundColor: '#fff',
  padding: 6,
  borderRadius: 6,
  marginTop: 5,
  width: '50%',
  alignSelf: 'center',
},
title: {
  color: '#FFD700',
  fontSize: 18,
  fontWeight: 'bold',
  marginVertical: 10,
},
});