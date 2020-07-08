import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Header from './Header'
import TvShowsNavigator from './TvShowsNavigator'
import ItemPage from './ItemPage'
import { getTvShow } from '../Api/api'

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
      options={{
        header: () => <Text style={{ height: 0 }}></Text>
      }}>
      {props => <ItemPage category='Tv Show' getItem={getTvShow} {...props} />}
    </Screen>
  </Navigator>
)

export default TvShowsContainer