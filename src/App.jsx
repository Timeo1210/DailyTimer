import React from 'react';

import Timer from './Components/Timer';
import TimerManager from './Components/TimerManager';
import Popup from './Components/Popup';
import Settings from './Components/Settings';

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            time: Date.now(),
            timerSize: 7,
            interval: null,
            alarms: [],
            playing: false,
            playingText: "",
            settingsOpen: false
        }

        this.audioAlarm = new Audio(`${process.env.PUBLIC_URL}/alarm.mp3`);

        this.settingsButtonRef = React.createRef()

        this.updateTime = this.updateTime.bind(this)
        this.handleAlarmDelete = this.handleAlarmDelete.bind(this)
        this.handleAlarmAdd = this.handleAlarmAdd.bind(this)
        this.handleAlarmStop = this.handleAlarmStop.bind(this)
        this.handleSettingsClick = this.handleSettingsClick.bind(this)
        this.handleSettingsClose = this.handleSettingsClose.bind(this)
        this.handleTimerSizeChange = this.handleTimerSizeChange.bind(this)
    }

    componentDidMount() {
        const localAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
        this.setState({
            alarms: localAlarms,
            interval: setInterval(
                this.updateTime,
                1000
            )
        });
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

    componentDidUpdate(prevProps, prevState) {
        const { alarms, time } = this.state;

        if (prevState.alarms.length !== alarms.length) {
            localStorage.setItem('alarms', JSON.stringify(alarms))
        }

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
        this.setState({
            playing: true,
            playingText: currentAlarm.text
        })
        this.handleAlarmDelete(currentAlarm.time)
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
        const newAlarms = [alarm].concat(alarms)
        this.setState({
            alarms: newAlarms
        })
    }

    handleAlarmStop() {
        this.audioAlarm.pause();
        this.audioAlarm.currentTime = 0;
        this.setState({
            playing: false
        })
    }

    handleSettingsClick() {
        const { settingsOpen } = this.state;
        this.setState({
            settingsOpen: !settingsOpen
        })
    }

    handleSettingsClose() {
        this.setState({
            settingsOpen: false
        })
    }

    handleTimerSizeChange(addSize) {
        const { timerSize } = this.state;

        this.setState({
            timerSize: timerSize + addSize
        })
    }

    render() {
        const { time, timerSize, alarms, playing, playingText, settingsOpen } = this.state;

        const sortedAlarms = alarms.sort((a, b) => {
            console.log(a)
            const toReturn = a.time < b.time
            return toReturn ? -1 : 1;
        })

        return (
            <>
                <Timer time={time} timerSize={timerSize} />
                <TimerManager time={time} alarms={sortedAlarms} handleAlarmAdd={this.handleAlarmAdd} handleAlarmDelete={this.handleAlarmDelete} />
                {playing && <Popup playingText={playingText} handleAlarmStop={this.handleAlarmStop} />}
                <footer className="footer">
                    <div className="footer__settingsWrapper">
                        {settingsOpen && <Settings settingsButtonRef={this.settingsButtonRef} handleSettingsClose={this.handleSettingsClose} handleTimerSizeChange={this.handleTimerSizeChange}  />}
                        <span ref={this.settingsButtonRef} onClick={this.handleSettingsClick} className="footer__settings">Paramètres</span>
                    </div>
                    <span className="footer__centeredButton"><a href="#Timer">Centrer sur le timer</a></span>
                    <span className="footer__credits">Created by <a href="https://github.com/Timeo1210/">Timeo1210</a></span>
                </footer>
            </>
        )
    }

}

export default App;