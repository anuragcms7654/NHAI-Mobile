import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { colors } from '@/src/utils/colorCode';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const DynamicTextInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  labelStyle,
  inputStyle,
  onBlur,
  onFocus,
  maxLength,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[style]}>
                  <TextInput
                      label={label}
                      value={value}
                      onChangeText={onChangeText}
                      secureTextEntry={secureTextEntry && !showPassword}
                      keyboardType={keyboardType}
                       style={[styles.input, inputStyle]}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      maxLength={maxLength}
                      mode="outlined"
                      theme={{
                        colors: {
                            primary: colors.brand500,
                            outline:  colors.brand500,
                        },
                    }}
                      
                  />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={togglePasswordVisibility}
        >
          <Text style={styles.toggleButtonText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  // colors.brand500
  input: {
    borderRadius: 5,
    fontSize: 16,
    width:'20.75rem',
    height:'3.25rem',
    backgroundColor:'white'
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
  },
  toggleButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default DynamicTextInput; 
