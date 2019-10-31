import React, {useState} from 'react';
import {Button, StyleSheet, View, TextInput, Text, ToastAndroid} from 'react-native';
import {colors} from "../constants/colors";
import RadioForm from 'react-native-simple-radio-button';

export const MainPage = ({startGame, setCategory}) => {
    const [username, setUsername] = useState('');

    const validateName = () => {
        const isValid = username.search(/^[\wА-Яа-я-]*$/) !== -1
            && username.trim().length !== 0
            && username.length < 20;

        if(isValid){
            startGame(username);
        } else {
            ToastAndroid.show('Введите корректное имя!', ToastAndroid.SHORT);
        }
    };

    const radio_props = [
        {label: 'Первая', value: 1 },
        {label: 'Вторая', value: 2 }
    ];

    return (
        <View style={styles.container}>
            <Text style={{textAlign: 'center', marginBottom: 100, fontSize: 50}}>Викторина</Text>
            <View>
                <View style={{marginBottom: 20}}>
                    <Text style={{marginBottom: 20, fontSize: 25}}>Категория</Text>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value) => {setCategory(value)}}
                    />
                </View>
                <TextInput
                    value={username}
                    onChangeText={(text => setUsername(text))}
                    style={styles.textInput}
                    placeholderTextColor={'gray'}
                    placeholder={'Введите ваше имя'}
                />
                <Button onPress={validateName} title='Начать игру!' color={colors.default}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textInput: {
        height: 40,
        marginBottom: 25,
        width: '100%',
        maxWidth: 270,
        borderColor: 'black',
        borderBottomWidth: 1,
        fontSize: 30
    },
});
