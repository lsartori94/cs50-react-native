import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';

export default class SettingScreen extends React.Component {
  state = {
    selectedValue: this.props.screenProps.type
  }

  _handleSelection = (itemValue) => {
    const {searchFactory} = this.props.screenProps;

    this.setState({selectedValue: itemValue});
    searchFactory.type = itemValue;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Select the type of entity to search</Text>
        <Picker
          selectedValue={this.state.selectedValue}
          style={styles.picker}
          onValueChange={this._handleSelection}>
          <Picker.Item label="Movies" value="movie" />
          <Picker.Item label="Series" value="series" />
          <Picker.Item label="Episodes" value="episode" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 200,
  }
});
