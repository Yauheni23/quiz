import {View, StyleSheet, ActivityIndicator} from "react-native";
import {Icon} from 'react-native-elements';
import React, {useEffect, useState, useMemo} from "react";
import {Round} from "../components/Round";
import {ResultPage} from "./result";
import {gameQuestions} from '../mockData/questions';
import {GameInfo} from "../components/GameInfo";
import {serverAddress} from "../constants/server"

const countRound = 10;

export const GamePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [gameStatus, setGameStatus] = useState({
        countRightAnswers: 0,
        currentRound: 0,
        countHeart: 3,
    });
    const [game, setGame] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${serverAddress}/game`)
            .then((response) => response.json())
            .then(data => setGame(data.game.sort(() => Math.random() - 0.5)))
            .catch(() => setGame(gameQuestions.sort(() => Math.random() - 0.5)))
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    const hitPoints = useMemo(() => new Array(gameStatus.countHeart).fill(0).map((el, index) =>
        <View style={styles.hitPoints} key={index}>
            <Icon name='heart' type='font-awesome' size={40} color="#E51616"/>
        </View>
    ), [gameStatus.countHeart]);

    function startNextRound(isRight) {
        const newGameStatus = {
            ...gameStatus,
            currentRound: gameStatus.currentRound + 1,
            countRightAnswers: isRight ? gameStatus.countRightAnswers + 1 : gameStatus.countRightAnswers,
            countHeart: isRight ? gameStatus.countHeart : gameStatus.countHeart - 1,
        };

        setGameStatus(newGameStatus);
    }

    function restartGame() {
        setGame(game.sort(() => Math.random() - 0.5));
        setGameStatus({
            countRightAnswers: 0,
            currentRound: 0,
            countHeart: 3,
        });
    }

    return (
        <View>
            {game.length && !isLoading ?
                <View>
                    {gameStatus.currentRound < countRound && gameStatus.countHeart > 0 ?
                        <View>
                            <GameInfo hitPoints={hitPoints} currentRound={gameStatus.currentRound + 1}
                                      countAllRound={countRound}/>
                            <Round round={game[gameStatus.currentRound]} nextRound={(isRight) => startNextRound(isRight)}/>
                        </View>
                        : <ResultPage restartGame={() => restartGame()}
                                      result={{countRightAnswers: gameStatus.countRightAnswers, countRound}}/>
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
