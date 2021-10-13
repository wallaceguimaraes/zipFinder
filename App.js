import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View , SafeAreaView, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import api from './src/services/api';

export default function App() {

const [cep , setCep ] = useState('');
const [ cepUser , setCepUser ] = useState(null);
const inputRef = useRef(null);


async function getCep(){
  
   try{
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();
   }catch(error){
       alert(error);
   }

}


function clear(){
  setCep('');
  inputRef.current.focus();

}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewText}>
        <Text style={ styles.text }>Digite o CEP desejado:</Text>
        <TextInput style={styles.input}
                  onChangeText={ (text) => setCep(text) }
                  value={cep}
                  keyboardType='numeric'
                  placeholder='Ex: 42700-000'   
                  ref={inputRef}         
          >
        </TextInput>
      </View>
      
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[ styles.btn, { backgroundColor: 'green' } ]} 
                          onPress={ getCep }>
          <Text style={styles.textBtn}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ styles.btn, {backgroundColor: 'red'} ]}>
          <Text style={ styles.textBtn }
                onPress={ clear }>Limpar</Text>
        </TouchableOpacity>
      </View>

      { cepUser && 
      <View style={styles.viewInfo}>
        <Text>CEP: {cepUser.cep}</Text>
        <Text>Logradouro: {cepUser.logradouro}</Text>
        <Text>complemento: {cepUser.complemento}</Text>
        <Text>Bairro: {cepUser.bairro}</Text>
        <Text>Localidade: {cepUser.localidade}</Text>
        <Text>UF: {cepUser.uf}</Text>
        <Text>IBGE: {cepUser.ibge}</Text>
        <Text>DDD: {cepUser.ddd}</Text>
      </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },
  viewText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#00002f',
    fontSize: 26
  },
  input: {
    marginTop: 20,
    padding: 5,
    width: '60%',
    height: 30,
    borderRadius: 5,
    borderWidth: 1,

  }, 
  areaBtn: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  btn: {
      width: 100,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5
  },
  textBtn:{
    color: 'white',
    fontSize: 14
  },
  viewInfo: {
    margin: 40,
    alignItems: 'center'
  }
});
