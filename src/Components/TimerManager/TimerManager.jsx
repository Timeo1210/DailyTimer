import React from 'react';

import AddAlarm from './AddAlarm';
import Alarm from './Alarm';

import styles from './TimerManager.module.css'

class TimerManager extends React.Component {

    render() {
        const { alarms, time, handleAlarmAdd, handleAlarmDelete } = this.props;

        return (
            <div className={styles.TimerManager__wrapper}>
                <AddAlarm time={time} handleAlarmAdd={handleAlarmAdd} />
                {alarms.map((alarm, index) => {
                    return <Alarm key={index} alarm={alarm} handleAlarmDelete={handleAlarmDelete} />
                })}
            </div>
        )
    }

}

export default TimerManager;