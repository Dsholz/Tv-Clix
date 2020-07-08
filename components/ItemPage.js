import React, { Component } from 'react'
import {
  View, Text, Image, FlatList, StyleSheet,
  ScrollView, TouchableOpacity
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Details from './Details'


class MoviePage extends Component {
  state = {
    item: {},
    showLoader: true
  }

  componentDidMount() {
    const { route } = this.props

    this.props.getItem(route.params.id)
      .then(item => {
        this.setState(() => ({
          item,
          showLoader: false
        }))
      })
  }

  render() {
    const { route, navigation, category } = this.props
    const { backdrop_path, genres, title, name } = this.state.item

    return (
      <ScrollView style={{ position: "relative" }}>
        <View
          style={{ position: "absolute", zIndex: 10, height: 50, paddingLeft: 7 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12, width: 40, height: 50 }}>
            <AntDesign name="arrowleft" size={30} color="#f7f7f7" />
            <Text></Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.containerPrimary}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w780${backdrop_path}` }}
              style={styles.img}
            />
            <View style={{ paddingLeft: 10, marginBottom: 10 }}>
              <Text style={styles.movieTitle}>{category === 'Movies' ? title : name}</Text>
              <FlatList
                data={genres}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.genreContainer}>
                      <Text style={{ color: '#fff', fontSize: 16 }}>{item.name.toLowerCase()}</Text>
                    </View>)
                }}
                keyExtractor={genre => genre.id.toString()}
                extraData={genres}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              />
            </View>
          </View>

          <Details
            id={route.params.id}
            item={this.state.item}
            category={category}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containerPrimary: {
    backgroundColor: '#000',
    height: 300,
    justifyContent: "flex-end"
  },
  img: {
    width: '100%',
    position: "absolute",
    top: 0,
    left: 0,
    height: '100%'
  },
  movieTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '100'
  },
  movieInformationTitle: {
    fontSize: 18
  },
  movieInformationValue: {
    fontSize: 15,
    color: '#6b6b6b'
  },
  genreContainer: {
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 10,
    padding: 6,
    borderRadius: 50
  },
  container: {
    alignSelf: "stretch",
    height: 300
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
})

export default MoviePage