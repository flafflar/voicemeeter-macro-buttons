import React, {Component} from 'react'

import Grid from './components/Grid'
import PadEditor from './components/PadEditor'

export default class App extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (<>
			<Grid />
			<PadEditor />
		</>);
	}
}
