import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, useSelector, useDispatch} from 'react-redux'

import store from './store'

import './style.css';
import App from './App';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
