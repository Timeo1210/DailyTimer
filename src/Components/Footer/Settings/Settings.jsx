import React from 'react'

import styles from './Settings.module.css';

class Settings extends React.Component {

    constructor(props) {
        super(props)

        this.wrapperRef = React.createRef();

        this.handleMouseClick = this.handleMouseClick.bind(this)
        this.handleTimerAddSize = this.handleTimerAddSize.bind(this)
        this.handleTimerMinusSize = this.handleTimerMinusSize.bind(this)
        this.handleCloseButton = this.handleCloseButton.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleMouseClick)
    }

    handleMouseClick(event) {
        if (!this.wrapperRef.current.contains(event.target) && !this.props.settingsButtonRef.current.contains(event.target)) {
            this.props.handleSettingsClose()
        }
    }

    handleCloseButton() {
        this.props.handleSettingsClose()
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseClick)
    }

    handleTimerAddSize() {
        this.props.handleTimerSizeChange(0.5)
    }
    handleTimerMinusSize() {
        this.props.handleTimerSizeChange(-0.5)
    }

    render() {

        return (
            <div ref={this.wrapperRef} className={styles.Settings__dropdown}>
                <div className={styles.Settings__dropdown__closeButton}>
                    <button onClick={this.handleCloseButton} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className={styles.Settings__dropdown__titleSize}>
                    <button className="btn btn-primary" onClick={this.handleTimerMinusSize} >-</button>
                    <span>Taille du timer</span>
                    <button className="btn btn-primary" onClick={this.handleTimerAddSize} >+</button>
                </div>
            </div>
        )
    }

}

export default Settings;