import React from 'react';

import Timer from './Components/Timer';
import TimerManager from './Components/TimerManager';
import Popup from './Components/Popup';

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            time: Date.now(),
            interval: null,
            alarms: [],
            playingAlarm: false
        }

        this.audioAlarm = new Audio(`${process.env.PUBLIC_URL}/alarm.mp3`);

        this.updateTime = this.updateTime.bind(this)
        this.handleAlarmDelete = this.handleAlarmDelete.bind(this)
        this.handleAlarmAdd = this.handleAlarmAdd.bind(this)
        this.handleAlarmStop = this.handleAlarmStop.bind(this)
    }

    componentDidMount() {
        this.setState({
            interval: setInterval(
                this.updateTime,
                1000
            )
        })
    }

    componentWillUnmount() {
        const { interval } = this.state;

        clearInterval(interval)
    }

    updateTime() {
        this.setState({
            time: Date.now()
        })
    }

    componentDidUpdate() {
        const { alarms, time } = this.state;

        const truncedTime = Math.trunc(time / 1000)
        for (const index in alarms) {
            const truncedAlarm = Math.trunc(alarms[index].time / 1000)
            if (truncedAlarm === truncedTime) {
                this.playAlarm(alarms[index])
            } 
        }
    }

    playAlarm(currentAlarm) {
        this.audioAlarm.play()
        this.handleAlarmDelete(currentAlarm.time)
        this.setState({
            playing: true
        })
    }

    handleAlarmDelete(alarmTime) {
        const { alarms } = this.state;
        const newAlarm = alarms.filter(alarm => alarm.time !== alarmTime)

        this.setState({
            alarms: newAlarm
        })
    }

    handleAlarmAdd(alarm) {
        const { alarms } = this.state;
        alarms.push(alarm)
        this.setState({
            alarms: alarms
        })
    }

    handleAlarmStop() {
        this.audioAlarm.pause();
        this.audioAlarm.currentTime = 0;
        this.setState({
            playing: false
        })
    }

    render() {
        const { time, alarms, playing } = this.state;

        return (
            <>
                <Timer time={time} />
                <TimerManager time={time} alarms={alarms} handleAlarmAdd={this.handleAlarmAdd} handleAlarmDelete={this.handleAlarmDelete} />
                {playing && <Popup handleAlarmStop={this.handleAlarmStop} />}
            </>
        )
    }

}

export default App;