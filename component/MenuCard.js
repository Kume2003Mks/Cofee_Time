import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function MenuCard(props) {
    return (
        <View style={styles.Cardcontainer}>
            <TouchableOpacity>
                <Image style={styles.imgfream} source={{ uri: props.image }} />
                <View style={styles.Cardcontent}>
                    <Text style>{props.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Cardcontainer: {
        backgroundColor: '#F5E7C5',
        borderRadius: 15,
        elevation: 5,
        marginBottom: 25,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
            width: 3
        },
        flexDirection: 'column',
        padding: 15,
        width: '45%',
        alignItems: 'center',
    },
    imgfream: {
        resizeMode: 'cover',
        borderRadius: 10,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    Cardcontent: {
        paddingTop: 10,
    }
});