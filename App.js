import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TvShowsContainer from './components/TvShowsContainer'
import MoviesContainer from './components/MoviesContainer'
import DrawerContent from './components/DrawerContent'

const Drawer = createDrawerNavigator()

const App = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={(props) => <DrawerContent navigation={props.navigation} />}>
      <Drawer.Screen name='Movies' component={MoviesContainer} />
      <Drawer.Screen name='Tv Shows' component={TvShowsContainer} />
    </Drawer.Navigator>
  </NavigationContainer>
)

export default App