import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import DigitalIndia from "../../assets/images/logo/DigitalIndia.svg";
import NumberForm from '../NumberForm/NumberForm';
import OTPForm from '../OTPForm/OTPForm';


const LoginCard = () => {
  return (

    <Card style={styles.LoginCardContainer}>
      <Card.Content style={styles.LoginCardContent}>
            <NumberForm/>
            {/* <OTPForm/> */}

      </Card.Content>
      <View style={[styles.LoginFooter]}>
            <Text style={styles.LoginFooterText}>Powered by </Text>
            <DigitalIndia width={70} height={35} />
       </View>
    </Card>

  );
};

export default LoginCard;

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
    color:'#adadad', fontSize:10
  },

});
