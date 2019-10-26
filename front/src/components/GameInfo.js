import {Text, View, StyleSheet} from "react-native";
import React from "react";

export const GameInfo = ({hitPoints, currentRound, countAllRound}) => {
    return (
        <View style={styles.topBar}>
            <View style={styles.hitPoints}>
                {hitPoints}
            </View>
            <Text style={styles.stateGame}>
                {currentRound}/{countAllRound}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#002044',
    },
    hitPoints: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    stateGame: {
        textAlign: 'right',
        fontSize: 40,
        color: '#ffffff',
    }
})