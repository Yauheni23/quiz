import {View, StyleSheet, ActivityIndicator} from "react-native";
import {Icon} from 'react-native-elements';
import React, {useEffect, useState, useMemo} from "react";
import {Round} from "../components/Round";
import {ResultPage} from "./result";
import {gameQuestions} from '../mockData/questions';
import {GameInfo} from "../components/GameInfo";
import {serverAddress} from "../constants/server"

export const GamePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [game, setGame] = useState([]);
    const [countRightAnswers, setCountRightAnswers] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [countHeart, setCountHeart] = useState(3);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${serverAddress}/game`)
            .then((response) => response.json())
            .then(data => setGame(data.game))
            .catch(() => setGame(gameQuestions.sort(() => Math.random() - 0.5).slice(0, 10)))
            .finally(() => setIsLoading(false))
    }, [countHeart === 0]);

    const hitPoints = useMemo(() => new Array(countHeart).fill(0).map((el, index) =>
        <View style={styles.hitPoints} key={index}>
            <Icon name='heart' type='font-awesome' size={40} color="#E51616"/>
        </View>
    ), [countHeart]);

    function startNextRound(isRight) {
        if (isRight) {
            setCountRightAnswers(countRightAnswers + 1);
        } else {
            setCountHeart(countHeart - 1);
        }

        setCurrentRound(currentRound + 1);
    }

    function restartGame() {
        setCountRightAnswers(0);
        setCurrentRound(0);
        setCountHeart(3);
    }

    return (
        <View>
            {game.length && !isLoading ?
                <View>
                    {currentRound < game.length && countHeart > 0 ?
                        <View>
                            <GameInfo hitPoints={hitPoints} currentRound={currentRound + 1}
                                      countAllRound={game.length}/>
                            <Round round={game[currentRound]} nextRound={(isRight) => startNextRound(isRight)}/>
                        </View>
                        : <ResultPage restartGame={() => restartGame()}
                                      result={{countRightAnswers, countRound: game.length}}/>
                    }
                </View>
                : <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            }
        </View>

    );
};

const styles = StyleSheet.create({
    hitPoints: {
        paddingLeft: 5
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    }
});
