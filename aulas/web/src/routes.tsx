import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

/**
 * Obs.: não precisa usar o exact
 * esse processo de navegação foi melhorado na versão 6 do 
 * react-router-dom
 */

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/cadastro" element={<CreatePoint />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;