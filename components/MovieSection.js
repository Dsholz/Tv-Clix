import React, { Component } from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import CategoryItem from './CategoryItem'

class MovieSection extends Component {
  state = {
    categoryData: [],
    showLoader: true
  }

  componentDidMount() {
    this.props.getData()
      .then(data => {
        this.setState(() => ({
          categoryData: data.results,
          showLoader: false
        }))
      })
  }

  render() {
    const { category, navigation } = this.props
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.state.showLoader
          ? <ActivityIndicator animating={this.state.showLoader} size={60} color="#66C7D9" />
          : <FlatList
            data={this.state.categoryData}
            renderItem={({ item }) =>
              <CategoryItem
                category={category}
                itemData={item}
                navigation={navigation}
              />
            }
            keyExtractor={item => item.id}
            extraData={this.state.categoryData}
            numColumns={2}
          />}
      </View>
    )
  }
}

export default MovieSection