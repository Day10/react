import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Editor, Chat, System } from './containers';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path="index" component={Home}/>
        <Route path="editor" component={Editor}/>
        <Route path="chat" component={Chat} />
        <Route path="system" component={System}/>
    </Route>
)