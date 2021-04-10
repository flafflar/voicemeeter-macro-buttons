import './style.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Grid from './components/Grid';
class App extends Component {

	render(){
		return <Grid numberOfPads={100} />
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
