import React, { useState, useEffect } from 'react';
import './ProdutoDetalhado.css';
import { useParams, Link } from 'react-router-dom';
import { getProductByCod } from '../../utils/database/databaseFunctions';
import HeaderDinamico from '../../Components/HeaderDinamico/HeaderDinamico';
import FooterDinamico from '../../components/FooterDinamico/FooterDinamico';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import WhatsappButton from '../../Components/WhatsappButton/WhatsappButton';

function ProdutoDetalhado() {
    const { system_cod } = useParams();
    const [product, setProduct] = useState({
        system_cod: 0,
        product: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
        image_name: ''
    });

    const [productStorage, setProductStorage] = useState({
        system_cod: 0,
        product: '',
        quantity: 1,
        price: '',
        image_url: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductByCod(system_cod);
            setProduct(productData);

            setProductStorage({
                system_cod: productData.system_cod,
                product: productData.product,
                quantity: 1,
                price: productData.price,
                image_url: productData.image_url
            });
        };
        fetchProduct();
    }, [system_cod]);

    const addProductToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productExisting = cart.findIndex((item) => item.system_cod === product.system_cod);

        if (productExisting >= 0) {
            cart[productExisting].quantity += productStorage.quantity;
        } else if (productStorage) {
            cart.push(productStorage);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
        <>
            <HeaderDinamico />
            <main className='container-pagina-produto'>
                <section>
                    <div className='breadcrumbs-produtos'>
                        <Breadcrumbs aria-label="breadcrumb" separator=">">
                            <Link to="/home">Home</Link>
                            <Link to="/produtos">Produtos</Link>
                            <Link to={`/produtos/${product.category}`}>
                                {product.category === 'estetica' ? "Estética" : product.category}
                            </Link>
                            <p>{product.product}</p>
                        </Breadcrumbs>
                    </div>
                    <article className='article-produto'>
                        <img src={product.image_url} alt="Imagem referente ao produto" />
                        <div className='product-info'>
                            <h1>{product.product}</h1>
                            <h2>R$ {product.price}</h2>
                            <div className='add-cart-section'>

                                {
                                    product.category === "estetica" ?
                                        <input
                                            type="number"
                                            value={productStorage.quantity}
                                            onChange={(e) => {
                                                const quantity = parseInt(e.target.value, 10) || 1;
                                                setProductStorage((prev) => ({
                                                    ...prev,
                                                    quantity
                                                }));
                                            }}
                                        />
                                        :
                                        null
                                }

                                {
                                    product.category !== 'estetica' && productStorage ? (
                                        <WhatsappButton
                                            oneUnit={true}
                                            products={[productStorage]}
                                        />
                                    ) : (
                                        <button onClick={addProductToCart}>
                                            Adicionar ao carrinho
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </article>
                    <article className='article-descricao'>
                        <h1>Descrição Geral</h1>
                        <p>{product.description}</p>
                    </article>
                </section>
            </main>
            <FooterDinamico />
        </>
    );
}

export default ProdutoDetalhado;
