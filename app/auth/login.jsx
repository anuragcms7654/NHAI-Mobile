import { StyleSheet, Text, View } from "react-native";
import { Card, Divider } from "react-native-paper";
import NumberForm from "@/src/components/NumberForm/NumberForm";
import DigitalIndia from "../../src/assets/images/logo/DigitalIndia.svg";
import React, { useEffect, useState } from "react";
import { updateMobileNumber } from "@/src/store/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useSendotpMutation,
} from "../../src/store/apiQuery/authApi";
import OTPForm from "@/src/components/OTPForm/OTPForm";
import useCountdown from "../../src/hooks/useCountdown";
import Header from "@/src/components/Header/Header";
import Button from "../../src/components/Button/Button";
import { useRouter } from "expo-router";
import { Link } from "@react-navigation/native";
// import  useDeviceID from "../../src/hooks/useDeviceId"
import { envConfig } from "@/src/config/encryption";

const Login = () => {
  const [sentotp, setsendotp] = useState(false);
  const [showNumberForm, setShowNumberForm] = useState(true);
  const dispatch = useDispatch();
  const { mobileNumber } = useSelector((state) => state?.auth);
  const [login, { isLoading, isError, error, data }] = useLoginMutation();
  const { restart, formattedTime, timeLeft } = useCountdown(3);
  const [firstRender, setFirstRender] = useState(false);
  const router = useRouter();
  const [inputValue, setInputValue] = useState(mobileNumber || "");
  // const deviceid = useDeviceID();
  console.log(envConfig.REACT_NATIVE_CLIENT_ID);

  useEffect(() => {
    setInputValue(mobileNumber || "");
  }, [mobileNumber]);

  const handleButtonPress = () => {
    console.log("Input Value:", inputValue);
    router.push("/auth/signup");
  };

  const getMobileData = async (data) => {
    dispatch(updateMobileNumber(data));
    console.log(data);
    try {
      const result = await login({ mobile_number: data }).unwrap();
      if (result.status === "success") {
        setsendotp(true);
        setShowNumberForm(false);
        restart();
      }
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  useEffect(() => {
    if (firstRender) dispatch(updateMobileNumber(""));
    setFirstRender(true);
  }, [firstRender]);

  const handleBackToNumberForm = () => {
    setsendotp(false);
    setShowNumberForm(true);
  };

  const handleResend = async () => {
    try {
      const result = await login({ mobile_number: mobileNumber }).unwrap();
      if (result.status === "success") {
        restart();
      } else {
        console.log("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP Failed:", error);
    }
  };

  // Initialize send OTP mutation
  const [
    sendOtp,
    { isLoading: loadingotp, error: errorApi, data: verifyResData },
  ] = useSendotpMutation();

  const SubmitOtpForm = (mobile, otpString) => {
    sendOtp({ mobile_number: mobile, otp: otpString });
  };

  return (
    <View style={styles.container}>
      <Header />

      <Card style={styles.LoginCardContainer}>
        <Card.Content style={styles.LoginCardContent}>
          {showNumberForm ? (
            <>
              <Text style={styles.headerText}>Login</Text>
              <NumberForm
                getMobileData={getMobileData}
                mobileNumber={mobileNumber}
              />

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
                label={"Signup"}
              />

              <View style={styles.TroubleContainer}>
                <Text style={styles.Troubletext}>
                  Having trouble logging in ?
                </Text>
                <Link style={styles.linkText}>Get Help</Link>
              </View>
            </>
          ) : (
            <OTPForm
              mobile={mobileNumber}
              refreshTrigger={sentotp}
              onBack={handleBackToNumberForm}
              formattedTime={formattedTime}
              timeLeft={timeLeft}
              onResend={handleResend}
              SubmitOtpForm={SubmitOtpForm}
              loadingotp={loadingotp}
              errorApi={errorApi}
              verifyResData={verifyResData}
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
  headerText: {
    fontFamily: "Inter-Black",
    fontSize: 30,
    marginBottom: 20,
    marginTop: 15,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    width: "30%",
    alignSelf: "center",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#777877",
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#777877",
    fontWeight: "bold",
  },
  DontHaveView: {
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  DontHaveText: {
    fontSize: 16,
    color: "#777877",
  },
  TroubleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  Troubletext: {
    color: "#777877",
    fontSize: 12,
  },
  linkText: {
    color: "#104685",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
