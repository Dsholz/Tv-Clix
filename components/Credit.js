import React, { Component } from 'react'
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native'

class Credit extends Component {
  state = {
    creditData: [],
    showLoader: true
  }

  componentDidMount() {
    const { id, category } = this.props

    this.props.getCredits(id)
      .then(data => {
        const result = category === 'Cast' ? data.cast : data.crew

        this.setState(() => ({
          creditData: result ? result : [],
          showLoader: false
        }))
      })
  }

  render() {
    const { showLoader, creditData } = this.state
    const { category } = this.props

    return (
      <View style={styles.container}>
        {creditData.length > 0 ? <Text style={styles.text}>{`${category} ( ${creditData.length} )`}</Text> : null}
        {showLoader
          ? <ActivityIndicator animating={showLoader} size={60} color="#66C7D9" />
          : <FlatList
            data={creditData}
            renderItem={({ item }) =>
              <View style={{ margin: 20 }}>
                {item.profile_path
                  ? <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w185${item.profile_path}` }}
                    style={styles.img}
                  /> : <Image
                    source={require('./no-image.png')}
                    style={styles.img}
                  />}
                <Text style={{ fontSize: 15 }}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: '#6b6b6b' }}>
                  {category === 'Cast' ? item.character : item.job}
                </Text>
              </View>
            }
            keyExtractor={item => item.credit_id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            extraData={creditData}
          />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    borderRadius: 50,
    height: 100,
    width: 100
  },
  text: {
    marginLeft: 8,
    fontSize: 25,
    alignSelf: 'flex-start'
  }
})

export default Credit