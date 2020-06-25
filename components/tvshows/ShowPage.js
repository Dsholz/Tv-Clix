import React, { Component } from 'react'
import { View, Text, ScrollView, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Credit from '../Credit'
import Reccomendations from '../Reccomendations'
import { getTvShowCredit, getTvShow, getTvShowReccomendations } from '../Api/api'

class ShowPage extends Component {
  state = {
    show: {},
    showLoader: true
  }

  componentDidMount() {
    const { route } = this.props

    getTvShow(route.params.id)
      .then(data => {
        this.setState(() => ({
          show: data,
          showLoader: false
        }))
      })
  }

  render() {
    const { backdrop_path, overview, name, genres, vote_average,
      number_of_seasons, first_air_date, episode_run_time, status } = this.state.show
    const { showLoader } = this.state

    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.containerPrimary}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w780${backdrop_path}` }}
              style={styles.img}
            />
            <View style={{ paddingLeft: 10, marginBottom: 10 }}>
              <Text style={styles.movieTitle}>{name}</Text>
              <FlatList
                data={genres}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.genreContainer}>
                      <Text style={{ color: '#fff', fontSize: 16 }}>{item.name.toLowerCase()}</Text>
                    </View>)
                }}
                keyExtractor={genre => genre.id}
                extraData={genres}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              />
            </View>
          </View>

          <Text style={{ padding: 10 }}>
            <AntDesign name="star" size={24} color="#D6B51B" />
            <Text style={{ color: '#D6B51B', marginLeft: 10, fontSize: 18 }}>
              {(vote_average && !showLoader) ? `${vote_average} / 10` : 'N / A'}
            </Text>
          </Text>

          <View style={{ flexDirection: "row", marginTop: 10, paddingLeft: 40, paddingRight: 40, justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.movieInformationTitle}>Released Date</Text>
              <Text style={styles.movieInformationValue}>{first_air_date ? first_air_date : 'N / A'}</Text>
              <Text style={styles.movieInformationTitle}>Runtime</Text>
              <Text style={styles.movieInformationValue}>
                {episode_run_time
                  ? `${episode_run_time.sort((a, b) => a - b).join(' / ')} mins`
                  : 'N / A'}
              </Text>
            </View>
            <View>
              <Text style={styles.movieInformationTitle}>Seasons</Text>
              <Text style={styles.movieInformationValue}>{number_of_seasons ? number_of_seasons : 'N / A'}</Text>
              <Text style={styles.movieInformationTitle}>Status</Text>
              <Text style={styles.movieInformationValue}>{status ? status : 'N / A'}</Text>
            </View>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 25 }}>Overview</Text>
            {this.state.showLoader
              ? <ActivityIndicator animating={this.state.showLoader} size={60} color="#66C7D9" />
              : <Text style={{ fontSize: 22, fontWeight: '100', color: '#6b6b6b', fontStyle: 'italic' }}>{overview}</Text>}
          </View>

          <Credit id={this.props.route.params.id} category='Cast' getCredits={getTvShowCredit} />

          <Credit id={this.props.route.params.id} category='Crew' getCredits={getTvShowCredit} />

          <Reccomendations
            id={this.props.route.params.id}
            category='Tv Shows'
            getRecommendations={getTvShowReccomendations}
            navigation={this.props.navigation} />

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

export default ShowPage