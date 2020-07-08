import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

class Movie extends Component {
  navigateToCategoryItem = (id) => {
    const { navigation, category } = this.props
    const categoryPage = category === 'Movies' ? 'MoviePage' : 'Show Page'

    navigation.push(categoryPage, {
      id
    })
  }

  render() {
    const { itemData, category } = this.props
    const title = category === 'Movies' ? itemData.title : itemData.name
    const airDate = category === 'Movies' ? itemData.release_date : itemData.first_air_date

    return (
      <TouchableOpacity onPress={() => this.navigateToCategoryItem(itemData.id)}>
        <View style={{ margin: 10 }}>
          {itemData.poster_path
            ? <Image
              source={{ uri: `https://image.tmdb.org/t/p/w300/${itemData.poster_path}` }}
              style={{ height: 270, width: 185, borderRadius: 4 }}
            /> : <Image
              source={require('../assets/no-image.png')}
              style={{ height: 270, width: 185, borderRadius: 4 }}
            />}
          <Text>{title.length < 20
            ? title
            : `${title.slice(0, 20)}...`} </Text>

          <Text style={{ color: '#6b6b6b' }}>{airDate ? airDate.slice(0, 4) : 'N / A'}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default Movie