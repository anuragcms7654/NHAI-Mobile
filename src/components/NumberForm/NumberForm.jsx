import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button, TextInput, Divider } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import { useFormik } from 'formik';
import { validationSchema } from './NumberSchema';
import { useRouter } from 'expo-router';

const NumberForm = ({getMobileData}) => {
      const router = useRouter();
    const [inputValue, setInputValue] = useState('');

    const handleButtonPress = () => {
        console.log('Input Value:', inputValue);
        router.push('/auth/signup');
    };

    const NumberFormik = useFormik({
        initialValues: {
            mobile: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log(values)
            getMobileData(values?.mobile)
        }
    });


    const isNumeric = /^[0-9]$/; // Regex to match only numeric characters (0-9)
    const handleKeyPress = (e) => {
        const char = e.nativeEvent.key; // Get the key pressed
    
        // Prevent non-numeric characters and special characters
        if (!isNumeric.test(char) && char !== 'Backspace') {
          e.preventDefault(); // Block the input
        }
      };
    return (
        <View>
            <Text variant="titleLarge" style={styles.Logintitle}>Login</Text>
            <TextInput
                label="Registered Mobile Number"
                value={NumberFormik.values.mobile}
                onChangeText={ (text) => {
                    const numericText = text.replace(/[^0-9]/g, ''); 
                    NumberFormik.setFieldValue('mobile', text);
                }}
                onBlur={NumberFormik.handleBlur('mobile')}
                mode="outlined"
                onKeyPress={handleKeyPress}
                keyboardType="numeric"
                style={styles.MobileInput}
                theme={{
                    colors: {
                        primary: NumberFormik.touched.mobile && NumberFormik.errors.mobile ? '#941D10' : '#104685', // Color for label and outline on focus
                        outline: NumberFormik.touched.mobile && NumberFormik.errors.mobile ? '#941D10' : '#104685', // Outline color
                    },
                }}
            />
            {NumberFormik.touched.mobile && NumberFormik.errors.mobile && (
                <Text style={styles.errorText}>{NumberFormik.errors.mobile}</Text>
            )}
            <Button mode="contained" onPress={() => NumberFormik.handleSubmit()} style={styles.Loginbutton}>
                Login Using OTP
            </Button>

            <View style={styles.dividerContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <Divider style={styles.divider} />
            </View>

            <View style={styles.DontHaveView}>
                <Text style={styles.DontHaveText}>Don't have an account?</Text>
            </View>

            <Button
                mode="outlined"
                onPress={handleButtonPress}
                style={styles.outlineButton}
                labelStyle={styles.SignUpText}
                rippleColor="#104685"
            >
                Signup
            </Button>

            <View style={styles.TroubleContainer}>
                <Text style={styles.Troubletext}>Having trouble logging in ?</Text>
                <Link style={styles.linkText}>Get Help</Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Logintitle: {
        marginBottom: 20,
        marginTop: 15,
        fontWeight: '900',
        fontSize: 30,
        color: 'black',
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'white',
    },
    inputError: {
        borderWidth: 1,
        borderColor: 'red', // Red border when there is an error
    },
    errorText: {
        color: '#941D10',
        fontSize: 14,
        marginBottom: 10,
    },
    Loginbutton: {
        marginTop: 8,
        borderRadius: 50,
        backgroundColor: '#104685',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        width: '30%',
        alignSelf: 'center',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#777877',
    },
    dividerText: {
        marginHorizontal: 8,
        color: '#777877',
        fontWeight: 'bold',
    },
    DontHaveView: {
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    DontHaveText: {
        fontSize: 16,
        color: '#777877',
    },
    outlineButton: {
        marginTop: 8,
        borderColor: '#104685',
        borderWidth: 2,
        borderRadius: 50,
        marginBottom: 37,
    },
    SignUpText: {
        color: '#104685',
        fontWeight: 'bold',
    },
    TroubleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    Troubletext: {
        color: '#777877',
        fontSize: 12,
    },
    linkText: {
        color: '#104685',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    MobileInput: {
        backgroundColor: 'white'
    }
});

export default NumberForm;
