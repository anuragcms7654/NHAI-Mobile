import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Keyboard } from 'react-native';
import { Text,TextInput, Divider } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import { useFormik } from 'formik';
import { validationSchema } from './NumberSchema';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { updateMobileNumber } from '@/src/store/slices/AuthSlice';
import { useLoginMutation } from '../../store/apiQuery/authApi';
import Button from '../Button/Button';

const NumberForm = ({ getMobileData, mobileNumber }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(mobileNumber || '');  
    const [apiError, setApiError] = useState(null);  
    const [login, { isLoading, isError, error, data }] = useLoginMutation(); 
    useEffect(() => {
        setInputValue(mobileNumber || '');
    }, [mobileNumber]);

    const handleButtonPress = () => {
        console.log('Input Value:', inputValue);
        router.push('/auth/signup');
    };

    const NumberFormik = useFormik({
        initialValues: {
            mobile: mobileNumber || '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await getMobileData(values?.mobile);
            } catch (error) {
                console.error('Login Failed------:', error);
                setApiError("Failed to login. Please check your mobile number or try again."); 
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

            {apiError && <Text style={styles.errorText}>{apiError}</Text>}
            {isError && error && (
                <Text style={styles.errorText}>{error.message || 'Something went wrong, please try again.'}</Text>
            )}

            <Button mode="contained" label={"Login Using OTP"} onPress={() => NumberFormik.handleSubmit()} style={{marginTop: 8}}/>

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
                label={'Signup'}
            />


            <View style={styles.TroubleContainer}>
                <Text style={styles.Troubletext}>Having trouble logging in ?</Text>
                <Link style={styles.linkText}>Get Help</Link>
            </View>
        </View>
    );
};

export default NumberForm;

const styles = StyleSheet.create({
    errorText: {
        color: '#941D10',
        fontSize: 14,
        marginBottom: 10,
    },
    // Loginbutton: {
    //     marginTop: 8,
    // },
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
    },
    headerText: {
        fontFamily: 'Inter-Black',
        fontSize: 30,
        marginBottom: 20,
        marginTop: 15,
    },
});
