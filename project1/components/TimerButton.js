import React from 'react';
import {Button} from 'react-native';
import PropTypes from 'prop-types';

const TimerButton = props => {
  return <Button title={props.label} onPress={props.onPress} />
}

TimerButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default TimerButton
