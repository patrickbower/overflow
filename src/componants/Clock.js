// react
import React, { Component } from 'react';
import Timer from 'timer.js';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as settingsActions from '../actions/settings';



class Clock extends Component {

    constructor(props){
        super(props);

        this.state = ({
            position: 0,
            isRunning: false
        })

        this.settings = {
            time: 20,
            svglinelength: 282.74
        }
        const { time, svglinelength } = this.settings;

        this.countTime = time * 60;
        this.linelengthTick = svglinelength / this.countTime;
        this.runningLength = 0;

        this.countdown = new Timer({
            tick    : 1,
            ontick  : () => this.tick(),
            onstart : () => this.started(),
            onpause : () => this.paused(),
            onend   : () => this.ended()
        });
    }

    tick() {
        let newPos = this.runningLength += this.linelengthTick;
        this.setState({ position: newPos });
    }

    started() {
        this.setState({ isRunning: true });
    }

    paused() {
        this.setState({ isRunning: false });
    }

    ended() {
        this.setState({
            position: 0,
            isRunning: false
        });
        alert('Times up bucco!');
    }

    startTimer(){
        if (this.state.isRunning) {
            this.countdown.start();
        } else {
            this.countdown.start(this.countTime);
        }
    }

    pauseTimer() {
        this.countdown.pause();
    }

    render(){
        let strokeDashoffset = this.state.position;
        let buttonType = this.state.isRunning ?
            <button className="app__timer-btn" onClick={ this.pauseTimer.bind(this) }><b>||</b></button> :
            <button className="app__timer-btn" onClick={ this.startTimer.bind(this) }>&#9658;</button> ;

        if (this.props.settings.clockVisible) {
            return (
                <div>
                    <div className="app__timer-wrap d-flex justify-content-center">
                        { buttonType }
                        <svg className="app__timer" width="150" height="150" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <circle ref="timeline" id="timeline" r="45" cx="75" cy="75"
                                    style={{strokeDashoffset}}>
                            </circle>
                        </svg>
                    </div>
                </div>
            )
        } else {
            return false;
        }
    }
}

function mapStateToProps(state, props) {
    return {
        settings: state.settings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(settingsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
