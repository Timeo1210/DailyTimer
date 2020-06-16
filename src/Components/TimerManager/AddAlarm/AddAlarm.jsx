import React from 'react';

import styles from './AddAlarm.module.css';

class AddAlarm extends React.Component {

    constructor(props) {
        super(props)

        this.hoursRef = React.createRef()
        this.minutesRef = React.createRef()
        this.secondsRef = React.createRef()
        this.titleRef = React.createRef()

        this.handleClick = this.handleClick.bind(this)
    }

    renderOptions(loopNumber) {
        var unitOptions = []
        for (let i = 0; i < loopNumber; i++) {
            const formatedUnit = i < 10 ? `0${i}` : `${i}`;
            unitOptions.push(
                <option key={i} value={i}>{formatedUnit}</option>
            )
        }
        return unitOptions;
    }

    handleClick() {
        const { handleAlarmAdd } = this.props;

        const hoursDOM = this.hoursRef.current
        const minutesDOM = this.minutesRef.current
        const secondsDOM = this.secondsRef.current

        const selectedHour = hoursDOM.value;
        const selectedMinute = minutesDOM.value;
        const selectedSecond = secondsDOM.value;

        const newAlarm = new Date();
        newAlarm.setHours(selectedHour);
        newAlarm.setMinutes(selectedMinute);
        newAlarm.setSeconds(selectedSecond);

        const newUnixAlarm = newAlarm.getTime()

        const alarmTitle = this.titleRef.current.value;
        this.titleRef.current.value = ""

        handleAlarmAdd({
            time: newUnixAlarm,
            text: alarmTitle
        })
    }

    render() {
        const { time } = this.props;
        const date = new Date(time);

        const hoursOptions = this.renderOptions(24);
        const minutesOptions = this.renderOptions(60);
        const secondsOptions = this.renderOptions(60);

        return (
            <div className={styles.AddAlarm__wrapper}>
                <div className={styles.AddAlarm__wrapper__timeSelection}>
                    <select ref={this.hoursRef} defaultValue={date.getHours()} name="Hours">
                        {hoursOptions}
                    </select>
                    <span>H</span>
                    <select ref={this.minutesRef} defaultValue={date.getMinutes()} name="Minutes">
                        {minutesOptions}
                    </select>
                    <span>:</span>
                    <select ref={this.secondsRef} defaultValue={date.getSeconds()} name="Seconds">
                        {secondsOptions}
                    </select>
                </div>
                <div className={`input-group ${styles.AddAlarm__wrapper__titleWrapper}`} >
                    <div className="input-group-prepend">
                        <span className="input-group-text" >Titre:</span>
                    </div>
                    <input ref={this.titleRef} id="alarmTitleInput" type="text" className={`form-control ${styles.AddAlarm__titleWrapper__inputTitle}`} />
                </div>
                <button onClick={this.handleClick} className={`btn btn-primary ${styles.AddAlarm__wrapper__button} `}>Ajouter une Alarme</button>
            </div>
        )
    }

}

export default AddAlarm;