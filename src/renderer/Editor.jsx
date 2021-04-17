import React, {Component} from 'react'

export default class Editor extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return <h1>{new URL(location).searchParams.get('id')}</h1>;
	}
}
