import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import MenuCard from '../component/MenuCard';
import SearchBar from '../component/SearchBar';
import { GlobalStyles } from '../styles/GlobalStyles';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DB } from '../AppConfig/firebase';

export default function MenuScreen() {
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        const getMenu = async () => {
            try {
                const menuColRef = collection(DB, 'Coffee-Menu');
                const menuSnapshot = await getDocs(menuColRef);
                const menuListData = menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMenuList(menuListData);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        getMenu();
    }, []);

    return (
        <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
            <SearchBar />
            <ScrollView contentContainerStyle={styles.view} showsVerticalScrollIndicator={false}>
                {menuList.map(item => (
                    <MenuCard key={item.id} {...item} />
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
});
