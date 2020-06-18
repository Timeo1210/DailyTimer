import React from 'react';

import AddAlarm from './AddAlarm';
import Alarm from './Alarm';

import styles from './TimerManager.module.css'

class TimerManager extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { alarms } = this.props;
        if (nextProps.alarms === alarms) {
            return false
        }
        return true
    }

    render() {
        const { alarms, time, handleAlarmAdd, handleAlarmDelete } = this.props;

        return (
            <div className={styles.TimerManager__wrapper}>
                <AddAlarm time={time} handleAlarmAdd={handleAlarmAdd} />
                {alarms.length !== 0 && (
                <table className={`table table-hover ${styles.TimerManager__wrapper__table}`} style={{maxWidth: "500px"}}>
                    <thead>
                        <tr style={{textAlign: "center"}}>
                            <th scope="col" style={{width: "30px"}} >#</th>
                            <th scope="col" style={{width: "100px"}} >Time</th>
                            <th scope="col" >Title</th>
                            <th scope="col" style={{width: "80px"}} >Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alarms.map((alarm, index) => {
                            return <Alarm key={index} index={index} alarm={alarm} handleAlarmDelete={handleAlarmDelete} />
                        })}
                    </tbody>
                </table>
                )}
            </div>
        )
    }

}

export default TimerManager;