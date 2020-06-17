import React from 'react';

import styles from './Popup.module.css';

class Popup extends React.Component {   

    render() {

        return (
            <div className={styles.Popup__overlay}>
                <div className={styles.Popup__wrapper}>
                    <div className={styles.Popup__contentWrapper}>
                        <p className={styles.Popup__title} >{this.props.playingText}</p>
                        <button onClick={this.props.handleAlarmStop} className={`btn btn-success ${styles.Popup__wrapper__button}`}>Stop</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Popup;