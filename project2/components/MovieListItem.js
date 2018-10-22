import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import PropTypes from 'prop-types';


export default class MovieListItem extends React.Component {
    render() {
        const {item} = this.props.item

        return(
            <TouchableOpacity onPress={()=> this.props.onItemPress(item)}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{uri: item['Poster']}}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{item['Title']}</Text>
                        <Text style={styles.text}>{item['Year']}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

MovieListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onItemPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    text: {
        fontSize: 20
    },
    image: {
        height: 100,
        width: 70
    },
});