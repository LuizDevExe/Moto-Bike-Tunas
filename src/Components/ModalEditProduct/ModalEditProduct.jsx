import React, { useEffect, useState } from 'react';
import "./ModalEditProduct.css"

import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { db } from '../../utils/firebase/firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { storage } from '../../utils/firebase/firebase';
import loadingSvg from '../../assets/loading/loading.svg'
import wasteSvg from '../../assets/waste/waste.svg'
import { getProductByCod } from '../../utils/database/databaseFunctions'; // Certifique-se de que a importação está correta

export default function ModalEditProduct({ setOpenEditModal, setReloadProducts, reloadProducts, system_cod, products }) {
    const [originalProduct, setOriginalProduct] = useState([]);
    const [product, setProduct] = useState({
        system_cod: 0,
        product: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
        image_name: ''
    });
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [spam, setSpam] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            const productData = await getProductByCod(system_cod);
            setProduct(productData);
            setOriginalProduct(productData);
            setIsLoading(false);
        };
        fetchProduct();
    }, [system_cod]);

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

    const editProduct = async (e) => {
        e.preventDefault();

        if (!product.system_cod) {
            setSpam("Insira o código do produto!");
            return;
        }

        // Se o código do produto já existir, verificar se não é o mesmo
        if (verifyCod(product.system_cod) && product.system_cod !== originalProduct.system_cod) {
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

        setIsLoading(true);

        const productsCollection = collection(db, 'products');

        try {
            let fileUrl = product.image_url;

            const oldImageRef = ref(storage, `product_images/${product.image_name}`);

            if (image) {
                await deleteObject(oldImageRef);

                const storageRef = ref(storage, `product_images/${image.name}`);
                await uploadBytes(storageRef, image);
                fileUrl = await getDownloadURL(storageRef);
            }

            const q = query(productsCollection, where("system_cod", "==", product.system_cod));
            const documents = await getDocs(q);
            const productDoc = documents.docs[0];

            await updateDoc(doc(productsCollection, productDoc.id), {
                ...product,
                image_url: fileUrl,
                image_name: image ? image.name : product.image_name
            });

            setReloadProducts(!reloadProducts);
            setOpenEditModal(false);
        } catch (error) {
            setSpam("Erro ao atualizar o produto, Tenta Novamente!")
            console.error("Erro ao atualizar o produto:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProductByCod = async (system_cod) => {
        setIsLoading(true);

        try {
            const productsCollection = collection(db, 'products');
            const q = query(productsCollection, where("system_cod", "==", system_cod));

            const documents = await getDocs(q);

            const productDoc = documents.docs[0];
            const productData = productDoc.data();

            const imageRef = ref(storage, `product_images/${productData.image_name}`);
            await deleteObject(imageRef);

            await deleteDoc(doc(db, 'products', productDoc.id));

            setReloadProducts(!reloadProducts);
            setOpenEditModal(false);
            setIsLoading(false);

        } catch (error) {
            setSpam("Erro ao excluir o produto")
            console.error("Erro ao excluir o produto:", error);
        }
    };

    return (
        <div className='content-modal-edit-product'>
            <div className='modal-edit-product'>
                <div className='modal-edit-product-top-content'>
                    <h2>Editar Produto:</h2>
                </div>
                <div className='modal-edit-product-form'>
                    <div className='image-file-edit-modal-form'>
                        <img src={product.image_url} alt="" />
                        <div className='modal-edit-product-file-div'>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className='modal-edit-product-cod-div'>
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
                                value={product.category}
                                onChange={(e) => setProduct(prevState => ({ ...prevState, category: e.target.value }))}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="vonixx">Vonixx</option>
                                <option value="motos">Motos</option>
                                <option value="bicicletas">Bicicletas</option>
                            </select>
                        </div>
                    </div>
                    <div className='modal-edit-product-name-div'>
                        <h2>Nome</h2>
                        <input
                            type="text"
                            value={product.product}
                            onChange={(e) => setProduct(prevState => ({ ...prevState, product: e.target.value }))}
                        />
                    </div>
                    <div className='modal-edit-product-description-div'>
                        <h2>Descrição {product.description.length}/800</h2>
                        <textarea
                            maxLength={800}
                            value={product.description}
                            onChange={(e) => setProduct(prevState => ({ ...prevState, description: e.target.value }))}
                        ></textarea>
                    </div>
                    <div className='modal-edit-product-value-div'>
                        <h2>Valor</h2>
                        <input
                            type="text"
                            value={`R$ ${product.price}`}
                            onChange={(e) => changeProductPrice(e)}
                        />
                    </div>
                </div>

                <div className='spam-edit-product'>
                    <h4>{spam}</h4>
                </div>
                {isLoading ?
                    <div className='loading-modal-edit-product-section'>
                        <img className='loading-modal-edit-product' src={loadingSvg} alt="loading" />
                    </div>
                    :
                    <div className='modal-edit-product-buttons'>
                        <button
                            className='add-edit'
                            onClick={(e) => editProduct(e)}
                        >Editar
                        </button>
                        <button
                            className='cancel-edit'
                            onClick={() => setOpenEditModal(false)}
                        >Cancelar</button>
                        <button
                            className='del-edit'
                            onClick={() => { deleteProductByCod(product.system_cod) }}
                        >
                            <img src={wasteSvg} alt="deletar produto" />
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}
