import products from "./slices/productsSlice";


import { combineReducers } from "redux";

const reducers = combineReducers({
    products,
    
});

export default reducers;
