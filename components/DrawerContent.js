import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

class DrawerContent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#66C7D9', height: 150, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: '#fff', fontSize: 30 }}>Peeps Clix</Text>
        </View>
        <DrawerItem
          icon={() => <MaterialCommunityIcons name="movie-open-outline" size={35} color="black" />}
          label={() => <Text style={{ fontSize: 18 }}>Movies</Text>}
        />
        <DrawerItem
          icon={() => <MaterialIcons name="live-tv" size={35} color="black" />}
          label={() => <Text style={{ fontSize: 18 }}>Tv Series</Text>}
        />
      </View>
    )
  }
}

export default DrawerContent