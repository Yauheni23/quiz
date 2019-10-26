import React, {useState} from 'react';
import {StatusBar, ImageBackground} from 'react-native';
import {GamePage} from './src/pages/game';
import {MainPage} from './src/pages/main';

console.disableYellowBox = true;

export const UserContext = React.createContext('');

export default function App() {
    const [isGame, setGame] = useState(false);
    const [user, setUser] = useState('');

    function start(username) {
        setUser(username);
        setGame(true);
    }

    return (
        <UserContext.Provider value={user}>
            <ImageBackground
                source={require('./assets/1853cf856c7b98c794eb1d67a75e4120.jpg')}
                style={{width: '100%', height: '100%'}}
            >
                <StatusBar hidden/>
                {isGame ? <GamePage/> : <MainPage startGame={(username) => start(username)}/>}
            </ImageBackground>
        </UserContext.Provider>
    );
}
