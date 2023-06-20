import React from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';

const CoffeeDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { image, description, name, recipe, step } = route.params;

  const formattedRecipe = recipe.map((item, index) => `${index + 1}. ${item}`);
  const formattedStep = step.map((item, index) => `${index + 1}. ${item}`);

  const handleBack = () => {
    navigation.navigate('MenuList');
  };

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
      <View style={GlobalStyles.container}>
        <TouchableOpacity style={styles.blackBtn} onPress={handleBack}>
        <Image source={require('../assets/icon/Back.png')}
          style={styles.iconSize} />
          <Text style={styles.blackText}>Black</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.HeaderText}>{name}</Text>
        </View>
        <View style={styles.descContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.HeaderText}>Description</Text>
            <Text style={styles.contentText} >{description}</Text>
            <Text style={styles.HeaderText}>Recipe</Text>
            {formattedRecipe.map((item) => (
              <Text style={styles.contentText} key={item}>{item}</Text>
            ))}
            <Text style={styles.HeaderText}>Step</Text>
            {formattedStep.map((item) => (
              <Text style={styles.contentText} key={item}>{item}</Text>
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
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    resizeMode: 'center',
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  imageContainer: {
    marginHorizontal: 15,
    backgroundColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    flexWrap: 'wrap', 
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    width: '90%',
    flex: 1,
    backgroundColor: '#F5E7C5',
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    justifyContent: 'center',
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginVertical: 10,

  },
  descContainer: {
    padding: 10,
    width: '90%',
    flex: 6,
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
