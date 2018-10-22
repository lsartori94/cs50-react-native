import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    controls: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    bold: {
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        paddingHorizontal: 5,
        minWidth: 50,
    },
});

export default class Input extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.number,
        title: PropTypes.string,
    }

    state = {
        mins: Math.floor(this.props.value / 60),
        secs: this.props.value % 60,
    }

    handleMinChange = minString => {
        const mins = +minString;
        this.setState({mins});
        this.props.onChange(mins * 60 + this.state.secs);
    }

    handleSecsChange = secString => {
        const secs = +secString;
        this.setState({secs});
        this.props.onChange(this.state.mins * 60 + secs);
    }

    render() {
        return(
            <View style={styles.container}>
                {this.props.title && <Text style={styles.bold}>{this.props.title}</Text>}
                <View style={styles.controls}>
                    <Text>Minutes: </Text>
                    <TextInput
                        defaultValue={`${this.state.mins}`}
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={this.handleMinChange}
                    />
                    <Text>Seconds: </Text>
                    <TextInput
                        defaultValue={`${this.state.secs}`}
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={this.handleSecsChange}
                    />
                </View>
            </View>
        )
    }
}