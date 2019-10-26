import React, {useState} from 'react';
import {Button, StyleSheet, View, TextInput} from 'react-native';
import {colors} from "../constants/colors";
import {serverAddress} from '../constants/server';

export const MainPage = ({startGame}) => {
    const [username, setUsername] = useState('');

    function onChange(text) {
        setUsername(text);
    }

    function start() {
        fetch(`${serverAddress}/user`, {
            method: 'POST',
            body: username,
        })
            .then((response) => response.json())
            .then((data) => {
                startGame(username);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <View style={styles.container}>
            <TextInput value={username} onChangeText={(text => onChange(text))} autoFocus style={styles.textInput}/>
            <Button onPress={start} title='Начать игру!' color={colors.default}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        width: 100,
        borderColor: 'black',
        borderWidth: 1,
    },
});
