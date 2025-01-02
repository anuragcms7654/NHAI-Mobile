import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { colors, fontSizes } from "@/src/utils/colorCode";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const DynamicTextInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
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

  const borderColor = error ? colors.error : colors.brand500;

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
        placeholderTextColor="gray"
        theme={{
          colors: {
            primary: borderColor,
            outline: borderColor,
          },
        }}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={togglePasswordVisibility}
        >
          <Text style={styles.toggleButtonText}>
            {showPassword ? (
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={18}
                color={colors.brand500}
              />
            ) : (
              <MaterialCommunityIcons
                name="eye-outline"
                size={18}
                color={colors.brand500}
              />
            )}
          </Text>
        </TouchableOpacity>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    fontSize: 14,
    maxWidth: "20.75rem",
    height: "3.25rem",
    width: "100%",
    backgroundColor: colors.gray000,
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
  },
  toggleButtonText: {
    color: colors.brand500,
    fontSize: 12,
    marginTop: 8,
    fontFamily: "inter-black",
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },
});

export default DynamicTextInput;
