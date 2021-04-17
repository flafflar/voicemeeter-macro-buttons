import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import './grid.css'

import Pad from './Pad'

/**
 * Renders a grid of pad buttons
 *
 * @augments {Component<Props, State>}
 */
class Grid extends Component {
	constructor(props){
		super(props);
	}

	render(){
		let pads = this.props.padInfo.map(info => (
			<Pad
				pushButton={info.pushButton}
				label={info.label}
				key={info.id}
			/>
		));
		return <div className='grid'>{pads}</div>
	}
}

Grid.propTypes = {
	/** Information about the pads to render */
	padInfo: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		label: PropTypes.string,
		pushButton: PropTypes.bool.isRequired
	}))
}

export default connect((state) => ({
	padInfo: state.pads
}))(Grid)
