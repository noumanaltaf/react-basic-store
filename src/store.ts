import { createStore, combineReducers } from 'redux';

import authReducer, { AuthState } from './reducers/auth';
import productsReducer, { ProductsState } from './reducers/products';

export interface AppState {
    auth: AuthState;
    products: ProductsState
}
const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
});

export default createStore(rootReducer);