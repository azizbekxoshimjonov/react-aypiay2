import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Detalpage.css';
import chapga from '../../Assets/Img/chapga.png'

function Detalpage() {
  const location = useLocation();
  const { product } = location.state || {}; // Get product from state

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <div className="container">
        <div className='detal__page'>
        <img className='detal__img'  src={product.image} alt={product.title} />
        <h1 className='detal__title'>{product.title}</h1>
        <p className='detal__des'>{product.description}</p>
        <h3 className='detal__price'>${product.price}</h3>
        <p>{product.category}</p>
        <div>
            <img src={chapga} alt="" />
        <Link to="/" className="back__link">  Back to Home</Link>

        </div>
       
        </div>
      
      </div>
    </div>
  );
}

export default Detalpage;
