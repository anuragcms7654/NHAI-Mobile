import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Keyboard } from 'react-native';
import { Text, Button, TextInput, Divider } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './helper';
import { useRouter } from 'expo-router';
import {styles} from './style'

const NumberForm = ({ getMobileData, error }) => {
    const router = useRouter();

    const handleButtonPress = () => {
        router.push('/auth/signup');
    };

    const NumberFormik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (NumberFormik.isValid && NumberFormik.dirty){
                getMobileData(values?.mobile);
            }else{
                // Toast
            } 
        }
    });

    const handleChangeText = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        if (numericText.length <= 10) {
            NumberFormik.setFieldValue('mobile', numericText);
        }
    };

    const handleBlur = () => {
        Keyboard.dismiss();  
        NumberFormik.handleBlur('mobile'); 
    };

    return (
        <View>
            <Text style={styles.headerText}>Login</Text>
            <TextInput
                label="Registered Mobile Number"
                value={NumberFormik.values.mobile}
                onChangeText={handleChangeText}  
                onBlur={handleBlur}  
                mode="outlined"
                keyboardType="numeric"
                style={styles.MobileInput}
                theme={{
                    colors: {
                        primary: NumberFormik.touched.mobile && NumberFormik.errors.mobile ? '#941D10' : '#104685',
                        outline: NumberFormik.touched.mobile && NumberFormik.errors.mobile ? '#941D10' : '#104685',
                    },
                }}
            />
            {NumberFormik.touched.mobile && NumberFormik.errors.mobile && (
                <Text style={styles.errorText}>{NumberFormik.errors.mobile}</Text>
            )}

            {error && (
                <Text style={styles.errorText}>{error.message || 'Something went wrong, please try again.'}</Text>
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

export default NumberForm;

