import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import MenuCard from '../component/MenuCard';
import SearchBar from '../component/SearchBar';
import { GlobalStyles } from '../styles/GlobalStyles';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DB } from '../AppConfig/firebase';
import { createStackNavigator } from '@react-navigation/stack';
import CoffeeDetailScreen from './CoffeeDetailScreen';
import { useNavigation } from '@react-navigation/native';

const MenuStack = createStackNavigator();

export default function MenuScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="MenuList" component={MenuList} options={{ headerShown: false }} />
      <MenuStack.Screen name="CoffeeDetail" component={CoffeeDetailScreen} options={{ headerShown: false }} />
    </MenuStack.Navigator>
  );
}

function MenuList() {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const menuColRef = collection(DB, 'Coffee-Menu');
        const menuSnapshot = await getDocs(menuColRef);
        const menuListData = menuSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(menuList);
        setMenuList(menuListData);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    getMenu();
    console.log(menuList);
  }, []);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
      <SearchBar />
      <ScrollView contentContainerStyle={styles.view} showsVerticalScrollIndicator={false}>
        {menuList.map(item => (
          <TouchableOpacity style={styles.CardStyle} key={item.id} onPress={() => navigation.navigate('CoffeeDetail', { ...item })}>
            <MenuCard {...item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 5,
    paddingBottom: 80,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  CardStyle :{
    width: '45%',

  },
});
