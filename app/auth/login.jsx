import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import NumberForm from '@/src/components/NumberForm/NumberForm';
import DigitalIndia from "../../src/assets/images/logo/DigitalIndia.svg";
import React, { useEffect, useState } from 'react';
import { updateMobileNumber } from '@/src/store/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useSendotpMutation } from '../../src/store/apiQuery/authApi';
import OTPForm from '@/src/components/OTPForm/OTPForm';
import useCountdown from '../../src/hooks/useCountdown'; 
import Header from '@/src/components/Header/Header';


const Login = () => {
    const [sentotp, setsendotp] = useState(false);
    const [showNumberForm, setShowNumberForm] = useState(true);
    const dispatch = useDispatch();
    const { mobileNumber } = useSelector(state => state?.auth);
    const [login, { isLoading, isError, error, data }] = useLoginMutation();
    const { restart, formattedTime, timeLeft } = useCountdown(3);
    const [firstRender, setFirstRender] = useState(false);

    const getMobileData = async (data) => {
        dispatch(updateMobileNumber(data));
        try {
            const result = await login({ mobile: data }).unwrap();
            if (result.status === 'success') {
                setsendotp(true);
                setShowNumberForm(false);
                restart(); 
            }
        } catch (err) {
            console.error('Login Failed:', err);
        }
    };

    useEffect(() => {
        if (firstRender) dispatch(updateMobileNumber(""));
        setFirstRender(true);
    }, [firstRender])
    

    const handleBackToNumberForm = () => {
        setsendotp(false);
        setShowNumberForm(true);
    };

    const handleResend = async () => {
        try {
            const result = await login({ mobile: mobileNumber }).unwrap();  
            if (result.status === 'success') {
                restart();
            } else {
                console.log('Failed to resend OTP');
            }
        } catch (error) {
            console.error('Resend OTP Failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Header />

            <Card style={styles.LoginCardContainer}>
                <Card.Content style={styles.LoginCardContent}>
                    {showNumberForm ? (
                        <NumberForm getMobileData={getMobileData} mobileNumber={mobileNumber} />
                    ) : (
                        <OTPForm
                            mobile={mobileNumber}
                            refreshTrigger={sentotp}
                            onBack={handleBackToNumberForm}
                            formattedTime={formattedTime}  
                            timeLeft={timeLeft}            
                            onResend={handleResend}        
                        />

                    )}
                </Card.Content>
                <View style={styles.LoginFooter}>
                    <Text style={styles.LoginFooterText}>Powered by </Text>
                    <DigitalIndia width={70} height={35} />
                </View>
            </Card>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF1F6',  
    },
    LoginCardContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '96%',
        alignSelf: 'center',
        marginTop: 10,
        elevation: 2,
    },
    LoginCardContent: {
        padding: 15,
    },
    contentText: {
        fontSize: 16,
        color: '#333',
    },
    LoginFooter: {
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingVertical: 10,
    },
    LoginFooterText: {
        color: '#adadad', 
        fontSize: 10,
    },
});
