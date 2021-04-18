import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {changeLabel} from './PadSlice'
import {close} from './PadEditorSlice'

import './pad-editor.css'

class PadEditor extends Component {
	constructor(props){
		super(props);
	}

	close(){
		this.props.dispatch(close())
	}

	onLabelChange(event){
		this.props.dispatch(changeLabel({
			id: this.props.pad.id,
			label: event.target.value
		}))
	}

	render(){
		return (
			<div id='pad-editor' className={this.props.open ? '' : 'hidden'}>
				<label for='pad-label'>Label:</label>
				<input
					id='pad-label'
					type='text'
					value={this.props.pad.label}
					onChange={this.onLabelChange.bind(this)}
				/>
				<div className='button' onClick={this.close.bind(this)}>OK</div>
			</div>
		);
	}
}

PadEditor.propTypes = {
	/** Whether the editor is open or not */
	open: PropTypes.bool.isRequired,
	/** The pad to edit */
	pad: PropTypes.number.isRequired
}

export default connect((state) => ({
	open: state.padEditor.open,
	pad: state.pads.find(pad => pad.id === state.padEditor.id)
}))(PadEditor)
