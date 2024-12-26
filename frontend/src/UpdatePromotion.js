import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePromotion = () => {
  const { id } = useParams();
  const [promotion, setPromotion] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:5000/promotions/${id}`)
      .then((response) => {
        setPromotion(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar a promoção', error);
      });
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion({ ...promotion, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const valor = parseFloat(promotion.valor) || 0;
      const desconto = parseFloat(promotion.desconto) || 0;


      const valorComDesconto = valor - (valor * desconto) / 100;

      await axios.put(`http://localhost:5000/promotions/${id}`, {
        ...promotion,
        valor: valor, 
        desconto: desconto,
        valorComDesconto,  
      });

      alert('Promoção atualizada com sucesso!');
      navigate(`/promotions/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar promoção:', error);
      alert('Erro ao atualizar promoção. Tente novamente.');
    }
  };

  const handleDelete = () => {
    if (window.confirm("Você tem certeza que deseja excluir esta promoção?")) {
      axios.delete(`http://localhost:5000/promotions/${id}`)
        .then(() => {
          alert('Promoção excluída com sucesso');
          navigate('/promotions');
        })
        .catch((error) => {
          console.error('Erro ao excluir promoção', error);
          alert('Erro ao excluir promoção. Tente novamente.');
        });
    }
  };

  if (!promotion) return <p>Carregando...</p>;

  return (
    <div className="update-promotion-container">
      <h2>Detalhes da Promoção</h2>
      <form onSubmit={handleSubmit} className="promotion-form">
        <input
          type="text"
          name="nome"
          value={promotion.nome || ''}
          onChange={handleChange}
          placeholder="Nome do produto"
          required
        />
        <input
          type="number"
          name="valor"
          value={promotion.valor || ''}
          onChange={handleChange}
          placeholder="Valor"
          required
        />
        <input
          type="number"
          name="desconto"
          value={promotion.desconto || ''}
          onChange={handleChange}
          placeholder="Desconto (%)"
          required
        />
        <input
          type="date"
          name="validade"
          value={promotion.validade || ''}
          onChange={handleChange}
          required
        />
        <div className="form-buttons">
          <button type="submit" className="update-btn">Atualizar Promoção</button>
          <button type="button" onClick={handleDelete} className="delete-btn">Excluir Promoção</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePromotion;
