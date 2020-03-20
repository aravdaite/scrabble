import React from 'react';
import { Logo, NavigationItem } from '../../components';

export const Toolbar = () => (
    <header className="header">
        <div className="logo-welcome">
            <Logo />
            <div className="ToolbarText">Welcome to scrabble trainer!</div>
        </div>
        <nav className="navigation">
            <ul className="navigation-list">
                <li><NavigationItem href="/">{"Game"}</NavigationItem></li>
                <li><NavigationItem href="/about">{"About"}</NavigationItem></li>
            </ul>
        </nav>
    </header>
);