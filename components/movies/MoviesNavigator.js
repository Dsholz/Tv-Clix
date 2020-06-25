import React from 'react'
import { View, StatusBar, SectionList } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MovieSection from '../MovieSection'
import SearchCategory from './SearchCategory'
import { MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { getUpcomingMovies, getMostPopularMovies, getNowPlayingMovies } from '../Api/api'
import { searchMoviesApi } from '../Api/api'

const { Navigator, Screen } = createBottomTabNavigator()

const sections = [{
  name: 'Upcoming',
  data: getUpcomingMovies,
  getIcon(focused) {
    return (<FontAwesome name="line-chart" size={24} color={focused ? '#66C7D9' : '#D1D2D3'} />
    )
  }
}, {
  name: 'Popular',
  data: getMostPopularMovies,
  getIcon(focused) {
    return (<MaterialCommunityIcons name="chart-gantt" size={24} color={focused ? '#66C7D9' : '#D1D2D3'} />)
  }
}, {
  name: 'In Theatres',
  data: getNowPlayingMovies,
  getIcon(focused) {
    return (<AntDesign name="search1" size={24} color={focused ? '#66C7D9' : '#D1D2D3'} />)
  }
}]

const MoviesNavigator = () => (
  <View style={{ flex: 1 }}>
    <StatusBar backgroundColor='#66C7D9' />
    <Navigator
      tabBarOptions={{
        activeTintColor: '#66C7D9',
        inactiveTintColor: '#D1D2D3'
      }}
    >
      {sections.map(section => (
        <Screen
          name={section.name}
          options={{
            tabBarIcon: ({ focused }) => section.getIcon(focused),
          }}>
          {props => <MovieSection {...props} category='Movies' getData={section.data} />}
        </Screen>
      ))}
      <Screen
        name='Search'
        options={{
          tabBarIcon: ({ focused }) => <AntDesign name="search1" size={24} color={focused ? '#66C7D9' : '#D1D2D3'} />
        }}>
        {props => <SearchCategory {...props} searchCategoryApi={searchMoviesApi} />}
      </Screen>
    </Navigator>
  </View>
)

export default MoviesNavigator