import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TvShowsContainer from './components/TvShowsContainer'
import MoviesContainer from './components/MoviesContainer'
import DrawerContent from './components/DrawerContent'
import { Text } from 'react-native'

const Drawer = createDrawerNavigator()

const App = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name='Movies' component={MoviesContainer} />
      <Drawer.Screen name='Tv Shows' component={TvShowsContainer} />
    </Drawer.Navigator>
  </NavigationContainer>
)

export default App