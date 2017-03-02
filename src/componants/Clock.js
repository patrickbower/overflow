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

        this.countdownLength = 20;
        this.countdownSeconds = this.countdownLength * 60;
        this.linelengthTick = 282.74 / this.countdownSeconds;
        this.runningLength = 0;

        this.countdown = new Timer({
            tick    : 1,
            ontick  : () => this.tick(),
            onstart : () => this.started(),
            onstop  : () => this.stopped(),
            onpause : () => this.paused(),
            onend   : () => this.ended()
        });
    }

    // every 60 seconds
    tick() {
        this.runningLength += this.linelengthTick;
        let newPos = Math.round(this.runningLength * 100) / 100;
        this.setState({ position: newPos });

        console.log(newPos);
    }

    started() {
        this.setState({ isRunning: true });
    }

    paused() {
        this.setState({ isRunning: false });
    }

    ended() {
        alert('Times up bucco!');
    }

    startTimer(){

        if (this.state.isRunning) {
            this.countdown.start();
        } else {
            this.countdown.start(this.countdownSeconds);
        }
    }

    pauseTimer() {
        this.countdown.pause();
    }

    render(){
        let strokeDashoffset = this.state.position;
        let buttonType = this.state.isRunning ?
            <button className="timer-btn" onClick={ this.pauseTimer.bind(this) }><b>||</b></button> :
            <button className="timer-btn" onClick={ this.startTimer.bind(this) }>&#9658;</button> ;

        return(
            <div>

                <div className="timer-wrap d-flex justify-content-center">
                    { buttonType }
                    <svg className="timer" width="150" height="150" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle ref="timeline" id="timeline" r="45" cx="75" cy="75"
                                style={{strokeDashoffset}}>
                        </circle>
                    </svg>
                </div>

            </div>
        )
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
