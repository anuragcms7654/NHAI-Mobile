import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
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