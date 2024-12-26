import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PromotionList from './PromotionList';
import PromotionDetails from './PromotionDetails';
import AddPromotion from './AddPromotion';
import UpdatePromotion from './UpdatePromotion';


const App = () => {
  return (
    <Router>
      <div>
        <h1>Promoções</h1>
        <Routes>
          <Route path="/" element={<PromotionList />} /> {/* Página principal com lista de promoções */}
          <Route path="/promotions" element={<PromotionList />} /> {/* Lista de promoções */}
          <Route path="/promotions/add" element={<AddPromotion />} /> {/* Formulário para adicionar uma nova promoção */}
          <Route path="/promotions/:id" element={<PromotionDetails />} /> {/* Detalhes de uma promoção */}
          <Route path="/promotions/:id" element={<UpdatePromotion />} /> {/* Editar uma promoção */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
