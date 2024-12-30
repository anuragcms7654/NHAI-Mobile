import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-paper';
import NumberForm from '@/src/components/NumberForm/NumberForm';
import DigitalIndia from "../../src/assets/images/logo/DigitalIndia.svg";
import React, { useEffect, useState } from 'react'
import { updateMobileNumber } from '@/src/store/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../src/store/apiQuery/authApi'
import OTPCard from '@/src/components/OTPForm/OTPCard';

const login = () => {
    const [sentotp, setsendotp] = useState(false);
    const dispatch = useDispatch();
    const { mobileNumber } = useSelector(state => state?.auth);
    const [login, { isLoading, isError, error, data }] = useLoginMutation();
    const getMobileData = async (data) => {
        dispatch(updateMobileNumber(data))
        try {
            const result = await login({ mobile: 9898989898, password: "12345" }).unwrap();
            if (result.status === 'success') {
                setsendotp(true);
            }
        } catch (err) {
            console.error('Login Failed:', err);
        }
    }

    return (
        <Card style={styles.LoginCardContainer}>
            <Text>{mobileNumber}</Text>
                    {/* <OTPForm /> */}
            <Card.Content style={styles.LoginCardContent}>
                {/* {!sentotp ? ( */}
                    {/* <OTPForm /> */}
                    <OTPCard/>
                    {/* ) : (
                    <NumberForm getMobileData={getMobileData} />
                    )} */}
            </Card.Content>
            <View style={[styles.LoginFooter]}>
                <Text style={styles.LoginFooterText}>Powered by </Text>
                {/* <DigitalIndia width={70} height={35} /> */}
            </View>
        </Card>
    )
}

export default login

const styles = StyleSheet.create({
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    LoginFooterText: {
        color: '#adadad', fontSize: 10
    },
})