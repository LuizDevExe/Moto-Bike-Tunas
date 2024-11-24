import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";


const getProducts = async (category) => {
    const productsCollection = collection(db, "products");
    const documents = await getDocs(productsCollection);

    const productsList = documents.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (category === "todos") {
        return productsList;
    }

    const filteredProducts = productsList.filter(product => product.category === category);
    return filteredProducts;
};

const getProductByCod = async (system_cod) => {
    const productsCollection = collection(db, "products");

    const q = query(productsCollection, where("system_cod", "==", system_cod));
    const documents = await getDocs(q);

    if (documents.empty) {
        console.log("Nenhum produto encontrado.");
        return null;
    }

    const product = documents.docs[0].data();
    return { id: documents.docs[0].id, ...product };
};

export { getProductByCod, getProducts };
