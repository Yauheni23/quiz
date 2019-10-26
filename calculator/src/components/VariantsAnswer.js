import {View, StyleSheet} from "react-native";
import React from "react";
import {ButtonAnswer} from "./ButtonAnswer";
import {colors} from "../constants/colors";

const defaultStateButton =[colors.default, colors.default, colors.default, colors.default];

export const VariantsAnswer = ({variantAnswers, answer, sendResult}) => {
    const [colorButtons, setColorButtons] = React.useState(defaultStateButton);
    const [disabledButtons, setDisabledButtons] = React.useState(false);

    function checkAnswer(selectedAnswer) {
        const isRight = selectedAnswer === answer;
        const newColorButtons = variantAnswers.map(el => el === answer ? colors.right : colors.default);

        if (!isRight) {
            const wrongAnswer = variantAnswers.findIndex(el => el === selectedAnswer);
            newColorButtons[wrongAnswer] = colors.wrong;
        }

        setColorButtons(newColorButtons);
        setDisabledButtons(true);

        setTimeout(() => {
            setColorButtons(defaultStateButton);
            setDisabledButtons(false);
            sendResult(isRight);
        }, 1000);
    }

    return (
        <View style={styles.buttonAnswerContainer}>
            {variantAnswers.map((el, index) =>
                <ButtonAnswer
                    key={index}
                    title={el}
                    selectAnswer={() => checkAnswer(el)}
                    color={colorButtons[index]}
                    disabled={disabledButtons}
                />)}
        </View>
    )
};

const styles = StyleSheet.create({
    buttonAnswerContainer: {
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
