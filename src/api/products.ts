import { Product } from "../reducers/products";
import { api } from "./util";

const convertRatingOutOfFive = (rating: { rate: number; count: number }) => {
    const weightedRating = (rating.rate * rating.count) / 100;

    // Optionally, round the result based on preference
    const roundedRating = Math.round(weightedRating * 10) / 10;

    return roundedRating;
}

export const fetchProducts = () => api.get<any>('products')
    .then((resp) => ({
        ...resp,
        data: resp.data.map((p: any) => ({
            ...p,
            rating: convertRatingOutOfFive(p.rating)
        }))
    }));

export const addProduct = (product: Product) => api.post<Product, any>('products', product);
export const updateProduct = (product: Product) => api.put<Product, any>(`products/${product.id}`, product);
export const deleteProduct = (id: any) => api.delete(`products/${id}`);

export const fetchAllCategories = () => api.get<any>('products/categories')