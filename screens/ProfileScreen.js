import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStyles } from '../styles/GlobalStyles';
import EditprofileScreen from '../screens/EditprofileScreen';
import { auth, currentUser } from '../AppConfig/firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

const ProfileStack = createStackNavigator();

const ProductCard = () => {
    {/*เมนูกาแฟ*/ }
    return (
        <View style={[styles.card, { backgroundColor: '#F5E7C5', marginRight: 10 }]}>

            <Image
                style={styles.image}

                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/coffee-time-76b8f.appspot.com/o/coffeePic%2F2.jpg?alt=media&token=44a5584d-be46-429e-bc77-d9971b410603&_gl=1*tldigs*_ga*MTM4ODg4OTMzMC4xNjg1MzUzNTAw*_ga_CW55HF8NVT*MTY4NjU1NjU2NS4xMC4xLjE2ODY1NTg1NDIuMC4wLjA.' }}
            />
            <Text style={styles.title}>Product</Text>

        </View>
    );
};

const ProfilePage = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate('SignIn');
            })
            .catch((error) => {
                console.error('Logout Error:', error);
            });
    };

    return (
        <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
            <View style={styles.profileContainer}>
                <Text style={{
                    alignContent: 'center',
                    marginVertical: 10, fontSize: 24, fontWeight: 'bold',
                }}>
                    Profile
                </Text>
                <Image source={{ uri: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg' }}
                    style={styles.profileImage} />
                <Text style={[styles.cardTitle, { color: 'black' }]}>{userEmail}</Text>
                {/*ชื่อ user*/}
                <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('Edit Profile')}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                {/* My Menu Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>My Menu</Text>


                    <View style={styles.coffeeCard}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>

                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            {/*เมนูกาแฟ*/}
                        </ScrollView>

                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.favButton}>
                <Text style={styles.favButtonText}>My Favourites</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>);
};

const ProfileScreen = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
            <ProfileStack.Screen name="Edit Profile" component={EditprofileScreen} options={{ headerShown: false }}/>
        </ProfileStack.Navigator>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        marginRight: 1,
    },
    image: {
        backgroundColor: 'black',
        width: 120,
        height: 120,
        padding: 10,
        borderRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#000000',
        marginVertical: 5,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 5,
        borderColor: '#000000',
    },
    editProfileButton: {
        backgroundColor: '#4B1F0B',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginBottom: 10,
    },
    editProfileText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    cardContainer: {
        borderRadius: 15,
        marginBottom: 5,
        width: '100%',
    },
    card: {
        backgroundColor: '#4B1F0B',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        color: 'white',
    },
    coffeeCard: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        height: 200,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    logoutButton: {
        backgroundColor: '#4B1F0B',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    favButton: {
        backgroundColor: '#4B1F0B',
        paddingVertical: 10,
        paddingHorizontal: 120,
        borderRadius: 20,
        marginBottom: 30,
    },
    favButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default ProfileScreen;
