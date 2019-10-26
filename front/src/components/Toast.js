import React from 'react';
import Toast from 'react-native-easy-toast';

export const Toaster = (props) => {
    return (
        <Toast
            ref="toast"
            style={{backgroundColor:'red'}}
            position='top'
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{color:'red'}}
        />
    )
}