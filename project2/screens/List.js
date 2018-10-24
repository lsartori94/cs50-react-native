import React from 'react';
import {Image, Dimensions, StyleSheet, View, TextInput } from 'react-native';

import {MovieList} from '../components';

export default class ListScreen extends React.Component {
  state = {
    text: '',
    itemPageNumber: '1',
    showedItems: '0',
    totalResults: '999',
    items: [],
    loading: false,
    listMessage: 'Make a search to see results (you need to submit)'
  }
  _onPress = (item) => this.props.navigation.navigate('Details', {...item})

  _onEnd = async () => {
    const {searchFactory} = this.props.screenProps;
    const {text, items, itemPageNumber, showedItems, totalResults} = this.state;

    const newPageNumber = itemPageNumber + 1;
    if (totalResults <= showedItems) {
      // we don't have more items to show
      return;
    }
    try {
      const response = await searchFactory.search(text, newPageNumber);
      const responseItems = response['Search'];

      this.setState({
        items: [
          ...items,
          ...responseItems
        ],
        itemPageNumber: newPageNumber,
        showedItems: showedItems + responseItems.length
      });
    } catch (e) {
      console.log(e);
    }
  }

  _search = async () => {
    const {searchFactory} = this.props.screenProps;
    const {text} = this.state;
    const itemPageNumber = 1;
    // First time search, we set up some state variables needed for it to work properly
    this.setState({ items: [], loading: true, showedItems: 0, itemPageNumber, totalResults: 9999});
    try {
      const response = await searchFactory.search(text, itemPageNumber);
      const items = response['Search'];
      const totalResults = (response && response.totalResults) ? response.totalResults : 0;
      const showedItems = (items && items.length) ? items.length : 0;

      // Set the message just in case it comes empty
      const listMessage = 'There were no results for that search'

      // we check if we should cancel first scroll update
      if (totalResults <= showedItems) {
        this.setState({shouldUpdateItems: false});
      }
      this.setState({items, listMessage, loading: false, showedItems, totalResults});
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
            onEnd={this._onEnd}
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
