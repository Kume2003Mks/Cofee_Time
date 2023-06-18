import React from 'react';
import { StyleSheet, View, Image, Text,SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';

const CoffeeDetailScreen = () => {
  const route = useRoute();
  const { image, description } = route.params;

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
        <View style={GlobalStyles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CoffeeDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: undefined,
    aspectRatio: 16/9,
    resizeMode: "center",
    backgroundColor:"black",
    borderRadius: 15
  },
});
