import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loader = ({ size = 'small', color = 'white', style }) => {
  return (
    <View style={[style]}>
      <ActivityIndicator animating={true} size={size} color={color} />
    </View>
  );
};

export default Loader;

