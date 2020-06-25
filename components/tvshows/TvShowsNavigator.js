import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MovieSection from '../MovieSection'
import { searchTvShowsApi } from '../Api/api'
import SearchCategory from '../SearchCategory'
import { Feather, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { getPopularTvShows, getTopRatedTvShows, getTvShowsOnAir } from '../Api/api'

const { Navigator, Screen } = createBottomTabNavigator()

const sections = [{
  name: 'Top Rated',
  data: getTopRatedTvShows,
  getIcon(focused) {
    return (<Ionicons name="md-stats" size={24} color={focused ? '#66C7D9' : '#D1D2D3'} />
    )
  }
}, {
  name: 'On Air',
  data: getTvShowsOnAir,
  getIcon(focused) {
    return (<Feather name="tv" size={24} color={focused ? '#66C7D9' : '#D1D2D3'} />)
  }
}, {
  name: 'Popular',
  data: getPopularTvShows,
  getIcon(focused) {
    return (<FontAwesome name="line-chart" size={24} color={focused ? '#66C7D9' : '#D1D2D3'} />)
  }
}]


class TvShowsNavigator extends Component {
  render() {
    return (
      <Navigator
        tabBarOptions={{
          activeTintColor: '#66C7D9',
          inactiveTintColor: '#D1D2D3'
        }}
      >
        {sections.map(section => (
          <Screen
            key={section.name}
            name={section.name}
            options={{
              tabBarIcon: ({ focused }) => section.getIcon(focused),
            }}>
            {props => <MovieSection {...props} category='Tv Shows' getData={section.data} />}
          </Screen>
        ))}
        <Screen
          name='Search'
          options={{
            tabBarIcon: ({ focused }) => <AntDesign name="search1" size={24} color={focused ? '#66C7D9' : '#D1D2D3'} />
          }}>
          {props => <SearchCategory {...props} category='Tv Shows' searchCategoryApi={searchTvShowsApi} />}
        </Screen>
      </Navigator>
    )
  }
}

export default TvShowsNavigator