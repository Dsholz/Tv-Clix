import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import ShowPage from './tvshows/ShowPage'
import Header from './Header'
import TvShowsNavigator from './tvshows/TvShowsNavigator'

const { Navigator, Screen } = createStackNavigator()

const TvShowsContainer = () => (
  <Navigator>
    <Screen
      name='Tv Shows'
      options={{
        header: ({ navigation }) => <Header title='Tv Shows' navigation={navigation} />
      }}
      component={TvShowsNavigator} />
    <Screen
      name='Show Page'
      component={ShowPage}
      options={{
        header: () => <Text style={{ height: 0 }}></Text>
      }} />
  </Navigator>
)

export default TvShowsContainer