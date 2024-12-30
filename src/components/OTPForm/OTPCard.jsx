import { StyleSheet, View, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, RefreshControl } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Text, Button } from 'react-native-paper';
import { Formik } from 'formik';
import { validationSchema } from './OTPschema';
import useCountdown from '../../hooks/useCountdown';
import Loader from '../Loader/Loader';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backButton: {
      alignItems: 'flex-start',
      marginBottom: 5,
      marginLeft: -15,
    },
    backButtonIcon: {
      fontSize: 30,
      color: 'black',
    },
    header: {
      marginBottom: 20,
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
      borderColor: '#941D10',
    },
    dontReceive: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
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
      marginTop: 15,
      marginBottom: 15,
    },
  
  });


const OTPCard = ({refreshTrigger}) => {
    const [otp, setOtp] = useState(Array(5).fill(''));
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const inputRefs = useRef([]);
    const { formattedTime, reset, restart } = useCountdown(30);
  
    useEffect(() => {
      setOtp(Array(5).fill(''));
    }, [refreshTrigger]);
  
    const handleValueOtp = (values) => {
      alert(values.otp.join(''));
    };
  
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
  
    const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => {
        setOtp(Array(5).fill(''));
        setRefreshing(false);
      }, 2000);
    };
  
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{ otp: Array(5).fill('') }}
          validationSchema={validationSchema}
          onSubmit={handleValueOtp}
        >
          {({ handleChange, handleBlur, values, errors, touched, setFieldValue, handleSubmit }) => (
            <View>
              <View style={styles.backButton}>
                <Button
                  icon="arrow-left"
                  labelStyle={styles.backButtonIcon}
                  onPress={() => console.log('Button pressed')}
                />
              </View>
              <View style={styles.header}>
                <Text style={styles.headerText}>Verify OTP</Text>
                <Text style={styles.subText}>
                  OTP has been sent to{' '}
                  <Text style={styles.boldText}>
                    +91 7210324315 <Text style={styles.dot}>&#x2022;</Text>
                  </Text>{' '}
                  <Text style={styles.editText}>Edit</Text>
                </Text>
              </View>
  
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#104685']}  
                  size="large"
                />
                }
              >
                <View style={styles.otpContainer}>
                  {values.otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={[
                        styles.inputOtp,
                        focusedIndex === index ? styles.focusedInput : styles.defaultInput,
                        touched.otp && errors.otp && errors.otp[index] ? styles.errorInput : null,
                      ]}
                      value={digit}
                      keyboardType="numeric"
                      maxLength={1}
                      onChangeText={(text) => handleInput({ nativeEvent: { text } }, index, setFieldValue)}
                      onKeyPress={(e) => handleInput(e, index, setFieldValue)}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => {
                        handleBlur(`otp[${index}]`);
                        setFocusedIndex(null);
                      }}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                  ))}
                </View>
                <View style={styles.dontReceive}>
                  <Text style={styles.dontReceiveText}>
                    Didn’t receive the OTP? <Text style={styles.dot}>&#x2022;</Text>
                  </Text>
                  <Text style={styles.resendCounter}>Resend in {formattedTime}</Text>
                </View>
                <View>
                  <Button mode="contained" onPress={() => {
                    setTimeout(() => handleSubmit(), 100);
                  }} style={styles.buttonOtp}>
                    Verify OTP  <Loader size={15} style={{ paddingTop:7,paddingLeft:5}}/>
                  </Button>
                </View>
              </ScrollView>
            </View>
          )}
        </Formik>
      </View>
    );
}

export default OTPCard;
