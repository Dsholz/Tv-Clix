import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput } from 'react-native'
import CategoryItem from '../CategoryItem'
import { FontAwesome5 } from '@expo/vector-icons'


class SearchMovies extends Component {
  state = {
    searchResult: [],
    query: '',
    adultContent: false,
    showLoader: false,
    totalResults: 0
  }

  handleChange = (text) => {
    this.setState(() => ({
      query: text,
      showLoader: true
    }))

    this.searchMovies(text)
  }

  searchMovies = (text) => {
    const { adultContent } = this.state

    this.props.searchCategoryApi(text, adultContent)
      .then(data => {
        this.setState(() => ({
          searchResult: data.results,
          totalResults: data.total_results ? data.total_results : 0,
          showLoader: false
        }))
      })
  }

  render() {
    const { query, showLoader, totalResults, searchResult } = this.state
    const { category, navigation } = this.props

    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <TextInput
          style={styles.textInput}
          value={query}
          onChangeText={this.handleChange}
          placeholder='Search Movies'
        />

        {totalResults === 0 && query === ''
          ? <View style={styles.centeredBox}>
            <FontAwesome5 name="tape" size={100} color="#332E30" />
            <Text style={{ fontSize: 30 }}>Type in Something...</Text>
          </View> : null}

        {(query !== '' && showLoader === false && totalResults !== 0) &&
          <FlatList
            data={searchResult}
            renderItem={({ item }) => <CategoryItem
              itemData={item}
              category={category}
              navigation={navigation}
            />}
            extraData={searchResult}
            numColumns={2}
          />}

        {query && showLoader
          ? <View style={styles.centeredBox}>
            <ActivityIndicator animating={showLoader} size={60} color="#66C7D9" />
          </View> : null}

        {totalResults === 0 && query !== '' && showLoader === false
          ? <View style={styles.centeredBox}>
            <Text>No Matches Found</Text>
          </View> : null}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginLeft: 8,
    alignSelf: 'stretch',
    marginBottom: 5,
    borderRadius: 10,
    paddingLeft: 8,
    marginRight: 8,
    borderColor: 'gray',
    borderWidth: 1
  },
  centeredBox: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default SearchMovies