import React, {Component} from 'react';

import Grid from './components/Grid';

export default class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			/** Settings of all the pads */
			pads: new Array(100).fill().map((_, i) => ({
				/** The ID of the pad */
				id: i,
				/** The label of the pad */
				label: '',
				/** Whether the pad is a push-button or a 2-position button */
				pushButton: true
			}))
		}
	}

	render(){
		return <Grid padInfo={this.state.pads} />
	}
}
