import React, { Component, Fragment } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, TouchableOpacity
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { WebView } from 'react-native-webview'
import { getTvShowReccomendations, getTvShowCredit, getMovieCredits, getMovieReccomendations } from '../Api/api'
import Reccomendations from './Reccomendations'
import Credit from './Credit'

class Details extends Component {
  state = {
    showLoader: false,
    showTrailer: false
  }

  viewTrailer = () => {
    this.setState(prevState => ({
      showTrailer: !prevState.showTrailer
    }))
  }

  render() {
    const { category, navigation, id } = this.props
    const { showLoader, showTrailer } = this.state
    const { overview, release_date, first_air_date, runtime, vote_average,
      revenue, status, episode_run_time, budget, number_of_seasons, videos } = this.props.item
    const releaseDateEdited = category === 'Movies' ? release_date : first_air_date
    const runtimeEdited = category === 'Movies' ? runtime : episode_run_time
    const budgetEdited = category === 'Movies' ? budget : number_of_seasons
    const revenueEdited = category === 'Movies' ? revenue : status
    const trailerId = (videos && videos.results.length > 0) ? videos.results[0].key : ''

    return (
      <Fragment>
        <Text style={{ padding: 10 }}>
          <AntDesign name="star" size={24} color="#D6B51B" />
          <Text style={{ color: '#D6B51B', marginLeft: 10, fontSize: 18 }}>
            {vote_average && !showLoader ? `${vote_average} / 10` : 'N / A'}
          </Text>
        </Text>

        <View style={{ flexDirection: "row", marginTop: 10, paddingLeft: 40, paddingRight: 40, justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.movieInformationTitle}>Released Date</Text>
            <Text style={styles.movieInformationValue}>{releaseDateEdited ? releaseDateEdited : 'N / A'}</Text>
            <Text style={styles.movieInformationTitle}>Runtime</Text>
            <Text style={styles.movieInformationValue}>{runtimeEdited} mins</Text>
          </View>
          <View>
            <Text style={styles.movieInformationTitle}>{category === 'Movies' ? 'Budget' : 'Seasons'}</Text>
            {category === 'Movies'
              ? <Text style={styles.movieInformationValue}>
                {(budgetEdited !== 0 && !showLoader) ? `$${budgetEdited}` : 'N / A'}
              </Text>
              : <Text style={styles.movieInformationValue}>
                {budgetEdited ? budgetEdited : 'N / A'}
              </Text>}
            <Text style={styles.movieInformationTitle}>{category === 'Movies' ? 'Revenue' : 'Status'}</Text>
            {category === 'Movies'
              ? <Text style={styles.movieInformationValue}>
                {(revenueEdited !== 0 && !showLoader) ? `$${revenueEdited}` : 'N / A'}
              </Text>
              : <Text style={styles.movieInformationValue}>
                {revenueEdited ? revenueEdited : 'N / A'}
              </Text>}
          </View>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "center", paddingHorizontal: 30, paddingVertical: 10, borderWidth: 1, flexDirection: "row",
            borderRadius: 5, marginVertical: 10
          }}
          onPress={this.viewTrailer}>
          <Text style={{ marginRight: 5 }}>{showTrailer ? 'Hide' : 'Watch'} Trailer</Text>
          <AntDesign name={showTrailer ? 'minus' : 'plus'} size={20} color="black" />
        </TouchableOpacity>

        {showTrailer && trailerId !== '' && <WebView
          style={{ height: 300, padding: 0, margin: 0, alignSelf: "stretch" }}
          source={{
            html: `<iframe width="100%" height="100%" 
            src="https://www.youtube.com/embed/${trailerId}?cc_lang_pref=en"
             allow="autoplay; encrypted-media" frameborder="0" allowfullscreen></iframe>`
          }}
        />}

        {(trailerId === '' && showTrailer) && <Text style={{ alignSelf: "center", marginVertical: 10 }}>No Trailer Available</Text>}

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 25 }}>Overview</Text>
          {showLoader
            ? <ActivityIndicator animating={showLoader} size={60} color="#66C7D9" />
            : <Text style={{ fontSize: 22, fontWeight: '100', color: '#6b6b6b', fontStyle: 'italic' }}>{overview}</Text>}
        </View>

        <Credit
          id={id}
          category='Cast'
          getCredits={category === 'Movies'
            ? getMovieCredits
            : getTvShowCredit
          } />

        <Credit
          id={id}
          category='Crew'
          getCredits={category === 'Movies'
            ? getMovieCredits
            : getTvShowCredit
          } />

        <Reccomendations
          id={id}
          navigation={navigation}
          category={category}
          getRecommendations={category === 'Movies'
            ? getMovieReccomendations
            : getTvShowReccomendations
          } />
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  movieInformationTitle: {
    fontSize: 18
  },
  movieInformationValue: {
    fontSize: 15,
    color: '#6b6b6b'
  },
})

export default Details