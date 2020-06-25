import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Octicons } from '@expo/vector-icons';

class Header extends Component {
  render() {
    const { navigation, title } = this.props

    return (
      <View style={styles.container}>

        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.openDrawer()}>

          <Octicons name="three-bars" size={30} color="#fff" />

        </TouchableOpacity>

        <Text style={styles.text}>{title}</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#66C7D9',
    flexDirection: 'row',
    borderBottomWidth: 0.1,
    borderBottomColor: '#000',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: '#fff'
  }
})

export default Header