import { Link } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Text, Button, TextInput, Divider } from 'react-native-paper';
import DigitalIndia from "../../src/assets/images/DigitalIndia.png"
import { useFormik } from 'formik';
import { loginSchema } from '../../src/constants/Auth/login'
import { useDispatch, useSelector } from 'react-redux';
import { updateMobileNumber } from '@/src/store/slices/AuthSlice';
import { useRouter } from 'expo-router';

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {mobileNumber} = useSelector(state => state.auth);
  
    const [inputValue, setInputValue] = useState('');

    const handleButtonPress = () => {
        console.log('Input Value:', inputValue);
        router.push('/auth/signup');
    };

    const formik = useFormik({
        initialValues: {
            mobileNumber: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log('Form values:', values);
        },
    });
    
    return (
        <View style={styles.parentContainer}>
            <Card style={styles.card}>
                {/* Card Content */}
                <Card.Content style={styles.cardContent}>
                    <Text variant="titleLarge" style={styles.title}>Login</Text>
                    {/* Text Input */}
                    <TextInput
                        label="Registered Mobile Number"
                        value={formik.values.mobileNumber}
                        onChangeText={(value) => {formik.setFieldValue('mobileNumber', value); ; dispatch(updateMobileNumber(value))}}
                        onBlur={formik.handleBlur('mobileNumber')}
                        mode="outlined"
                        keyboardType="numeric"
                        style={styles.input}
                        theme={{
                            colors: {
                                primary: formik.touched.mobileNumber && formik.errors.mobileNumber ? 'red' : '#104685', // Color for label and outline on focus
                                outline: '#104685', // Outline color
                            },
                        }}
                    />
                    {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                        <Text style={styles.error}>{formik.errors.mobileNumber}</Text>
                    )}

                    {/* Button */}
                    <Button mode="contained" title="Submit" onPress={() => formik.handleSubmit()} style={styles.button}>
                        Login Using OTP
                    </Button>

                    {/* Centered Divider */}
                    <View style={styles.dividerContainer}>
                        <Divider style={styles.divider} />
                        <Text style={styles.dividerText}>OR</Text>
                        <Divider style={styles.divider} />
                    </View>

                    {/* Text Below Divider */}
                    <View style={styles.containerText}>
                        <Text style={styles.text}>Don't have an account?</Text>
                    </View>

                    {/* Signup Button */}
                    <Button
                        mode="outlined"
                        onPress={handleButtonPress}
                        style={styles.outlineButton}
                        labelStyle={styles.buttonText}
                        rippleColor="#104685" // Ripple color same as the outline and button
                    >
                        Signup
                    </Button>

                    {/* Trouble Container */}
                    <View style={styles.TroubleContainer}>
                        <Text style={styles.Troubletext}>Having trouble logging in ?</Text>
                        <Link style={styles.linkText}>Get Help</Link>
                    </View>
                </Card.Content>

                {/* Footer */}
                <View style={styles.footer}>
                    <Image
                        source={DigitalIndia}
                        style={styles.image}
                    />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ECF1F6',
        marginTop: 0,
        padding: 10
    },
    card: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 8,
        elevation: 4,
        minHeight: 502,
        width: 330,
        // Removed padding from here as it is being handled by cardContent
    },
    cardContent: {
        padding: 20, // Added padding to the card content for inner spacing
    },
    title: {
        marginBottom: 20,
        marginTop: 15,
        fontWeight: '900',
        fontSize: 30,
        color: 'black', // Title color
    },
    input: {
        marginBottom: 4,
        backgroundColor: 'white', // Ensure input field has a white background
    },
    button: {
        marginTop: 8,
        borderRadius: 50,
        backgroundColor: '#104685', // Filled button color
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center the divider container horizontally
        marginVertical: 30, // Space above and below the divider
        width: '30%', // Divider container width
        alignSelf: 'center', // Center within the card
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#777877', // Divider color
    },
    dividerText: {
        marginHorizontal: 8, // Space between dividers and text
        color: '#777877', // Text color
        fontWeight: 'bold',
    },
    containerText: {
        marginBottom: 16, // Adjust spacing
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    text: {
        fontSize: 16, // Font size
        color: '#777877',
    },
    outlineButton: {
        marginTop: 8,
        borderColor: '#104685', // Outline color
        borderWidth: 2, // Outline thickness
        borderRadius: 50, // Rounded corners
        marginBottom: 37
    },
    buttonText: {
        color: '#104685', // Outline button text color
        fontWeight: 'bold', // Bold text
    },
    TroubleContainer: {
        flexDirection: 'row', // This ensures the text and link are displayed in a row (inline)
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center', // Vertically center the text and link
        marginTop: 20, // Adjust margin-top as needed
        marginBottom: 30
    },
    Troubletext: {
        color: '#777877', // Text color
        fontSize: 12, // Optional: Adjust font size
    },
    linkText: {
        color: '#104685', // Link color (same as the main color)
        fontSize: 12, // Optional: Adjust font size
        fontWeight: 'bold', // Optional: Make the link text bold
        marginLeft: 5, // Optional: Add some space between the text and the link
    },
    footer: {
        backgroundColor: '#f1f1f1',
        padding: 25,
        marginBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto', // Push the footer to the bottom
        flexShrink: 1, // Allow the footer to shrink if the content area is smaller
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    image: {
        padding: 0,
        width: 120, // Adjust width as needed
        height: 40, // Increased height for the image
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginBottom: 10
    }
});

export default login;