import {combineReducers} from 'redux'
//import mess from './reducer'

import adm from './Admin/reducer'
import patient from './Patient/reducer'

const rootReducer = combineReducers({
    adm,patient
});

export default rootReducer;