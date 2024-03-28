import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, Vibration, Keyboard, Pressable } from 'react-native';
import ResultImc from './ResultIMC/index';
import styles from "./style";

export default function Form() {

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState(null);
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState('calcular');
    const [errorMessage, setErrorMessage] = useState(null);

    function imcCalculator() {
        let heightFormat = height.replace(",",".");
        return setImc((weight/(heightFormat*heightFormat)).toFixed(2));
    }

    function imcVerification() {
        if (imc == null) {
            Vibration.vibrate(100);
            setErrorMessage("Campo obrigatório*");
        }
    }

    function imcValidator() {
        Keyboard.dismiss();
        if(weight != null && height != null) {
            imcCalculator();
            setHeight(null);
            setWeight(null);
            setMessageImc("Seu IMC é igual a:");
            setTextButton("Calcular Novamente");
            setErrorMessage(null);
        } else {
            imcVerification();
            setImc(null);
            setTextButton("Calcular");
            setMessageImc("Preencha o peso e a altura");
        }
    }

    return(
        <View style={styles.formContext}>
            {imc == null ?
            <Pressable style={styles.form} onPress={Keyboard.dismiss}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder='Qual a sua altura?' keyboardType='numeric'></TextInput>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <Text style={styles.formLabel}>Peso</Text>
                <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder='Qual o seu peso?' keyboardType='numeric'></TextInput>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => {imcValidator()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
                <Text style={styles.errorMessage}>{messageImc}</Text>
            </Pressable>
            :
            <View style={styles.displayImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => {imcValidator()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}