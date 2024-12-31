import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

const PublicRoutes = ({children}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();
  
    useEffect(() => {
      if (isAuthenticated) {
        router.replace('/dashboard');
      }
    }, [isAuthenticated]);
  
    return !isAuthenticated ? children : null;
}

export default PublicRoutes