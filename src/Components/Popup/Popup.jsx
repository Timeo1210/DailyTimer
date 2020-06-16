import React from 'react';

import styles from './Popup.module.css';

class Popup extends React.Component {   

    render() {

        return (
            <div className={styles.Popup__overlay}>
                <div className={styles.Popup__wrapper}>
                    <p style={{textAlign: "center"}}>{this.props.playingText}</p>
                    <button onClick={this.props.handleAlarmStop} className={`btn btn-success ${styles.Popup__wrapper__button}`}>Stop</button>
                </div>
            </div>
        )
    }

}

export default Popup;