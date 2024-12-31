import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuth = () => {
    const { token } = useSelector(state => state.auth)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token); // Replace with SecureStore or AsyncStorage
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken'); // Replace with SecureStore or AsyncStorage
        setIsAuthenticated(false);
    };

    return { isAuthenticated, login, logout };
};

export default useAuth;
