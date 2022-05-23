import {configureStore} from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "./reducers";
const store=configureStore({
    reducer:{
    data:reducers
}
},composeWithDevTools)

export default store;