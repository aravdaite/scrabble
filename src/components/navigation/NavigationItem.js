import React from 'react';

export const NavigationItem = ({ href, css_class, children }) => <a href={href} className={css_class} >{children}</a>