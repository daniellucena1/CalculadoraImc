import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, Vibration, Keyboard, Pressable, FlatList } from 'react-native';
import ResultImc from './ResultIMC/index';
import styles from "./style";

export default function Form() {

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState(null);
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState('calcular');
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);

    function imcCalculator() {
        let heightFormat = height.replace(",",".");
        let totalImc = (weight/(heightFormat*heightFormat)).toFixed(2);
        setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}]);
        setImc(totalImc);
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
            </Pressable>
            :
            <View style={styles.displayImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => {imcValidator()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
            <FlatList showsVerticalScrollIndicator={false} style={styles.listImcs} data={imcList.reverse()} renderItem={({item}) => {
                return(
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.textResultItemList}>Resultado do Imc = </Text>
                        {item.imc}
                    </Text>
                )
            }} keyExtractor={(item) => {
                item.id
            }}/>
        </View>
    );
}