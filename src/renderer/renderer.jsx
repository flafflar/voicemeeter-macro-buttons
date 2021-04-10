import './style.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Pad from './components/Pad.jsx';
class App extends Component {

	render(){
		return <Pad label='Test' />
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
