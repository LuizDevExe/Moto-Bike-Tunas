import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Produtos from '../pages/Produtos/Produtos';
import HeaderDinamico from '../Components/HeaderDinamico/HeaderDinamico'
import ProdutoDetalhado from '../pages/ProdutoDetalhado/ProdutoDetalhado';

const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/">
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
            </Route>

            <Route path="/produtos">
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos:tipo" element={<Produtos />} />
                <Route path="/produtos/:categoria/:system_cod" element={<ProdutoDetalhado/>} />
            </Route>
          
        </Routes>
    );
};

export default AppRoutes;