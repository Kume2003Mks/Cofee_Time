import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import MapView, { Marker, MapToolbar } from 'react-native-maps';
import SearchBar from '../component/SearchBar';
import { GlobalStyles } from '../styles/GlobalStyles';

const MapScreen = () => {
  const markers = [
    {
      latitude: 14.884245,
      longitude: 102.026255,
      title: 'Class cafe ประตู 1',
    },
    {
      latitude: 14.884385,
      longitude: 102.026772,
      title: 'Coffee and cream',
    },
    {
      latitude: 14.884245,
      longitude: 102.026255,
      title: 'Class cafe ประตู 1',
    },
    {
      latitude: 14.904933,
      longitude: 102.010849,
      title: 'More Milk',
    },
    {
      latitude: 14.881884,
      longitude: 102.015055,
      title: 'Faraday Coffee',
    },
    {
      latitude: 14.884385,
      longitude: 102.026772,
      title: 'Coffee and cream',
    },
    {
      latitude: 14.922146,
      longitude: 101.993077,
      title: 'Polar Polar Cafeสาขา1',
    },
      {
      latitude: 14.876306,
      longitude: 102.043333,
      title: 'Takeoff Cafe By Otaru @Airplane Park KoratBy Otaru',
    },
      {
      latitude: 14.876379,
      longitude: 102.033522,
      title: 'นมหนมFOODมทส.ประตู1',
    },
      {
      latitude: 14.907155,
      longitude:102.011275,
      title: 'กาแฟเถื่อนละมุน ',
    },
      {
      latitude: 14.907810,
      longitude: 102.004021,
      title: 'Ananya Cafe',
    },
      {
      latitude: 14.902751,
      longitude: 102.009679,
      title: 'จุด 3 จุดมทส',
    },
      {
      latitude: 14.885112,
      longitude: 102.024944,
      title: 'ลัลลา',
    },
        {
      latitude: 14.909277,
      longitude: 102.014432,
      title: 'ลานหอมลานนม ',
    },
        {
      latitude: 14.864268,
      longitude: 102.036065,
      title: 'Alert Coffee',
    },
        {
      latitude: 14.885112,
      longitude: 102.024944,
      title: 'ลัลลา',
    },
        {
      latitude: 14.878558,
      longitude: 102.030909,
      title: 'ปั๊มนม Pอุ้ม',
    },
        {
      latitude: 14.904888,
      longitude: 102.011198,
      title: 'HOME cafe',
    },
         {
      latitude: 14.883680,
      longitude: 102.024923,
      title: 'Cafe Amazon',
    },
         {
      latitude: 14.899739,
      longitude: 102.051973,
      title: 'Sata Cafe',
    },
         {
      latitude: 14.874749,
      longitude: 102.015339,
      title: 'POLAR POLAR Campus Cafe',
    },
         {
      latitude: 14.904731,
      longitude: 102.010880,
      title: 'The Bloom Cafe',
    },
         {
      latitude: 14.898599,
      longitude: 102.049968,
      title: 'Little Hut Cafe',
    },
         {
      latitude: 14.901417,
      longitude: 102.069500,
      title: 'Saii Cafe',
    },
         {
      latitude: 14.903162,
      longitude: 102.056476,
      title: 'Ob-Oon Bakery&Coffee ',
    },
    // Add more markers as needed
  ];

  const initialRegion = {
    latitude: 14.882018,   // Latitude of Suranaree University Of Technology
    longitude: 102.021140, // Longitude of Suranaree University Of Technology
    latitudeDelta: 0.0922,  // Delta values determine the zoom level of the map
    longitudeDelta: 0.0421,
  };

  return (
    <View style={GlobalStyles.SafeAreaViewstyle}>
      <View style={{backgroundColor:'transparent'}}>
        <SearchBar />
      </View>
      <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
            />
          ))}
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
