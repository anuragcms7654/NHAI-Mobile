import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Keyboard } from 'react-native';
import { Text,TextInput } from 'react-native-paper';
import { useFormik } from 'formik';
import { validationSchema } from './NumberSchema';
import { useDispatch } from 'react-redux';
// import { updateMobileNumber } from '@/src/store/slices/AuthSlice';
import { useLoginMutation } from '../../store/apiQuery/authApi';
import Button from '../Button/Button';

const NumberForm = ({ getMobileData, mobileNumber }) => {
    const dispatch = useDispatch();
    const [apiError, setApiError] = useState(null);  
    const [login, { isLoading, isError, error, data }] = useLoginMutation(); 

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

            <TextInput
                label="Registered Mobile Number"
                value={NumberFormik.values.mobile}
                onChangeText={handleChangeText}  
                onBlur={handleBlur}  
                mode="outlined"
                maxLength={10}
                minLength={10}
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

            <Button mode="contained" label={"Login Using OTP"} onPress={() => NumberFormik.handleSubmit()} style={{marginTop: 8}}/>

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
    MobileInput: {
        backgroundColor: 'white'
    },

});
