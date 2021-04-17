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

		this.state = {
			/** Wheter the button is active or not */
			active: false
		}
	}

	/** Activates the button */
	activate(){
		this.setState({active: true})
	}

	/** Deactivates the button */
	deactivate(){
		this.setState({active: false});
	}

	/** @param {MouseEvent} event */
	onMouseDown(event){

		// Left click
		if (event.button === 0){

			// If the button is a push button, activate it
			if (this.props.pushButton){
				this.setState({active: true})
			} else {
				// If the button is a 2-position button, flip its state
				this.setState({active: !this.state.active})
			}
		}
	}

	/** @param {MouseEvent} event */
	onMouseUp(event){

		// Left click
		if (event.button === 0){

			// If the button is a push button, deactivate it
			if (this.props.pushButton){
				this.setState({active: false})
			}
			// if the button is a 2-position button, do nothing
		}
	}

	render(){
		return (
			<div
				className={'pad' + (this.state.active ? ' active' : '')}
				onMouseDown={this.onMouseDown.bind(this)}
				onMouseUp={this.onMouseUp.bind(this)}
			>
				<div className='pad-label'>{this.props.label}</div>
				<div className='pad-type-label'>{'Mode: ' + (this.props.pushButton ? 'PUSH' : '2P')}</div>
			</div>
		);
	}
}

Pad.propTypes = {
	/** Whether the pad acts as a push button or a 2-position button */
	pushButton: PropTypes.bool.isRequired,
	/** The label that will appear on the pad */
	label: PropTypes.string
}
