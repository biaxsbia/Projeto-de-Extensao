import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './globalStyles.css'; 

const AddPromotion = () => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [desconto, setDesconto] = useState('');
  const [validade, setValidade] = useState('');
  const [categoria, setCategoria] = useState(''); 
  const navigate = useNavigate();

  const handleAddPromotion = async (e) => {
    e.preventDefault();
    try {
      const valorComDesconto = valor - (valor * desconto) / 100;
      await axios.post('http://localhost:5000/promotions', {
        nome,
        valor,
        desconto,
        validade,
        categoria,  
        valorComDesconto,
      });
      navigate('/promotions'); 
    } catch (error) {
      console.error('Erro ao adicionar promoção:', error);
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Promoção</h2>
      <form onSubmit={handleAddPromotion}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do Produto"
          required
        />
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Valor"
          required
        />
        <input
          type="number"
          value={desconto}
          onChange={(e) => setDesconto(e.target.value)}
          placeholder="Desconto (%)"
          required
        />
        <input
          type="date"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
          placeholder="Validade da promoção"
          required
        />
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Categoria"
          required
        />
        <button type="submit">Adicionar Promoção</button>
      </form>
    </div>
  );
};

export default AddPromotion;
