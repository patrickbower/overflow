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

        this.countdown = new Timer({
            tick    : 1,
            ontick  : function(ms) { console.log(ms + ' milliseconds left') },
            onstart : function() { console.log('timer started') },
            onstop  : function() { console.log('timer stop') },
            onpause : function() { console.log('timer set on pause') },
            onend   : function() { console.log('timer ended normally') }
        });

        this.countdownLength = 15 * 60;
    }

    startTimer(){

        // https://github.com/husa/timer.js
        this.countdown.start(this.countdownLength).on('end', function () {
          alert('Pizza is ready, bon appetit!');
        });
    }

    pauseTimer() {
        this.countdown.pause();
    }

    unpauseTimer() {
        this.countdown.start();
    }

    render(){
        return(
            <div>
                <button onClick={ this.startTimer.bind(this) }>startTimer</button>
                <button onClick={ this.pauseTimer.bind(this) }>pauseTimer</button>
                <button onClick={ this.unpauseTimer.bind(this) }>unpauseTimer</button>
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
