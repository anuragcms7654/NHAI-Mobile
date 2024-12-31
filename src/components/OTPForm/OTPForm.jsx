import { useRouter } from "expo-router";
import { StyleSheet, View, TextInput, ScrollView, RefreshControl } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Text, Button } from 'react-native-paper';
import { Formik } from 'formik';
import { validationSchema } from './OTPschema';
import Loader from '../Loader/Loader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSendotpMutation } from '../../store/apiQuery/authApi'; // Import your mutation

export const OTPForm = ({ refreshTrigger, mobile, onBack, formattedTime, timeLeft, onResend }) => {
  const [otp, setOtp] = useState(Array(5).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); 
  const [errorState, setErrorState] = useState(false);  // New state for error management
  const inputRefs = useRef([]);
  const router = useRouter();

  // Initialize send OTP mutation
  const [sendOtp, { isLoading, error: errorApi, data: verifyResData }] = useSendotpMutation();

  useEffect(() => {
    setOtp(Array(5).fill(''));
  }, [refreshTrigger]);

  useEffect(() => {
    // Handle error from Formik validation or API response
    if (errorApi) {
      setErrorMessage(errorApi?.data?.message || errorApi?.message || 'Failed to send OTP. Please try again.');
      setErrorState(true);  // Set error state to true
    } else if (verifyResData) {
      router.push("/dashboard");
    }
  }, [errorApi, verifyResData]);

  // Handle OTP submission
  const handleValueOtp = (values) => {
    const otpString = values.otp.join('');
    sendOtp({ mobile, otp: otpString });
  };

  // Handle input change and manage OTP state
  const handleInput = (e, index, setFieldValue) => {
    const text = e.nativeEvent.text || e.nativeEvent.key;
    const updatedOtp = [...otp];

    if (text === 'Backspace') {
      if (index > 0 || index === 0) {
        updatedOtp[index] = '';
        setOtp(updatedOtp);
        setFieldValue('otp', updatedOtp);
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    if (text && text.length === 1) {
      updatedOtp[index] = text.slice(0, 1);
      setOtp(updatedOtp);
      setFieldValue('otp', updatedOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle refresh action
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setOtp(Array(5).fill(''));
      setRefreshing(false);
    }, 2000);
  };

  // Clear error message if OTP value changes
  const handleOtpChange = (values) => {
    setErrorMessage(null);  // Reset error message if OTP is modified
    setErrorState(false);   // Reset error state when OTP is changed
  };

  // Handle resend action, clear OTP input fields and error message
  const handleResend = (setFieldValue) => {
    setOtp(Array(5).fill(''));  // Reset OTP fields to empty when Resend is pressed
    setFieldValue('otp', Array(5).fill(''));  // Also reset Formik values
    setErrorMessage(null);  // Clear the error message when Resend is clicked
    setErrorState(false);  // Reset the error state
    inputRefs.current[0]?.focus();
    inputRefs.current.forEach(ref => ref.blur()); // Remove focus from all OTP inputs
    setFocusedIndex(null);  // Reset focused index
    
    if (onResend) onResend();  // Call the onResend function passed as a prop
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ otp: Array(5).fill('') }}
        validationSchema={validationSchema}
        onSubmit={handleValueOtp}
      >
        {({ handleChange, handleBlur, values, errors, touched, setFieldValue, handleSubmit,resetForm }) => (
          <View>
            <View style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={30} color="black" onPress={onBack} />
            </View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Verify OTP</Text>
              <Text style={styles.subText}>
                OTP has been sent to{' '}
                <Text style={styles.boldText}>
                  +91 {mobile} <Text style={styles.dot}>&#x2022;</Text>
                </Text>{' '}

                <Text style={styles.editText} onPress={onBack}>Edit</Text>
              </Text>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#104685']} size="large" />}
            >
              <View style={styles.otpContainer}>
                {values.otp.map((digit, index) => {
                  // Determine if there's an error for the current field
                  const isError = 
                    (touched.otp && errors.otp && errors.otp[index]) || 
                    errorState;  // Apply error styling globally if there's any error

                  return (
                    <TextInput
                      key={index}
                      style={[
                        styles.inputOtp,
                        focusedIndex === index ? styles.focusedInput : styles.defaultInput,
                        isError ? styles.errorInput : null,  // Apply error styling
                      ]}
                      value={digit}
                      keyboardType="numeric"
                      maxLength={1}
                      onChangeText={(text) => {
                        handleInput({ nativeEvent: { text } }, index, setFieldValue);
                        handleOtpChange(values);  // Reset error message when OTP is modified
                      }}
                      onKeyPress={(e) => handleInput(e, index, setFieldValue)}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => {
                        handleBlur(`otp[${index}]`);
                        setFocusedIndex(null);
                      }}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                  );
                })}
              </View>

              {/* Display Formik error messages for OTP fields */}
              {errorMessage &&  (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}

              <View style={styles.dontReceive}>
                <Text style={styles.dontReceiveText}>
                  Didn’t receive the OTP? <Text style={styles.dot}>&#x2022;</Text>
                </Text>
                {timeLeft === 0 ? (
                  <Text mode="text" onPress={() => {handleResend(setFieldValue); resetForm()}} style={styles.resendText}>
                    Resend
                  </Text>
                ) : (
                  <Text style={styles.resendCounter}>Resend in {formattedTime}</Text>
                )}
              </View>

              <View>
                <Button
                  mode="contained"
                  onPress={() => {
                    // Clear previous error message before submitting
                    setErrorMessage(null);
                    setErrorState(false);
                    setTimeout(() => handleSubmit(), 100);
                  }}
                  style={styles.buttonOtp}
                >
                  Verify OTP
                  {isLoading && <Loader size={15} style={{ paddingTop: 7, paddingLeft: 5 }} />}
                </Button>
              </View>

            </ScrollView>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'flex-start',
    marginBottom: 5,
    marginLeft: -5,
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Inter-Black',
  },
  subText: {
    fontSize: 13,
    padding: 2,
  },
  boldText: {
    fontWeight: 'bold',
  },
  dot: {
    color: '#adadad',
  },
  editText: {
    color: '#104685',
    fontWeight: 500,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 35,
  },
  inputOtp: {
    width: 50,
    height: 48,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  defaultInput: {
    borderColor: '#adadad',
  },
  focusedInput: {
    borderColor: '#104685',
  },
  errorInput: {
    borderColor: '#941D10',  // Red border for errors
  },
  dontReceive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  dontReceiveText: {
    fontSize: 14,
  },
  resendCounter: {
    color: '#BCBABA',
    marginLeft: 5,
    fontWeight: '500',
  },
  buttonOtp: {
    borderRadius: 50,
    width: '100%',
    backgroundColor: '#104685',
    marginTop: 20,
    marginBottom: 15,
  },
  resendText: {
    color: '#104685',
    fontWeight: 500,
  },
  errorText: {
    color: '#941D10',
    marginTop: -15,
    marginBottom: 15,
  },
});

export default OTPForm;
