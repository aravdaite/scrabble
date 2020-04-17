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
                <li><NavigationItem href="/" css_classActive="NavigationItem-active" css_class="NavigationItem">{"Game"} </NavigationItem></li>
                <li><NavigationItem href="/about" css_classActive="NavigationItem-active" css_class="NavigationItem">{"About"}</NavigationItem></li>
                <li><NavigationItem href="/register" css_classActive="NavigationItem-active" css_class="NavigationItem">{"Register"}</NavigationItem></li>
                <li><NavigationItem href="/login" css_classActive="NavigationItem-active" css_class="NavigationItem">{"Login"}</NavigationItem></li>
            </ul>
        </nav>
    </header>
);