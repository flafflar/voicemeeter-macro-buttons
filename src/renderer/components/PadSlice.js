import {createSlice} from '@reduxjs/toolkit'

export const PadSlice = createSlice({
	name: 'pads',
	initialState: new Array(100).fill().map((_, i) => ({
		/** The ID of the pad */
		id: i,
		/** The label of the pad */
		label: '',
		/** Whether the pad is a push-button or a 2-position button */
		pushButton: true
	})),
	reducers: {
		changeLabel: (state, action) => {
			state.find(info => info.id === action.payload.id).label = action.payload.label
		}
	}
})

export const { changeLabel } = PadSlice.actions

export default PadSlice.reducer
