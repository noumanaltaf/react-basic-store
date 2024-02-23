export interface Product {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
    rating: number;
}

export interface ProductsState {
    products: Product[];
    categories: string[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
    categories: []
};
export const ProductsActionTypes = {
    fetchProductsSuccess: 'FETCH_PRODUCTS_SUCCESS',
    fetchProductsError: 'FETCH_PRODUCTS_ERROR',
    fetchCategoriesSuccess: 'FETCH_CATEGORIES_ERROR',
}

interface ProductsAction {
    type: keyof typeof ProductsActionTypes;
    payload?: any;
}

export default function productsReducer(state = initialState, action: ProductsAction): ProductsState {
    switch (action.type) {
        case ProductsActionTypes.fetchProductsSuccess:
            return {
                ...state,
                loading: false,
                products: action.payload as Product[],
                error: null,
            };
        case ProductsActionTypes.fetchCategoriesSuccess:
            return {
                ...state,
                loading: false,
                categories: action.payload as string[],
                error: null,
            };
        case ProductsActionTypes.fetchProductsError:
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payload as string,
            };
        default:
            return state;
    }
};