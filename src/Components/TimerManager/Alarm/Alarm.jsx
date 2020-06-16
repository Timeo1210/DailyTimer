import React from 'react'

import styles from './Alarm.module.css';

class Alarm extends React.Component {

    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    formatedUnit(unit) {
        return unit < 10 ? `0${unit}` : `${unit}`;
    }

    handleClick() {
        const { time } = this.props;
        this.props.handleAlarmDelete(time)
    }

    render() {
        const { time } = this.props;
        const date = new Date(time);

        const formatedHours = this.formatedUnit(date.getHours());
        const formatedMinutes = this.formatedUnit(date.getMinutes());
        const formatedSeconds = this.formatedUnit(date.getSeconds());

        return (
            <div className={styles.Alarm__wrapper}>
                <span>{formatedHours}H{formatedMinutes}:{formatedSeconds}</span>
                <button onClick={this.handleClick} className={`btn btn-danger ${styles.Alarm__wrapper__button}`} >Delete</button>
            </div>
        )
    }

}

export default Alarm;