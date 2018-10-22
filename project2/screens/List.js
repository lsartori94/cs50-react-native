import React from 'react';
import {Image, Dimensions, StyleSheet, View, TextInput } from 'react-native';

import {MovieList} from '../components';
import {search} from '../utils/MovieFetch';

const demoList = [
      {
        "Title": "Blade Runner",
        "Year": "1982",
        "imdbID": "tt0083658",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
      },
      {
        "Title": "Blade Runner 2049",
        "Year": "2017",
        "imdbID": "tt1856101",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg"
      },
      {
        "Title": "Blade",
        "Year": "1998",
        "imdbID": "tt0120611",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ4MzkzNjcxNV5BMl5BanBnXkFtZTcwNzk4NTU0Mg@@._V1_SX300.jpg"
      },
      {
        "Title": "Blade II",
        "Year": "2002",
        "imdbID": "tt0187738",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOWVjZTIzNDYtNTBlNC00NTJjLTkzOTEtOTE0MjlhYzI2YTcyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
      },
      {
        "Title": "Blade: Trinity",
        "Year": "2004",
        "imdbID": "tt0359013",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjE0Nzg2MzI3MF5BMl5BanBnXkFtZTYwMjExODQ3._V1_SX300.jpg"
      },
      {
        "Title": "Sling Blade",
        "Year": "1996",
        "imdbID": "tt0117666",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNGY5NWIxMjAtODBjNC00MmZhLTk1ZTAtNGRhYThlOTNjMTQwXkEyXkFqcGdeQXVyNTc1NTQxODI@._V1_SX300.jpg"
      },
      {
        "Title": "Dragon Blade",
        "Year": "2015",
        "imdbID": "tt3672840",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTk0MjgxOTQ5MF5BMl5BanBnXkFtZTgwODA3NTUwNjE@._V1_SX300.jpg"
      },
      {
        "Title": "Shinobi: Heart Under Blade",
        "Year": "2005",
        "imdbID": "tt0475723",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMjE1NTEyMF5BMl5BanBnXkFtZTcwMDgxODkzMQ@@._V1_SX300.jpg"
      },
      {
        "Title": "Blade of the Immortal",
        "Year": "2017",
        "imdbID": "tt5084170",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYzIwYmJlMjktMzJiMy00YmQzLThmNWYtNWY3NGViZjc4MzYwXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_SX300.jpg"
      },
      {
        "Title": "Blade Runner: Black Out 2022",
        "Year": "2017",
        "imdbID": "tt7428594",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZGNiNmNiMTctMDI4OS00OWYxLWE4ZWEtZjFkZjU4ZmY5YzEyXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX300.jpg"
      }
];

export default class ListScreen extends React.Component {
  state = {
    text: '',
    items: [],
    loading: false,
    listMessage: 'Make a search to see results'
  }
  _onPress = (item) => this.props.navigation.navigate('Details', {...item})

  _search = async() => {
    this.setState({loading: true});
    try {
      const {text} = this.state;
      const items = await search(text);
      // Set the message just in case it comes empty
      const listMessage = 'There were no results for that search'
      this.setState({items, listMessage, loading: false});
    } catch(e) {
      console.log(e);
      this.setState({listMessage: 'There was an error'});
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
