import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({children}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();
  
    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/auth');
      }
    }, [isAuthenticated]);
  
    return isAuthenticated ? children : null;
}

export default PrivateRoutes