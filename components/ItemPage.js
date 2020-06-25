import React, { Component } from 'react'
import { View, Text, Image, FlatList, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Reccomendations from './Reccomendations'
import Credit from './Credit'
import { getMovie, getMovieCredits, getMovieReccomendations } from './Api/api'

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
    const { showLoader } = this.state
    const { route, navigation, category } = this.props
    const { backdrop_path, genres, overview, vote_average } = this.state.item
    const title = category === 'Movies' ? this.state.item.title : this.state.item.name
    const release_date = category === 'Movies' ? this.state.item.release_date : this.state.item.first_air_date
    const runtime = category === 'Movies' ? this.state.item.runtime : this.state.item.episode_run_time
    const budget = category === 'Movies' ? this.state.item.budget : this.state.item.number_of_seasons
    const revenue = category === 'Movies' ? this.state.item.revenue : this.state.item.status

    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.containerPrimary}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w780${backdrop_path}` }}
              style={styles.img}
            />
            <View style={{ paddingLeft: 10, marginBottom: 10 }}>
              <Text style={styles.movieTitle}>{title}</Text>
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

          <Text style={{ padding: 10 }}>
            <AntDesign name="star" size={24} color="#D6B51B" />
            <Text style={{ color: '#D6B51B', marginLeft: 10, fontSize: 18 }}>
              {vote_average && !showLoader ? `${vote_average} / 10` : 'N / A'}
            </Text>
          </Text>

          <View style={{ flexDirection: "row", marginTop: 10, paddingLeft: 40, paddingRight: 40, justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.movieInformationTitle}>Released Date</Text>
              <Text style={styles.movieInformationValue}>{release_date ? release_date : 'N / A'}</Text>
              <Text style={styles.movieInformationTitle}>Runtime</Text>
              <Text style={styles.movieInformationValue}>{runtime} mins</Text>
            </View>
            <View>
              <Text style={styles.movieInformationTitle}>Budget</Text>
              {category === 'Movies'
                ? <Text style={styles.movieInformationValue}>
                  {(budget !== 0 && !showLoader) ? `$${budget}` : 'N / A'}
                </Text>
                : <Text style={styles.movieInformationValue}>
                  {budget ? budget : 'N / A'}
                </Text>}
              <Text style={styles.movieInformationTitle}>Revenue</Text>
              {category === 'Movies'
                ? <Text style={styles.movieInformationValue}>
                  {(revenue !== 0 && !showLoader) ? `$${revenue}` : 'N / A'}
                </Text>
                : <Text style={styles.movieInformationValue}>
                  {revenue ? revenue : 'N / A'}
                </Text>}
            </View>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 25 }}>Overview</Text>
            {showLoader
              ? <ActivityIndicator animating={showLoader} size={60} color="#66C7D9" />
              : <Text style={{ fontSize: 22, fontWeight: '100', color: '#6b6b6b', fontStyle: 'italic' }}>{overview}</Text>}
          </View>

          <Credit id={route.params.id} category='Cast' getCredits={getMovieCredits} />

          <Credit id={route.params.id} category='Crew' getCredits={getMovieCredits} />

          <Reccomendations
            id={route.params.id}
            category='Movies'
            getRecommendations={getMovieReccomendations}
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
  }
})

export default MoviePage