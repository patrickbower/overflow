import React, { Component } from 'react';

import './styles/reset.css';
import './styles/bootstrap.css';
import './styles/app.css';

class App extends Component {

    constructor(props){
        super(props);

        this.getList.call(this);
    }

    getList() {
        console.log('get list');
    }

    render() {
        return (
            <div className="app-container container-fluid">
                <p>Run fat boy, run</p>
            </div>
        );
    }
}

export default App;
