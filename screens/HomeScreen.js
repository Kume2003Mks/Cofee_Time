import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import NewsCard from '../component/NewsCard';
import SearchBar from '../component/SearchBar';
import { GlobalStyles } from '../styles/GlobalStyles';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DB } from '../AppConfig/firebase';
import { createStackNavigator } from '@react-navigation/stack';
import NewsDetailScreen from './NewsDetailScreen';
import { useNavigation } from '@react-navigation/native';


const MenuStack = createStackNavigator();

export default function HomeScreen() {
    return (
        <MenuStack.Navigator>
    <MenuStack.Screen name="MenuList" component={MenuList} options={{ headerShown: false }} />
    <MenuStack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ headerShown: false }} />
      </MenuStack.Navigator>
    ); 
}

function MenuList() {
    const [menuList, setMenuList] = useState([]);
    const [filteredMenuList, setFilteredMenuList] = useState([]);
  
    useEffect(() => {
      const getMenu = async () => {
        try {
          const menuColRef = collection(DB, 'News');
          const menuSnapshot = await getDocs(menuColRef);
          const menuListData = menuSnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            ...doc.data(),
          }));
          setMenuList(menuListData);
        } catch (error) {
          console.error('Error fetching menu:', error);
        }
      };
  
      getMenu();
    }, []);
  
    const navigation = useNavigation();
  
    const handleSearch = (searchText) => {
      const formattedSearchText = searchText.trim().toLowerCase();
      const filteredItems = menuList.filter((item) =>
        item.name.toLowerCase().includes(formattedSearchText)
      );
      setFilteredMenuList(filteredItems);
    };
  
    return (
      <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
        <ScrollView contentContainerStyle={styles.view} showsVerticalScrollIndicator={false}>
          {(filteredMenuList.length > 0 ? filteredMenuList : menuList).map((item) => (
            <TouchableOpacity
              style={styles.CardStyle}
              key={item.id}
              onPress={() => navigation.navigate('NewsDetail', { ...item })}
            >
              <NewsCard {...item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        margin: 10,
    },
    box: {
        backgroundColor: '#E4D09D',
        width: '100%',
        height: undefined,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 15,
    },
    TextBox: {
        flex: 2,
        marginHorizontal: 10,
    },
    imgSize: {
        resizeMode: 'cover',
        borderRadius: 10,
        width: '100%',
        height: undefined,
        aspectRatio: 3 / 4,
        flex: 1
    },
    Boxh1: {
        fontSize: 20,

    },
    Boxh2: {
        fontSize: 14
    },
});
