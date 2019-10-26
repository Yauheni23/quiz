import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {VariantsAnswer} from "./VariantsAnswer";

export const Round = ({round, nextRound}) => {
    return (
        <View style={{height: '90%', width: '100%'}}>
            <View style={styles.questionContainer}>
                <Text style={{textAlign: 'center', fontSize: 20}}>{round.question}</Text>
            </View>
            <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                <VariantsAnswer
                    variantAnswers={round.variantAnswers}
                    answer={round.answer}
                    sendResult={(isRight) => nextRound(isRight)}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    questionContainer: {
        position: 'absolute',
        top: '30%',
        width: '100%',
    }
});
