import React, { useState, useEffect } from 'react'
import './ProdutoDetalhado.css'
import { useParams, Link } from 'react-router-dom'
import { getProductByCod } from '../../utils/database/databaseFunctions';
import HeaderDinamico from '../../Components/HeaderDinamico/HeaderDinamico';
import FooterDinamico from '../../components/FooterDinamico/FooterDinamico';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import WhatsappButton from '../../Components/WhatsappButton/WhatsappButton';



function ProdutoDetalhado() {
    const productInfo = useParams();
    const [product, setProduct] = useState({
        system_cod: 0,
        product: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
        image_name: ''
    });

    const [productStorage, setProductStorage] = useState([
        {
            system_cod: 0,
            product: "teste",
            quantity: 0,
            price: '10'
        }
    ]);
    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductByCod(productInfo.system_cod);
            setProduct(productData);

            setProductStorage((prevStorage) => [
                {
                    ...prevStorage[0],
                    product: productData.product,
                    price: productData.price
                }
            ]);
        };
        fetchProduct();
    }, []);

    return (
        <>
            <HeaderDinamico />
            <main className='container-pagina-produto'>
                <section>
                    <div className='breadcrumbs-produtos' >
                        <Breadcrumbs
                            aria-label="breadcrumb"
                            separator=">"
                        >
                            <Link to={"/home"}>
                                Home
                            </Link>
                            <Link to={"/produtos"}>
                                Produtos
                            </Link>
                            <Link to={`/produtos/${product.category}`}>
                                {
                                    product.category === 'estetica' ?

                                        "Estética"

                                        :

                                        product.category

                                }
                            </Link>
                            <p >{product.product}</p>
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
                                        <input type="text" defaultValue={1} />
                                        :
                                        <></>
                                }

                                {
                                    product.category != 'estetica' ?
                                        <WhatsappButton
                                            oneUnit={true}
                                            products={productStorage}
                                        />
                                        :
                                        <button>
                                            Adicionar ao carrinho
                                        </button>
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
    )
}

export default ProdutoDetalhado