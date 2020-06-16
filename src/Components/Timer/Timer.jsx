import React from 'react';

import styles from './Timer.module.css';

class Timer extends React.Component {

    formatedUnit(unit) {
        return unit < 10 ? `0${unit}` : `${unit}`;
    }

    render() {
        const { time } = this.props;
        const date = new Date(time);

        const formatedHours = this.formatedUnit(date.getHours());
        const formatedMinutes = this.formatedUnit(date.getMinutes());
        const formatedSeconds = this.formatedUnit(date.getSeconds());

        return (
            <div className={styles.Timer__wrapper}>
                <h1 className={styles.Timer__wrapper__timer}>{formatedHours}H{formatedMinutes}:{formatedSeconds}</h1>
            </div>
        )
    }

}

export default Timer;