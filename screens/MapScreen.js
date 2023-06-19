import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SearchBar from '../component/SearchBar';
import { GlobalStyles } from '../styles/GlobalStyles';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { DB } from '../AppConfig/firebase';

const MapScreen = () => {
  const [mapList, setMapList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const getMenu = async () => {
      try {
        const mapColRef = collection(DB, 'Markers');
        let mapQuery = query(mapColRef);
  
        if (searchQuery) {
          const searchValue = searchQuery.toLowerCase(); // Convert the search query to lowercase
          mapQuery = query(mapColRef, where('title', '==', searchValue)); // Perform a case-insensitive comparison
        }
  
        const mapSnapshot = await getDocs(mapQuery);
        const mapListData = mapSnapshot.docs.map((doc) => ({
          id: doc.id,
          latitude: doc.data().location.latitude,
          longitude: doc.data().location.longitude,
          title: doc.data().title,
        }));
        setMapList(mapListData);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
  
    getMenu();
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const initialRegion = {
    latitude: 14.882018,   // Latitude of Suranaree University Of Technology
    longitude: 102.021140, // Longitude of Suranaree University Of Technology
    latitudeDelta: 0.0922,  // Delta values determine the zoom level of the map
    longitudeDelta: 0.0421,
  };

  return (
    <View style={GlobalStyles.SafeAreaViewstyle}>
      <View style={{ backgroundColor: 'transparent' }}>
        <SearchBar onSearch={handleSearch} />
      </View>
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {mapList.map((item) => {
            const { id, latitude, longitude, title } = item;
            if (latitude && longitude) {
              return (
                <Marker
                  key={id}
                  coordinate={{ latitude, longitude }}
                  title={title}
                />
              );
            }
            return null;
          })}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12, // Adjust the marginTop to avoid the navigation bar
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
