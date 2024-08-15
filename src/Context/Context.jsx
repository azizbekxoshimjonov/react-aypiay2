import React, { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ContextProvider = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Ma'lumotlar kelayotganini tekshirish uchun konsolga chiqaramiz
        fetch('https://fakestoreapi.com/products/')
            .then(res => res.json())
            .then(data => {
                console.log("Fetched data:", data); // Ma'lumotlarni tekshirish
                setProducts(data);
            })
            .catch(error => console.error("Error fetching data:", error)); // Xato bo'lsa konsolga chiqarish
    }, []);

    return (
        <Context.Provider value={{ products }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
