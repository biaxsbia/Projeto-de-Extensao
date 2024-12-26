// PromotionList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/promotions');
        setPromotions(response.data);
      } catch (error) {
        console.error('Erro ao buscar promoções', error);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <div className="promotion-list-container">
      <h2>Lista de Promoções</h2>
      <div className="promotion-list">
        {promotions.map((promotion) => (
          <div key={promotion._id} className="promotion-item">
            <h3>{promotion.nome}</h3>
            <p>Desconto: {promotion.desconto}%</p>
            <p>Valor com desconto: R${promotion.valorComDesconto}</p>
            <p>Validade: {promotion.validade}</p>
            <Link to={`/promotions/${promotion._id}`}>Ver detalhes</Link>
            <Link to={`/promotions/${promotion._id}`}>Editar</Link>
          </div>
        ))}
      </div>
      <Link to="/promotions/add" className="add-promotion-button">Adicionar Nova Promoção</Link>
    </div>
  );
};

export default PromotionList;
