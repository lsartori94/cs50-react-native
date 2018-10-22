import React from 'react';
import {Text, FlatList} from 'react-native';
import PropTypes from 'prop-types';

import MovieListItem from './MovieListItem';

export default class MovieList extends React.Component {
    _keyExtractor = (item, index) => item['imdbID'];

    render() {
        const renderItem = (item) => <MovieListItem item={item} onItemPress={this.props.onItemPress}/>

        if (!this.props.items || this.props.items.length < 1) {
            return(
                <Text>{this.props.emptyMessage}</Text>
            );
        }

        return(
            <FlatList
                style={{flex: 1}}
                data={this.props.items}
                keyExtractor={this._keyExtractor}
                renderItem={renderItem}
            />
        );
    }
}

MovieList.propTypes = {
    items: PropTypes.array,
    onItemPress: PropTypes.func,
    emptyMessage: PropTypes.string.isRequired,
}
