import React, { useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema with Yup
const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(5, 'OTP must be 5 digits')
    .matches(/^\d{5}$/, 'OTP must only contain numbers')
    .required('OTP is required'),
});

const OTPClass = () => {
  // References to the input fields
  const inputRefs = useRef([]);

  // Handle form submission
  const handleSubmit = (values) => {
    console.log('OTP Submitted:', values.otp);
    // Handle OTP submission logic here
    Keyboard.dismiss(); // Optionally dismiss the keyboard after submission
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ otp: '' }}
        validationSchema={otpValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <>
            <Text style={styles.title}>Enter 5-Digit OTP</Text>

            <View style={styles.inputContainer}>
              {/* Loop through input fields */}
              {Array.from({ length: 5 }).map((_, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                  placeholder="-"
                  value={values.otp[index] || ''}
                  onChangeText={(text) => {
                    const newOtp = values.otp.split('');
                    newOtp[index] = text;
                    handleChange('otp')(newOtp.join(''));
                    // Move focus to next input after entering a digit
                    if (text && inputRefs.current[index + 1]) {
                      inputRefs.current[index + 1].focus();
                    }
                  }}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </View>

            {touched.otp && errors.otp && <Text style={styles.error}>{errors.otp}</Text>}

            <Button title="Submit" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default OTPClass;
