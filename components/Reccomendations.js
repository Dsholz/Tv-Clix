import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import CategoryItem from './CategoryItem'

class Reccomendations extends Component {
  state = {
    reccomended: []
  }

  componentDidMount() {
    const { id } = this.props

    this.props.getRecommendations(id)
      .then(data => {
        this.setState(() => ({
          reccomended: data.results
        }))
      })
  }

  render() {
    const { reccomended } = this.state

    return (
      <View>

        {reccomended.length > 0
          ? <Text style={{ fontSize: 30, marginLeft: 8 }}> Recommended
          </Text> : null}
        <FlatList
          data={reccomended}
          renderItem={({ item }) => <CategoryItem
            itemData={item}
            category={this.props.category}
            navigation={this.props.navigation}
          />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}ppclx`}
        />
      </View>
    )
  }
}

export default Reccomendations