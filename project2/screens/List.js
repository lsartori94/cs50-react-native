import React from 'react';
import {Image, Dimensions, StyleSheet, View, TextInput } from 'react-native';

import {MovieList} from '../components';

export default class ListScreen extends React.Component {
  state = {
    text: '',
    items: [],
    loading: false,
    listMessage: 'Make a search to see results (you need to submit)'
  }
  _onPress = (item) => this.props.navigation.navigate('Details', {...item})

  _search = async() => {
    const {searchFactory} = this.props.screenProps;

    this.setState({loading: true});
    try {
      const {text} = this.state;
      const items = await searchFactory.search(text);
      // Set the message just in case it comes empty
      const listMessage = 'There were no results for that search'
      this.setState({items, listMessage, loading: false});
    } catch(e) {
      console.log(e);
      this.setState({listMessage: 'There was an error', loading: false});
    }
  }

  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search a Movie"
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this._search}
          value={this.state.text}
          />

        {loading ? (
          <Image style={styles.loading} source={require('../assets/loading.gif')} />
        ) :
          <MovieList
            style={styles.full}
            items={this.state.items}
            emptyMessage={this.state.listMessage}
            onItemPress={this._onPress}/>
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
  full: {
    flex: 1
  },
  loading: {
    height: 50,
    width: 50
  },
  input: {
    borderRadius: 5,
    width: Dimensions.get('window').width,
    height: 50,
    paddingHorizontal: 10
  }
});
