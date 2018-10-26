import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'
import storeFactory from './src/store';
import reducer from './src/reducers'; 
import routes from './src/routes';

const store = storeFactory();

render(
    <Provinder store={store}>
        <div>
            <Router routes={routes}></Router>
        </div>
    </Provinder>,
    document.getElementById('mount')
)



