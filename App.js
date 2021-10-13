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
        <TouchableOpacity style={ styles.btn } 
                          onPress={ getCep }>
          <Text style={styles.textBtn}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.btn }>
          <Text style={ styles.textBtn }
                onPress={ clear }>Limpar</Text>
        </TouchableOpacity>
      </View>

      { cepUser && 
      <View style={styles.viewInfo}>
        <Text style={ [styles.text, {fontSize: 16}]}>CEP: {cepUser.cep}</Text>
        <Text style={[styles.text , {fontSize: 16}] }>Logradouro: {cepUser.logradouro}</Text>
        <Text style={[styles.text , {fontSize: 16}]}>complemento: {cepUser.complemento}</Text>
        <Text style={[styles.text , {fontSize: 16}]}>Bairro: {cepUser.bairro}</Text>
        <Text style={[styles.text , {fontSize: 16}]}>Localidade: {cepUser.localidade}</Text>
        <Text style={[styles.text , {fontSize: 16}]}>UF: {cepUser.uf}</Text>
        <Text style={[styles.text , {fontSize: 16}]}>IBGE: {cepUser.ibge}</Text>
        <Text style={[styles.text , {fontSize: 16}]}>DDD: {cepUser.ddd}</Text>
      </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#0048FF',
  },
  viewText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 58
  },
  text: {
    color: '#fff',
    fontSize: 24
  },
  input: {
    marginTop: 68,
    paddingHorizontal: 70,
    width: 233,
    height: 46,
    borderRadius: 5,
    backgroundColor: '#fff'
  }, 
  areaBtn: {
    marginTop: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 44,

  },
  btn: {
      width: 103,
      height: 43,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      backgroundColor: '#510062'

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
