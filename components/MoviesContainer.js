import React from 'react'
import { Text } from 'react-native'
import MoviesNavigator from './movies/MoviesNavigator'
import Header from './Header'
import { createStackNavigator } from '@react-navigation/stack'
import ItemPage from './ItemPage'
import { getMovie } from './Api/api'

const { Navigator, Screen } = createStackNavigator()


const MoviesContainer = () => {
  return (
    <Navigator>
      <Screen
        name='Movies'
        options={{
          header: ({ navigation }) => <Header title='Movies' navigation={navigation} />
        }}
        component={MoviesNavigator} />
      <Screen
        name='MoviePage'
        options={{
          header: () => <Text style={{ height: 0 }}></Text>
        }}>
        {props => <ItemPage category='Movies' getItem={getMovie} {...props} />}
      </Screen>
    </Navigator>
  )
}

export default MoviesContainer