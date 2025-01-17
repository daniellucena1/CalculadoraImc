import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import styles from './style';

export default function ResultImc(props) {

    const onShare = async() => {
        const result = await Share.share({
            message: "Meu Imc hoje é: " + props.resultImc,
        })
    }

    return(
        <View style={styles.contextImc}>
            <View style={styles.boxShareButton}>
                <Text style={styles.information}>{props.messageResultImc}</Text>
                <Text style={styles.resultImc}>{props.resultImc}</Text>
                <TouchableOpacity onPress={onShare} style={styles.share}>
                    <Text style={styles.textShare}>Share</Text>
                </TouchableOpacity>
                <View/>
            </View>
        </View>
    );
}