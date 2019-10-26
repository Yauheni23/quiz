import React, {useState} from 'react';
import {Button, StyleSheet, View, TextInput} from 'react-native';
import {colors} from "../constants/colors";


export const MainPage = ({startGame}) => {
    const [userName, setUserName] = useState('');

    return (
        <View style={styles.container}>
            <TextInput value={userName} onChange={(text => setUserName(text))}/>
            <Button onPress={() => startGame(userName)} title='Начать игру!' color={colors.default}/>
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
    }
})
