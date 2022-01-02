import React, { useState, useEffect, ChangeEvent } from "react";
import { Feather as Icon } from '@expo/vector-icons';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import axios from "axios";

interface IBGEUFResponse {
  sigla: string
}
interface IBGECityResponse {
  nome: string
}

const Home = () => {
  const navigation = useNavigation();
  const [ufs, setUfs] = useState<String[]>([]);
  const [cities, setCity] = useState<String[]>([]);
  const [uf, setUf] = useState<String>('');
  const [selectedCity, setSelectedCity] = useState<String>('');

    function handleNavigationToPoints() {
      navigation.navigate('Points', {
        uf,
        city: selectedCity
      });
    }

    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
          const ufInitials = response.data.map(uf => uf.sigla);
          setUfs(ufInitials);
      });
    }, []);
  
  
    useEffect(() => {
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
            const cityInitials = response.data.map(uf => uf.nome);
            setCity(cityInitials);
        });
    }, [uf]);

    return(
        <ImageBackground 
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width:274, height: 368 }}

        >
            <View style={styles.main}>
              <Image source={require('../../assets/logo.png')} />
              <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
              <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            </View>

            <View style={styles.footer}>
              <Picker
                    selectedValue={uf}
                    onValueChange={(itemValue) =>
                      setUf(String(itemValue))
                    }
                    style={styles.select}
                >
                { ufs.map(uf => (
                  <Picker.Item key={String(uf)} label={String(uf)} value={String(uf)} />
                )) }
              </Picker>

              <Picker
                    selectedValue={selectedCity}
                    onValueChange={(itemValue) =>
                      setSelectedCity(String(itemValue))
                    }
                    style={styles.select}
                >
                { cities.map(city => (
                  <Picker.Item key={String(city)} label={String(city)} value={String(city)} />
                )) }
              </Picker>

              <TouchableOpacity style={styles.button} onPress={handleNavigationToPoints}>
                <View style={styles.buttonIcon}>
                  <Text>
                    <Icon name="arrow-right" color='#FFF' size={24}/>
                  </Text>
                </View>

                <Text style={styles.buttonText}>
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
});

export default Home;