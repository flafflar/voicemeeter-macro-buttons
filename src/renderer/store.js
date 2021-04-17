import {configureStore} from '@reduxjs/toolkit'

import PadReducer from './components/PadSlice'

export default configureStore({
	reducer: {
		pads: PadReducer
	}
})
