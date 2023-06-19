import React from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';

const CoffeeDetailScreen = () => {
  const route = useRoute();
  const { image, description, name, recipe, step } = route.params;

  const formattedRecipe = recipe.map((item, index) => `${index + 1}. ${item}`);
  const formattedStep = step.map((item, index) => `${index + 1}. ${item}`);

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
      <View style={GlobalStyles.container}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.nameContainer}>
          <Text style={styles.HeaderText}>{name}</Text>
        </View>
        <View style={styles.descContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.HeaderText}>Description</Text>
            <Text >{description}</Text>
            <Text style={styles.HeaderText}>Recipe</Text>
            {formattedRecipe.map((item) => (
              <Text key={item}>{item}</Text>
            ))}
            <Text style={styles.HeaderText}>Step</Text>
            {formattedStep.map((item) => (
              <Text key={item}>{item}</Text>
            ))}
          </ScrollView>

        </View>

      </View>

    </SafeAreaView>
  );
};

export default CoffeeDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: undefined,
    aspectRatio: 16 / 9,
    resizeMode: "center",
    backgroundColor: "black",
    borderRadius: 15,
  },
  nameContainer: {
    width: "90%",
    height: "10%",
    backgroundColor: "gray",
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    justifyContent: "center",
  },
  HeaderText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    marginVertical: 10,

  },
  descContainer: {
    padding: 10,
    width: "90%",
    height: "59%",
    backgroundColor: "gray",
    borderRadius: 15,
  }
});
