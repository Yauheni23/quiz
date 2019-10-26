import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Text, View, ScrollView, RefreshControl} from 'react-native';

export const Rating = ({data, onUpdate}) => {
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setRefreshing(false);
    }, [data]);

    const updateRating = () => {
        setRefreshing(true);
        onUpdate()
    };

    return (
        <ScrollView style={styles.container}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updateRating}/>}
        >
            <FlatList
                data={data}
                renderItem={({item}) => <Item {...item}/>}
                keyExtractor={item => `${item.id}`}
            />
        </ScrollView>
    );
}

export const Item = ({name, result, place}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{place}. {name}: {result}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    item: {
        marginVertical: 5,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 25,
    },
});
