import React from 'react';
import ProductList from '../components/ProductList';
import StickyNavbar from '../components/StickyNavbar';
import SortByMenu from '../components/SortByMenu';
import Filter from '../components/Filter/Filter';
import Box from '@mui/material/Box';
import { fetchAllCategories, fetchProducts, updateProduct } from '../api/products';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks';
import { Product, ProductsActionTypes } from '../reducers/products';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector<AppState>(state => state.products.products) as Product[];
    const categories = useSelector<AppState>(state => state.products.categories) as string[];


    const [selectedSortType, setSelectedSortType] = React.useState<number>()
    const [selectedFilterCategories, setSelectedFilterCategories] = React.useState<string[]>([]);

    const filteredAndSortedProducts = React.useMemo(() => {

        const whichHasSelectedCategory = (p: Product) => selectedFilterCategories.some((c) => c === p.category);

        const filteredProducts: Product[] = selectedFilterCategories.length > 0 ? products.filter(whichHasSelectedCategory) : products;
        let soortedPProducts;
        switch (selectedSortType) {
            case 10:
                soortedPProducts = filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 20:
                soortedPProducts = filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case 30:
                soortedPProducts = filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case 40:
                soortedPProducts = filteredProducts.sort((a, b) => Number(b.rating) - Number(a.rating));
                break;

            default:
                soortedPProducts = filteredProducts;
        }

        return soortedPProducts;
    }, [selectedFilterCategories, products, selectedSortType]);

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
        navigate('/user-login');
    }

    const handleFilter = (cat: string[]) => {
        setSelectedFilterCategories(cat);
    }

    const handleSortSelectionChange = (value: number) => {
        setSelectedSortType(value);
    }

    const handleChangeRating = (id: number, rating: number) => {

        const product = products.find((p) => Number(p.id) === Number(id)) as Product;
        const index = products.findIndex((p) => Number(p.id) === Number(product.id));
        const cloneProducts = [...products];
        cloneProducts.splice(index, 1, { ...product, rating });

        updateProduct({
            ...product,
            rating
        });
        dispatch({
            type: ProductsActionTypes.fetchProductsSuccess,
            payload: cloneProducts
        })
    }

    return (
        <div>
            <StickyNavbar title='Hi Nouman' onLogout={handleLogout} />
            <Box display={'flex'} gap={2} justifyContent={'center'} margin={2}>
                <Filter categories={categories} handleFilter={handleFilter} />
                <SortByMenu onSelectionChange={handleSortSelectionChange} />
            </Box>
            <ProductList products={filteredAndSortedProducts} isAdmin={false} onChangeRating={handleChangeRating} />
        </div>
    );
};

export default Home;