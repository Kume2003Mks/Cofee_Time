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
      <MenuStack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
      <MenuStack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ headerShown: false }} />
    </MenuStack.Navigator>
  );
}

function HomePage() {
  const [NewList, setNewList] = useState([]);
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
        setNewList(menuListData);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    getMenu();
  }, []);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
      <View style={styles.viewContainer}>
        <Text style={GlobalStyles.H1}>News</Text>
        <ScrollView contentContainerStyle={styles.view} horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {(filteredMenuList.length > 0 ? filteredMenuList : NewList).map((item) => (
            <TouchableOpacity
              style={styles.box}
              key={item.id}
              onPress={() => navigation.navigate('NewsDetail', { ...item })}
            >
              <NewsCard {...item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.viewContainer}>
        <Text style={GlobalStyles.H1}>Other</Text>
        {/* เพิ่มปุ่มตรงนี้ */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 5,
  },
  box: {
    width: 275,
    borderRadius: 15,
  },
  TextBox: {
    flex: 2,
    marginHorizontal: 10,
  },

  Boxh1: {
    fontSize: 20,

  },
  Boxh2: {
    fontSize: 14
  },
});
