import React, { useEffect, useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DB } from '../AppConfig/firebase';

const ShakeRandomizer = () => {
  const [randomProduct, setRandomProduct] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    let subscription;

    const startShakeDetection = async () => {
      subscription = Accelerometer.addListener(({ x, y, z }) => {
        const shakeThreshold = 1.2;

        if (!isShaking && (Math.abs(x) > shakeThreshold || Math.abs(y) > shakeThreshold || Math.abs(z) > shakeThreshold)) {
          fetchRandomProduct();
          setIsShaking(true);
        }
      });
    };

    const fetchRandomProduct = async () => {
      try {
        const menuColRef = collection(DB, 'Coffee-Menu');
        const menuSnapshot = await getDocs(menuColRef);
        const menuListData = menuSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const randomIndex = Math.floor(Math.random() * menuListData.length);
        const selectedProduct = menuListData[randomIndex];
        setRandomProduct(selectedProduct);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    const stopShakeDetection = () => {
      subscription && subscription.remove();
    };

    startShakeDetection();

    return () => {
      stopShakeDetection();
    };
  }, [isShaking]);

  const handleShakeAgain = () => {
    setIsShaking(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {randomProduct ? (
        <>
          <Image source={{ uri: randomProduct.image }} style={{ width: 200, height: 200 }} />
          <Text style={{ fontSize: 24 }}>{randomProduct.name}</Text>
          <Button title="Shake Again" onPress={handleShakeAgain} />
        </>
      ) : (
        <Text style={{ fontSize: 24 }}>Shake Shake It!</Text>
      )}
    </View>
  );
};

export default ShakeRandomizer;
