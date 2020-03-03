import React, { Component } from 'react';
import Aux from '../containers/Aux';
import Toolbar from '../components/navigation/Toolbar';


class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerHandler} />
            </Aux>
        )
    }
}


export default Layout;