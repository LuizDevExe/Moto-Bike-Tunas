import React, { useEffect, useState } from 'react';
import "./ModalNewProduct.css"

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from '../../utils/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { storage } from '../../utils/firebase/firebase';

import loadingSvg from '../../assets/loading/loading.svg'

export default function ModalNewProduct({ setOpenAddModal, setReloadProducts, reloadProducts, products }) {
    const [product, setProduct] = useState({
        system_cod: undefined,
        product: '',
        description: '',
        price: '00,00',
        category: '',
        image_url: '',
        image_name: ''
    });
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [spam, setSpam] = useState('');

    const changeProductCod = (e) => {
        const value = e.target.value;

        const positiveNumber = value.replace(/[^0-9]/g, '');

        setProduct(prevState => ({
            ...prevState,
            system_cod: positiveNumber
        }));
    };

    const changeProductPrice = (e) => {
        let value = e.target.value;

        value = value.replace(/[^0-9,]/g, '');

        setProduct(prevState => ({
            ...prevState,
            price: value
        }));
    };

    function verifyCod(cod) {
        return products.some((p) => {
            return cod === p.system_cod;
        });
    }

    const submitProduct = async (e) => {
        e.preventDefault();

        if (!image) {
            setSpam("Nenhuma imagem selecionada!");
            return;
        }

        if (!product.system_cod) {
            setSpam("Insira o código do produto!");
            return;
        }

        if (verifyCod(product.system_cod)) {
            setSpam("Código já registrado!");
            return;
        }

        if (!product.category) {
            setSpam("Insira a categoria do produto!");
            return;
        }

        if (!product.product) {
            setSpam("Insira o nome do produto!");
            return;
        }

        if (!product.price || product.price === "00,00") {
            setSpam("Insira o valor do produto!");
            return;
        }

        setSpam("");
        setIsLoading(true);

        const storageRef = ref(storage, `product_images/${image.name}`);

        try {
            await uploadBytes(storageRef, image); // upload

            const fileUrl = await getDownloadURL(storageRef); // get url
            setProduct(prevState => ({
                ...prevState,
                image_url: fileUrl,
                image_name: image.name
            }));

            const productsCollection = collection(db, 'products'); //add firestore
            await addDoc(productsCollection, {
                ...product,
                image_url: fileUrl,
                image_name: image.name
            });

            setReloadProducts(!reloadProducts);
            setOpenAddModal(false);

        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            setOpenAddModal(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);



    return (
        <div className='content-modal-new-product'>
            <div className='modal-new-product'>
                <div className='modal-new-product-top-content'>
                    <h2>Adicionar Produto:</h2>
                </div>
                <div className='modal-new-product-form'>
                    <div className='modal-new-product-file-div'>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className='modal-new-product-cod-div'>
                        <div>
                            <h2>Código</h2>
                            <input
                                type="text"
                                value={product.system_cod}
                                onChange={(e) => changeProductCod(e)}
                            />
                        </div>
                        <div>
                            <h2>Categoria</h2>
                            <select
                                className="custom-select"
                                onChange={(e) => setProduct(prevState => ({ ...prevState, category: e.target.value }))}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="vonixx">Vonixx</option>
                                <option value="motos">Motos</option>
                                <option value="bicicletas">Bicicletas</option>
                            </select>
                        </div>
                    </div>
                    <div className='modal-new-product-name-div'>
                        <h2>Nome</h2>
                        <input
                            type="text"
                            onChange={(e) => setProduct(prevState => ({ ...prevState, product: e.target.value }))}
                        />
                    </div>
                    <div className='modal-new-product-description-div'>
                        <h2>Descrição {product.description.length}/800</h2>
                        <textarea
                            maxLength={800}
                            name=""
                            id=""
                            onChange={(e) => setProduct(prevState => ({ ...prevState, description: e.target.value }))}
                        ></textarea>
                    </div>
                    <div className='modal-new-product-value-div'>
                        <h2>Valor</h2>
                        <input
                            type="text"
                            value={`R$ ${product.price}`}
                            onChange={(e) => changeProductPrice(e)}
                        />
                    </div>
                </div>

                <div className='spam-new-product'>
                    <h4>{spam}</h4>
                </div>


                {isLoading ?
                    <div className='loading-modal-new-product-section'>
                        <img className='loading-modal-new-product' src={loadingSvg} alt="loading" />
                    </div>
                    :

                    <div className='modal-new-product-buttons'>
                        <a
                            className='add'
                            onClick={(e) => submitProduct(e)}
                        >Adicionar
                        </a>
                        <a
                            className='cancel'
                            onClick={() => setOpenAddModal(false)}
                        >Cancelar</a>
                    </div>
                }
            </div>
        </div>
    );
};