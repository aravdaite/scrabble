import React from 'react';
import '../LetterCard.css';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
//import NavigationItems from '../NavigationItems/NavigationItems';
//import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <header className="header" >
        <div className="logo-welcome">
            <Logo />
            <div className="ToolbarText">Welcome to scrabble trainer!</div>
        </div>
        <nav className="navigation">
            <NavigationItem word={"Game"} link={"/"} />
            <NavigationItem word={"About"} link={"/"} />
        </nav>
    </header >
);

export default Toolbar;