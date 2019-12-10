import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/colors';
import {UserContext} from '../../App';
import {Rating} from '../components/Rating';
import {UserService} from "../services/user.service";

export const ResultPage = ({result, restartGame}) => {
    const [results, setResults] = useState([]);
    const user = useContext(UserContext);

    useEffect(() => {
        UserService.getInstance().createUser({
            name: user,
            result: result.countRightAnswers,
        })
    }, []);

    useEffect(() => {
        UserService.getInstance().users
            .subscribe(users => setResults(users))
    }, []);

    return (
        <View>
            {results.length ?
                <View style={styles.container}>
                    <Text style={styles.textResult}>Ваш результат</Text>
                    <Text style={styles.result}>{result.countRightAnswers}/{result.countRound}</Text>
                    <Button title='Сыграть ещё раз?' onPress={() => restartGame()} color={colors.default}/>
                    <Text style={{fontSize: 35}}>Результаты:</Text>
                    <Rating data={results} />
                </View>
                : <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            }
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
    },
    textResult: {
        textAlign: 'center',
        fontSize: 40
    },
    result: {
        textAlign: 'center',
        fontSize: 40
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    }
});
