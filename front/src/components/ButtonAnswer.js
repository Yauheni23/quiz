import React from 'react';
import {View, Button} from 'react-native';

export const ButtonAnswer = ({title, selectAnswer, color, disabled}) => {
    return (
        <View style={{width: '100%', margin: '1%', height: 40}}>
            <Button title={title} onPress={() => disabled ? null : selectAnswer()} color={color}/>
        </View>
    )
};


