import React, { useEffect, useState } from 'react';
import './Admin.css';

import { getProducts } from '../../utils/database/databaseFunctions';
import whiteLogo from '../../assets/logos/logo-montanha-branca.webp';
import ModalNewProduct from '../../components/ModalNewProduct/ModalNewProduct.jsx';
import ModalEditProduct from '../../components/ModalEditProduct/ModalEditProduct.jsx';

export default function Admin() {
    const [category, setCategory] = useState("Todos");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [reloadProducts, setReloadProducts] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [systemCod, setSystemCod] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts('todos');
            setProducts(products);
            setFilteredProducts(products);
        };
        fetchProducts();
    }, [reloadProducts]);

    function updateCategory(e) {
        setCategory(e);
    }

    function handleSearch(e) {
        setSearchTerm(e.target.value);
    }

    function filterProducts() {
        let updatedProducts = products;

        // Filtrar por categoria
        if (category !== "Todos") {
            updatedProducts = updatedProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
        }

        // Filtrar por termo de busca
        if (searchTerm) {
            updatedProducts = updatedProducts.filter(product =>
                product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.system_cod.toString().includes(searchTerm)
            );
        }

        setFilteredProducts(updatedProducts);
    }

    function OpenEditModal(p) {
        setSystemCod(p.system_cod);
        setOpenEditModal(true);
    };

    const priceFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <>
            {openAddModal &&
                <ModalNewProduct
                    setOpenAddModal={setOpenAddModal}
                    setReloadProducts={setReloadProducts}
                    reloadProducts={reloadProducts}
                    products={products}
                />}

            {openEditModal &&
                <ModalEditProduct
                    setOpenEditModal={setOpenEditModal}
                    system_cod={systemCod}
                    setReloadProducts={setReloadProducts}
                    reloadProducts={reloadProducts}
                    products={products}
                />}

            <div className='header-admin'>
                <img src={whiteLogo} alt="" />
                <h2>Painel Admin</h2>
            </div>

            <div className='search'>
                <input
                    type="text"
                    placeholder='Buscar Produto...'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className='menu'>
                    <a href="#">{category}</a>
                    <div className='submenu'>
                        <a onClick={() => updateCategory("Todos")}>Todos</a>
                        <a onClick={() => updateCategory("Motos")}>Motos</a>
                        <a onClick={() => updateCategory("Bicicletas")}>Bicicletas</a>
                        <a onClick={() => updateCategory("Vonixx")}>Vonixx</a>
                    </div>
                </div>
                <button onClick={filterProducts}>Buscar</button>
            </div >

            <div className='tags-list-section'>
                <div className='tags-list'>
                    <h2 className='tag-product-cod'>Cod.</h2>
                    <h2 className='tag-product-name'>Produto</h2>
                    <h2 className='tag-product-price'>Preço</h2>
                    <button onClick={() => setOpenAddModal(true)}>+</button>
                </div>
            </div>

            <div className='products-section'>
                {filteredProducts.map((p) => {
                    return (
                        <div key={p.system_cod} className='products-list'>
                            <h3 className='product-cod'>{p.system_cod}</h3>
                            <img src={p.image_url} alt="" />
                            {
                                p.product.length > 40 ?
                                    <h3 className='product-name'>{p.product.slice(0, 40) + '...'}</h3>
                                    :
                                    <h3 className='product-name'>{p.product}</h3>
                            }
                            <h3 className='product-price'>{priceFormatter.format(parseFloat(p.price))}</h3>
                            <a
                                className='product-edit'
                                onClick={() => { OpenEditModal(p) }}
                            >Editar</a>
                        </div>
                    )
                })}
            </div>
        </>
    );
}
