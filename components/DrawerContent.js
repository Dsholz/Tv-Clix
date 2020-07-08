import React, { Component, useState, useEffect } from 'react'
import { View, Text, Animated } from 'react-native'
import { DrawerItem, useIsDrawerOpen } from '@react-navigation/drawer'
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';

const DrawerContent = (props) => {
  const [slide] = useState(new Animated.Value(-170))
  const [opacity] = useState(new Animated.Value(0))

  const isDrawerOpen = useIsDrawerOpen()

  useEffect(() => {
    if (isDrawerOpen) {
      Animated.timing(slide, {
        toValue: 0,
        duration: 500,
        delay: 200
      }).start()
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: 300
      }).start()
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        backgroundColor: '#66C7D9', height: 150, justifyContent: "center", alignItems: "center"
      }}
      >
        <Animated.View style={{ transform: [{ translateX: slide }] }}>
          <Entypo name="laptop" size={30} color="#fff" />
        </Animated.View>
        <Animated.Text style={{ color: '#fff', fontSize: 30, opacity }}>Tv Clix</Animated.Text>
      </View>
      <DrawerItem
        icon={() => <MaterialCommunityIcons name="movie-open-outline" size={35} color="black" />}
        label={() => <Text style={{ fontSize: 18 }}>Movies</Text>}
        onPress={() => props.navigation.navigate('Movies')}
      />
      <DrawerItem
        icon={() => <MaterialIcons name="live-tv" size={35} color="black" />}
        label={() => <Text style={{ fontSize: 18 }}>Tv Shows</Text>}
        onPress={() => props.navigation.navigate('Tv Shows')}
      />
    </View>
  )
}

// Types of Images :
// - Dennotative Images
// - Connotative Images

//https://expo.io/artifacts/9cbabe5a-d61a-47e3-9ddc-cbf94b5ca832

//KeyStore Password - fb54803f3961462e809008cbd1768427
//Key alias - QGRhbmllbHNvbGFkb3llL2V4cG8tdGVtcGxhdGUtYmFyZQ==
//Key password - fac16268f07d476fa5027710fb469817
//Path to Keystore - C:\Users\User\Desktop\Projects\Peeps-Clix\expo-template-bare.jks

export default DrawerContent