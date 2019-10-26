import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {colors} from "../constants/colors";
import {UserContext} from "../../App";

export const ResultPage = ({result, restartGame}) => {
    const user = useContext(UserContext);
    console.log(user);
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 40}}>Результат: {result.countRightAnswers}/{result.countRound}</Text>
            <Button title='Сыграть ещё раз?' onPress={() => restartGame()} color={colors.default}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
