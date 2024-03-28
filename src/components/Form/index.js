import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import ResultImc from './ResultIMC/index';
import styles from "./style";

export default function Form() {

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState('Preencha o peso e a altura');
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState('calcular');

    function imcCalculator() {
        return setImc((weight/(height*height)).toFixed(2));
    }

    function imcValidator() {
        if(weight != null && height != null) {
            imcCalculator();
            setHeight(null);
            setWeight(null);
            setMessageImc("Seu IMC é igual a : ");
            setTextButton("Calcular Novamente");
            return
        }
        setImc(null);
        setTextButton("Calcular");
        setMessageImc("Preencha o peso e a altura");
    }

    function handleBlur() {
        console.log("Textinput perdeu o foco");
    }

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder='Qual a sua altura?' keyboardType='numeric'></TextInput>

                <Text style={styles.formLabel}>Peso</Text>
                <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder='Qual o seu peso?' keyboardType='numeric'></TextInput>

                <TouchableOpacity style={styles.buttonCalculator} onPress={() => {imcValidator()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </View>
    );
}