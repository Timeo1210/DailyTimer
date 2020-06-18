import React from 'react';

import Settings from './Settings';

class Footer extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            settingsOpen: false
        }

        this.settingsButtonRef = React.createRef()

        this.handleSettingsClose = this.handleSettingsClose.bind(this)
        this.handleSettingsClick = this.handleSettingsClick.bind(this)

    }

    handleSettingsClose() {
        this.setState({
            settingsOpen: false
        })
    }

    handleSettingsClick() {
        const { settingsOpen } = this.state;
        this.setState({
            settingsOpen: !settingsOpen
        })
    }

    render() {
        const { settingsOpen } =  this.state;
        const { handleTimerSizeChange } = this.props

        return (
            <footer className="footer">
                <div className="footer__settingsWrapper">
                    {settingsOpen && <Settings settingsButtonRef={this.settingsButtonRef} handleSettingsClose={this.handleSettingsClose} handleTimerSizeChange={handleTimerSizeChange}  />}
                    <span ref={this.settingsButtonRef} onClick={this.handleSettingsClick} className="footer__settings">Paramètres</span>
                </div>
                <span className="footer__centeredButton"><a href="#Timer">Centrer sur le timer</a></span>
                <span className="footer__credits">Created by <a href="https://github.com/Timeo1210/">Timeo1210</a></span>
            </footer>
        )
    }

}

export default Footer;