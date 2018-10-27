import React, { Component } from 'react'
import Charts from './charts';
import Registration from './registration'

class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="home-box">
                <Registration />
                {/* <Charts /> */}
            </div>
        )

    }
}

export default Home;
