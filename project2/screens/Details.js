import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('title')
    }
  }
  title = '';
  state = {
    item: {},
    loading: true
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.title = params ? params['Title'] : null;
    this.props.navigation.setParams({title: this.title})
    this.setUp(params['imdbID']);
  }

  setUp = async(id) => {
    const {searchFactory} = this.props.screenProps;
    try {
      const details = await searchFactory.getDetails(id);
      this.setState({item: details, loading: false});
    } catch(e) {
      console.log(e);
    }
  }

  renderInfo = () => {
    const {item} = this.state;
    return(
      <View>
        <View style={styles.headerContainer}>
          <Image style={styles.image} source={{uri: item['Poster']}}/>
          <View style={styles.textContainer}>
              <Text style={styles.text}>{item['Title']}</Text>
              <View style={styles.horizontal}>
                <Text style={styles.text}>{item['Year']}</Text>
                <Text style={styles.text}>{item['Rated']}</Text>
              </View>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Plot</Text>
          <Text style={styles.itemInfo}>{this.state.item['Plot']}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Runtime</Text>
          <Text style={styles.itemInfo}>{this.state.item['Runtime']}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Actors</Text>
          <Text style={styles.itemInfo}>{this.state.item['Actors']}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Metascore</Text>
          <Text style={styles.itemInfo}>{this.state.item['Metascore']}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>imdbRating</Text>
          <Text style={styles.itemInfo}>{this.state.item['imdbRating']}</Text>
        </View>
      </View>
    );
  }

  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <Image style={styles.loading} source={require('../assets/loading.gif')} />
        ) :
          this.renderInfo()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  loading: {
    height: 50,
    width: 50
  },
  headerContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  text: {
    fontSize: 20
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    height: 100,
    width: 70
  },
  item: {
    marginBottom: 10
  },
  itemTitle: {
    fontSize: 20
  },
  itemInfo: {
    paddingHorizontal: 5
  }
});
