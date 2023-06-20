import React from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';

const NewsDetailScreen = ({ navigation }) => {
    const route = useRoute();
    const { image, description, title} = route.params;

    const handleBack = () => {
        navigation.navigate('MenuList');
    };

    return (
        <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
            <View style={GlobalStyles.container}>
                <TouchableOpacity style={styles.blackBtn} onPress={handleBack}>
                    <Image source={require('../assets/icon/Back.png')} style={styles.iconSize} />
                    <Text style={styles.blackText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.HeaderText}>{title}</Text>
                </View>
                <View style={styles.descContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.HeaderText}>Description</Text>
                        <Text style={styles.contentText}>{description}</Text>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 4 / 3,
        resizeMode: 'center',
    },
    iconSize: {
        width: 20,
        height: 20,
    },
    imageContainer: {
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 0,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },
    nameContainer: {
        width: '90%',
        height: '10%',
        backgroundColor: '#F5E7C5',
        borderRadius: 15,
        marginVertical: 10,
        padding: 10,
        justifyContent: 'center',
        height: 100,
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        marginVertical: 1,
    },
    descContainer: {
        padding: 10,
        width: '90%',
        height: '59%',
        backgroundColor: '#F5E7C5',
        borderRadius: 15,
    },
    contentText: {
        fontSize: 14,
        textAlign: 'justify',
        color: 'black',
        marginHorizontal: 10,
    },
    blackBtn: {
        width: '90%',
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    blackText: {
        marginLeft: 3
    },
});
