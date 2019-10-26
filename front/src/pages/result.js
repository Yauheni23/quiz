import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/colors';
import {UserContext} from '../../App';
import axios from 'axios';
import {serverAddress} from '../constants/server';
import {Rating} from '../components/Rating';

export const ResultPage = ({result, restartGame}) => {
    const [results, setResults] = useState([]);
    const user = useContext(UserContext);

    useEffect(() => {
        axios.post(`${serverAddress}/user`, {
            name: user,
            result: result.countRightAnswers,
        }).then(() => {
            return axios.get(`${serverAddress}/user`)
        }).then((response) => setResults(mapResults(response.data)));
    }, []);

    function updateResults() {
        axios.get(`${serverAddress}/user`)
            .then((response) => setResults(mapResults(response.data)))
    }

    function mapResults(results) {
        return results.sort((prev, next) => prev.result < next.result ? 1 : -1)
            .map((el, index) => ({
                ...el,
                place: index + 1,
            }))
    }

    return (
        <View>
            {results.length ?
                <View style={styles.container}>
                    <Text style={styles.textResult}>Ваш результат</Text>
                    <Text style={styles.result}>{result.countRightAnswers}/{result.countRound}</Text>
                    <Button title='Сыграть ещё раз?' onPress={() => restartGame()} color={colors.default}/>
                    <Text style={{fontSize: 35}}>Результаты:</Text>
                    <Rating data={results} onUpdate={() => updateResults()}/>
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
