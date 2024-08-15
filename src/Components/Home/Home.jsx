import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ContextProvider, { Context } from "../../Context/Context";
import loopa from '../../Assets/Img/loopa.png';
import logo from '../../Assets/Img/logo.png';
import yashilyurak from '../../Assets/Img/yashilyurak.png';
import { Modal as MUI_Modal, Box, Typography } from '@mui/material';

function Home() {
  const { products } = useContext(Context);
  const [initialProducts, setInitialProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [inputValue, setInputValue] = useState('');
  const [muiModalOpen, setMUI_ModalOpen] = useState(false);
  const [localData, setLocalData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    if (products.length > 0) {
      setInitialProducts(products);
      setFilteredProducts(products);
    }
  }, [products]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Load localStorage data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('localData');
    if (savedData) {
      setLocalData(JSON.parse(savedData));
    }
  }, []);

  // Handle love action
  const handleLove = (product) => {
    let updatedLocalData = [...localData];
    if (updatedLocalData.find((item) => item.id === product.id)) {
      updatedLocalData = updatedLocalData.filter((item) => item.id !== product.id);
    } else {
      updatedLocalData.push(product);
    }
    localStorage.setItem('localData', JSON.stringify(updatedLocalData));
    setLocalData(updatedLocalData);
  };

  // Clear loved products
  const clearLocalData = () => {
    localStorage.removeItem('localData');
    setLocalData([]);
  };

  // Handle search
  const handleSearch = (value) => {
    setInputValue(value);
    const searchResult = initialProducts.filter(item =>
      item.title.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredProducts(searchResult);
    setCurrentPage(1);
  };

  const modalStyle = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 582,
    height: 382,
    backgroundColor: 'background.paper',
    border: '2px solid white',
    boxShadow: 'rgba(0, 0, 0, 0.11) 0px 14px 26px 0px',
    borderRadius: '8px',
    overflow: 'auto',
    scrollbarWidth: 'none',
    minWidth: '300px', 
    minHeight: '300px', 
    '@media (max-width: 790px)': { // Planshetlar uchun
      width: '100px',
      height: '100px',
      right:'50%'
    },
  };
  
  

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <ul>
            <li>
              <a href=""><img className='logo' src={logo} alt="Logo" /></a>
            </li>
          </ul>
          <ul className={`list__ong ${menuOpen ? 'open' : ''}`}>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Features</a></li>
            <button className='yurak__btn1' onClick={() => setMUI_ModalOpen(true)}>
              <img src={yashilyurak} alt="Loved Products" />
            </button>
          </ul>
          <button className='burger-menu' onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>

          <div className='search'>
            <img className='loopa' src={loopa} alt="Search" />
            <input
              type="text"
              placeholder="search"
              value={inputValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </header>
        <div className="respons__div">
        <ul className='nav__list'>
          {currentItems.map((item, index) => (
            <li key={index} className='d-flex align-items-center list__item'>
              <div>
                <button className='yurak__btn2' onClick={() => handleLove(item)}>
                  <i className={`yurakcha bi bi-heart${localData.find((product) => product.id === item.id) ? '-fill' : ''}`}></i>
                </button>
              </div>
              <img width={100} height={170} src={item.image} alt={item.title} />
              <h2 className='title'>{item.title}</h2>
              <h3>{item.price}$</h3>
              <p>{item.category}</p>
              <li className='btn btn-info text-red mb-4 more__btn'>
                <Link className='link__title' to="/Detalpage" state={{ product: item }}>More</Link>
              </li>
            </li>
          ))}
        </ul>

        </div>

    

        <div className='pages__btn'>
          <nav className='pagination__bar'>
            <ul className='pagination'>
              {Array.from({ length: Math.min(3, Math.ceil(filteredProducts.length / itemsPerPage)) })
                .map((_, index) => (
                  <li key={index} className='page-item'>
                    <button onClick={() => paginate(index + 1)} className='page-link'>
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        <MUI_Modal
          className='yurak__modal'
          open={muiModalOpen}
          onClose={() => setMUI_ModalOpen(false)}
          aria-labelledby="mui-modal-title"
          aria-describedby="mui-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="mui-modal-title" variant="h6">
              <button onClick={() => setMUI_ModalOpen(false)} className='x__btn'>X</button>
              {localData.length > 0 ? (
                localData.map((item) => (
                  <div className="modal-ichi" key={item.id}>
                    <img className='modal__img rek__img' src={item.image} alt={item.title} />
                    <div className='summa__title'>
                      <span className='item__tile'>{item.title}</span> <br />
                      <span className='item__price'>${item.price}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className='no__lov__prod'>No loved products</p>
              )}
            </Typography>
            <div className='buttons'>
              <button onClick={() => setMUI_ModalOpen(false)} className='close__btn'>Close</button>
              <button onClick={clearLocalData} className='clear__btn'>Clear</button>
            </div>
          </Box>
        </MUI_Modal>
      </div>
    </div>
  );
}

export default Home;
