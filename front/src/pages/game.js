import {View, StyleSheet, ActivityIndicator} from "react-native";
import {Icon} from 'react-native-elements';
import React, {useEffect, useState, useMemo, useContext} from "react";
import {Round} from "../components/Round";
import {ResultPage} from "./result";
import {GameInfo} from "../components/GameInfo";
import {CategoryContext} from "../../App";
import {QuestionService} from "../services/question.service";
import {LoadingService} from "../services/loading.service";

let countRound = 10;

export const GamePage = () => {
    const category = useContext(CategoryContext);
    const [isLoading, setIsLoading] = useState(false);
    const [gameStatus, setGameStatus] = useState({
        countRightAnswers: 0,
        currentRound: 0,
        countHeart: 3,
    });
    const [game, setGame] = useState([]);

    useEffect(() => {
        LoadingService.getInstance().loading.subscribe(loading => {
            setIsLoading(loading);
        });
    }, []);

    useEffect(() => {
        QuestionService.getInstance().getQuestions(category).subscribe(questions => {
            setGame(questions);
            countRound = questions.length;
        });
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
