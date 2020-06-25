import React from 'react'
import { Text } from 'react-native'
import MoviesNavigator from './movies/MoviesNavigator'
import MoviePage from './movies/MoviePage'
import Header from './Header'
import { createStackNavigator } from '@react-navigation/stack'

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
        {props => <MoviePage {...props} />}
      </Screen>
    </Navigator>
  )
}

export default MoviesContainer