import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Editor from './containers/Editor';
import Chat from './containers/Chat';
import System from './containers/System';


export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path="index" component={Home}/>
        <Route path="editor" component={Editor}/>
        <Route path="chat" component={Chat} />
        <Route path="system" component={System}/>
    </Route>
)