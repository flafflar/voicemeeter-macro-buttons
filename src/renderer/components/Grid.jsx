import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './grid.css';

import Pad from './Pad'

/**
 * Renders a grid of pad buttons
 *
 * @augments {Component<Props, State>}
 */
export default class Grid extends Component {
	constructor(props){
		super(props);
	}

	render(){
		let pads = new Array(this.props.numberOfPads).fill().map((_, i) => <Pad label={i.toString()} key={i} />);
		return <div className='grid'>{pads}</div>
	}
}

Grid.propTypes = {
	/** The number of pads to display */
	numberOfPads: PropTypes.number.isRequired
}
