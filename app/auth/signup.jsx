import React, { useState } from "react";
import Header from "@/src/components/Header/Header";
import { StyleSheet, Text, View } from "react-native";
import { Card, Divider } from "react-native-paper";
import DigitalIndia from "../../src/assets/images/logo/DigitalIndia.svg";
import DynamicTextInput from "@/src/components/DynamicTextInput";  // Ensure correct import

const signup = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name) {
      setError('Name is required');
    } else {
      setError('');
      // Submit logic here
      console.log('Submitted:', name);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Card style={styles.LoginCardContainer}>
        <Card.Content style={styles.LoginCardContent}>
          {/* all required codes */}
          <DynamicTextInput
            label="SAP/Employee ID"
            value={name}
            onChangeText={setName}
            error={error}
          />
        </Card.Content>
        <View style={styles.LoginFooter}>
          <Text style={styles.LoginFooterText}>Powered by </Text>
          <DigitalIndia width={70} height={35} />
        </View>
      </Card>
    </View>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF1F6",
  },
  LoginCardContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "96%",
    alignSelf: "center",
    marginTop: 10,
    elevation: 2,
  },
  LoginCardContent: {
    padding: 15,
  },
  contentText: {
    fontSize: 16,
    color: "#333",
  },
  LoginFooter: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingVertical: 10,
  },
  LoginFooterText: {
    color: "#adadad",
    fontSize: 10,
  },
});
