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
        [navigate]
    );

    const handleLogout = () => {
        logout();
        navigate('/admin-login');
    }

    const handleAddProduct = (type: 'edit' | 'add', product: any) => {
        if (type === 'edit') {
            updateProduct(product);
        } else {
            addProduct(product);
        }
    }

    const handleProductEdit = (id: number) => {
        setAddEdirProductOpen(true);
        setSelectedEditProduct(products.find((p) => Number(p.id) === Number(id)) as any)
    }

    const handleProductDelete = (id: number) => {
        deleteProduct(id);
        fetchProductsAndCat();
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