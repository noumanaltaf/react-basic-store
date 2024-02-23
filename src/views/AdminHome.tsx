import React from 'react';
import ProductList from '../components/ProductList';
import StickyNavbar from '../components/StickyNavbar';
import { addProduct, deleteProduct, fetchAllCategories, fetchProducts, updateProduct } from '../api/products';
import AddProductModal from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Product, ProductsActionTypes } from '../reducers/products';
import { AppState } from '../store';
import { convertImageToBase64 } from '../utils/helper';

const AdminHome = () => {
    const { hasLoginToken, logout } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector<AppState>(state => state.products.products) as Product[];
    const categories = useSelector<AppState>(state => state.products.categories) as string[];
    const [selectedEditProduct, setSelectedEditProduct] = React.useState<Product | null>();
    const [addEdirProductOpen, setAddEdirProductOpen] = React.useState(false);

    React.useEffect(
        () => {
            if (!hasLoginToken()) {
                navigate('/admin-login');

                return;
            }
        },
        []
    );

    const fetchProductsAndCat = () => {
        fetchProducts()
            .then((resp) => {
                if (resp.status) {
                    dispatch({
                        type: ProductsActionTypes.fetchProductsSuccess,
                        payload: resp.data
                    });
                }
            })
            .catch((err) => console.log(err));

        fetchAllCategories()
            .then((resp) => {
                if (resp.status) {
                    dispatch({
                        type: ProductsActionTypes.fetchCategoriesSuccess,
                        payload: resp.data
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    React.useEffect(
        () => {
            fetchProductsAndCat();
        },
        []
    );

    const handleLogout = () => {
        logout();
        navigate('/admin-login');
    }

    const handleAddProduct = async (type: 'edit' | 'add', product: any) => {
        try {
            if (type === 'edit') {
                await updateProduct(product);
                const index = products.findIndex((p) => Number(p.id) === Number(product.id));
                const cloneProducts = [...products];
                cloneProducts.splice(index, 1, product);

                dispatch({
                    type: ProductsActionTypes.fetchProductsSuccess,
                    payload: cloneProducts
                });
            } else {
                const convertedImage = await convertImageToBase64(product.image);
                const lastProductId = Number(products?.[products.length - 1]?.id ?? 0);
                const newProduct = { id: lastProductId + 1, ...product, image: convertedImage };
                const newProducts = [...products, newProduct];
                dispatch({
                    type: ProductsActionTypes.fetchProductsSuccess,
                    payload: newProducts
                });

                await addProduct(newProduct);
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const handleProductEdit = (id: number) => {
        setAddEdirProductOpen(true);
        setSelectedEditProduct(products.find((p) => Number(p.id) === Number(id)) as any)
    }

    const handleProductDelete = async (id: number) => {
        try {
            await deleteProduct(id)
            const filterDeletedProducts = products.filter((p) => Number(p.id) !== Number(id));
            dispatch({
                type: ProductsActionTypes.fetchProductsSuccess,
                payload: filterDeletedProducts
            })
        } catch (err) {
            console.warn(err)
        }
    }

    return (
        <div>
            <StickyNavbar title={'Admin Panel'} onLogout={handleLogout} />
            <ProductList products={products} isAdmin={true} onProductDelete={handleProductDelete} onProductEdit={handleProductEdit} />
            <AddProductModal
                open={addEdirProductOpen}
                setAddEdirProductOpen={setAddEdirProductOpen}
                product={selectedEditProduct}
                setProduct={setSelectedEditProduct}
                categories={categories}
                onSubmit={handleAddProduct} />
        </div>
    );
};

export default AdminHome;