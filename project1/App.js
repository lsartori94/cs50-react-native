import React from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import {vibrate, Timer} from './utils';

import {Input, TimerButton, TimerCountdown} from './components';

const DEFAULT_WORK_MINS = 25
const DEFAULT_BREAK_MINS = 5

const minToSec = mins => mins * 60
const nextTimer = {work: 'break', break: 'work'}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150,
        backgroundColor: '#fff',
        alignItems: 'stretch',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    buttonGroup: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
    },
    center: {
        alignSelf: 'center',
    },
});

export default class App extends React.Component {
    state = {
        // in seconds
        workTime: minToSec(DEFAULT_WORK_MINS),
        breakTime: minToSec(DEFAULT_BREAK_MINS),
        // in ms
        timeRemaining: minToSec(DEFAULT_WORK_MINS) * 1000,
        isRunning: false,
        activeTimer: 'work',
    }

    componentDidMount() {
        this.timer = new Timer(this.state.timeRemaining, this.updateTimeRemaining, this.handleTimerEnd);
        this.setState({isRunning: this.timer.isRunning});
    }

    componentWillUnmount() {
        if (this.timer) {
            this.timer.stop();
        }
    }

    updateTimeRemaining = timeRemaining => {
        this.setState({timeRemaining});
    }

    handleTimerEnd = () => {
        vibrate();
        this.setState(prevState => ({activeTimer: nextTimer[prevState.activeTimer]}), this.resetTimer);
    }

    toggleTimer = () => {
        if (!this.timer) {
            return;
        }
        if (this.timer.isRunning) {
            this.timer.stop();
        } else {
            this.timer.start();
        }

        this.setState({isRunning: this.timer.isRunning});
    }

    updateTime = target => (time, shouldStartTimer) => {
        if (this.state.activeTimer === target) {
            if (this.timer) {
                this.timer.stop();
            }

            const timeRemaining = +time * 1000;
            this.timer = new Timer(timeRemaining, this.updateTimeRemaining, this.handleTimerEnd);

            if (!shouldStartTimer) {
                this.timer.stop();
            }

            this.setState({[`${target}Time`]: time, timeRemaining, isRunning: this.timer.isRunning});
        } else {
            this.setState({[`${target}Time`]: time, isRunning: this.timer.isRunning});
        }
    }

    // hack: if an event is passed (ie is button press), stop timer
    resetTimer = shouldStopTimer => {
        const {activeTimer} = this.state;
        this.updateTime(activeTimer)(this.state[`${activeTimer}Time`], !shouldStopTimer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, styles.center]}>{this.state.activeTimer.toUpperCase()}</Text>
                <TimerCountdown style={styles.center} timeRemaining={this.state.timeRemaining} onToggleTimer={this.toggleTimer}/>
                <Input
                    title="Work:"
                    onChange={this.updateTime('work')}
                    value={this.state.workTime}
                />
                <Input
                    title="Break:"
                    onChange={this.updateTime('break')}
                    value={this.state.breakTime}
                />
                <View style={styles.buttonGroup}>
                    <TimerButton
                        onPress={this.toggleTimer}
                        label={this.state.isRunning ? 'Pause' : 'Start'}
                    />
                    <TimerButton label="Reset" onPress={this.resetTimer} />
                </View>
            </View>
        );
    }
}
