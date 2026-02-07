import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState({});
    const [lastOrder, setLastOrder] = useState(null);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const cartData = localStorage.getItem('jltech_cart');
            if (cartData) {
                setItems(JSON.parse(cartData));
            }
            const orderData = localStorage.getItem('jltech_lastOrder');
            if (orderData) {
                setLastOrder(JSON.parse(orderData));
            }
        } catch (e) {
            console.log('Storage not available');
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('jltech_cart', JSON.stringify(items));
        } catch (e) {
            console.log('Storage not available');
        }
    }, [items]);

    const addItem = (product, quantity = 1) => {
        setItems(prevItems => {
            const newItems = { ...prevItems };
            if (newItems[product.id]) {
                newItems[product.id].quantity += quantity;
            } else {
                newItems[product.id] = { ...product, quantity };
            }
            return newItems;
        });
    };

    const removeItem = (productId) => {
        setItems(prevItems => {
            const newItems = { ...prevItems };
            delete newItems[productId];
            return newItems;
        });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeItem(productId);
        } else {
            setItems(prevItems => ({
                ...prevItems,
                [productId]: { ...prevItems[productId], quantity }
            }));
        }
    };

    const getItems = () => {
        return Object.values(items);
    };

    const getItemCount = () => {
        return Object.values(items).reduce((count, item) => count + item.quantity, 0);
    };

    const getSubtotal = () => {
        return Object.values(items).reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const clear = () => {
        setItems({});
    };

    const saveOrder = (orderData) => {
        setLastOrder(orderData);
        try {
            localStorage.setItem('jltech_lastOrder', JSON.stringify(orderData));
        } catch (e) {
            console.log('Storage not available');
        }
    };

    const getLastOrder = () => {
        return lastOrder;
    };

    const value = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        getItems,
        getItemCount,
        getSubtotal,
        clear,
        saveOrder,
        getLastOrder
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};