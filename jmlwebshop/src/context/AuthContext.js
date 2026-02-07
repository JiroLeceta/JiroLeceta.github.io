import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Load user data on mount
    useEffect(() => {
        try {
            const userData = localStorage.getItem('user');
            const loginStatus = localStorage.getItem('loggedIn');
            
            if (userData && loginStatus === 'true') {
                setUser(JSON.parse(userData));
                setIsLoggedIn(true);
            }
        } catch (e) {
            console.log('Storage not available');
        }
    }, []);

    const signup = (userData) => {
        try {
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        } catch (e) {
            console.log('Storage not available');
            return false;
        }
    };

    const login = (email, password) => {
        try {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                return { success: false, message: 'No account found. Please sign up.' };
            }

            const userData = JSON.parse(storedUser);
            if (email === userData.email && password === userData.password) {
                setUser(userData);
                setIsLoggedIn(true);
                localStorage.setItem('loggedIn', 'true');
                return { success: true, message: 'Login successful!' };
            } else {
                return { success: false, message: 'Invalid email or password' };
            }
        } catch (e) {
            console.log('Storage not available');
            return { success: false, message: 'An error occurred' };
        }
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('loggedIn');
    };

    const value = {
        user,
        isLoggedIn,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};