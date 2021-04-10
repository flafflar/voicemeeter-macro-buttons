import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './pad.css';

/**
 * Renders a pad button
 * @augments {Component<Props, State>}
 */
export default class Pad extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return <div className='pad'>
			<div className='pad-label'>{this.props.label}</div>
		</div>;
	}
}

Pad.propTypes = {
	/** The label that will appear on the pad */
	label: PropTypes.string
}
