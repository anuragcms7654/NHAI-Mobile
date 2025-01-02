import React, { useEffect, useState } from "react";
import Header from "@/src/components/Header/Header";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import DigitalIndia from "../../src/assets/images/logo/DigitalIndia.svg";
import DynamicTextInput from "@/src/components/DynamicTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fontWeights } from "@/src/utils/colorCode";
import Button from "@/src/components/Button/Button";
import { useRouter } from "expo-router";
import SapDetails from "@/src/features/SapDetails/index";
import OTPForm from "@/src/components/OTPForm/OTPForm";
import { useFormik } from "formik";
import { SapInitial, SapSchema } from "@/src/features/SapDetails/SapSchema";
import {useSapDetailMutation} from "@/src/store/apiQuery/authApi"
import { useDispatch, useSelector } from "react-redux";
import {updateSapId, updateSapDetails} from "../../src/store/slices/_Permanent_Reg_Slice"


const Signup = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [sapid, setSapId] = useState(SapInitial.sapidState);
  const [sapotp, setSapOtp] = useState(SapInitial.sapOtpState);
  const dispatch = useDispatch();
  const [sapApi,{ isLoading: loadingsap, error: errorSapApi, data: SapResData, isSuccess:isSuccessSap },] = useSapDetailMutation();
  
   useEffect(()=>{
    if(isSuccessSap){
      setSapId(!isSuccessSap)
    }
    dispatch(updateSapDetails(SapResData?.data))
   },[loadingsap,errorSapApi,SapResData])

  const sapFormik = useFormik({
    initialValues: {
      sapid: SapInitial.SapInitialValue,
    },
    validationSchema: SapSchema,
    onSubmit: async (values) => {
      dispatch(updateSapId(values?.sapid))
      try {
          await sapApi({sap_id: values?.sapid});
      } catch (error) {
          console.error('Login Failed------:', error);
          setApiError("Failed to login. Please check your mobile number or try again."); 
      }
  }
  });

  const OpenSapDiv = () => {
    setSapId(true);
  };

  const GoBackLogin = () => {
    router.push("/auth/login");
  };

  const handleSapResponseVerify = ()=>{
    setSapOtp(!SapInitial.sapOtpState); 
  }

  return (
    <View style={styles.container}>
      <Header />
      <Card style={styles.LoginCardContainer}>
        <Card.Content style={styles.LoginCardContent}>
          <View style={styles.backButton}>
            {sapid ? (
              <MaterialCommunityIcons
                name="arrow-left"
                size={32}
                onPress={GoBackLogin}
                color="black"
                style={{ marginTop: "156px", marginLeft: "40px" }}
              />
            ) : (
              <MaterialCommunityIcons
                name="arrow-left"
                size={32}
                onPress={OpenSapDiv}
                color="black"
                style={{ marginTop: "156px", marginLeft: "40px" }}
              />
            )}
          </View>

          <View style={styles.header}>
            <Text style={styles.headerText}>Sign Up</Text>
          </View>

          {/* SAP ID Section */}
          {sapid ? (
            <>
              <DynamicTextInput
                label="SAP/Employee ID"
                value={sapFormik.values.sapid}
                onChangeText={sapFormik.handleChange("sapid")}
                onBlur={sapFormik.handleBlur("sapid")}
                error={sapFormik.touched.sapid && sapFormik.errors.sapid}
                maxLength={8}
              />
              <View>
                <Text style={styles.DontSapText}>
                  I don’t have a SAP/Employee ID
                </Text>
              </View>
              <Button
                mode="contained"
                label={"Proceed"}
                onPress={sapFormik.handleSubmit}
                disabled={!sapFormik.isValid || sapFormik.isSubmitting || loadingsap}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
            </>
          ) : (
            <>
              <Text style={styles.subText}>
                We have found an account with SAP ID/Employee ID{" "}
                <Text style={styles.sapidHighlight}>{SapResData?.data?.sap_id}</Text>
              </Text>
              <View>
                <SapDetails 
                sap_id={SapResData?.data?.sap_id} 
                name={SapResData?.data?.name}
                dob={SapResData?.data?.dob}
                mobile_number={SapResData?.data?.mobile_number}
                email_id={SapResData?.data?.email_id}
                designation={SapResData?.data?.designation}
                office_location={SapResData?.data?.office_location} />
                <Button
                  mode="contained"
                  label={"Proceed"}
                  onPress={handleSapResponseVerify}
                  style={{ marginTop: 30, marginBottom: 30 }}
                />
              </View>
            </>
          )}
          {sapotp && <OTPForm/>}
          
        </Card.Content>

        {/* Footer */}
        <View style={styles.LoginFooter}>
          <Text style={styles.LoginFooterText}>Powered by </Text>
          <DigitalIndia width={70} height={35} />
        </View>
      </Card>
    </View>
  );
};

export default Signup;

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
  backButton: {
    alignItems: "flex-start",
    marginBottom: 5,
    marginLeft: -5,
  },
  header: {
    marginBottom: 10,
    width: "332px",
    height: "36px",
    marginTop: "202px",
    marginLeft: "40px",
  },
  headerText: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: "Inter-Black",
  },
  DontSapText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 20,
    color: colors.brand500,
  },
  subText: {
    fontSize: 12,
    padding: 2,
    marginTop: 10,
    fontWeight: "400",
    marginBottom: 10,
  },
  sapidHighlight: {
    fontWeight: "500",
  },
  error: {
    color: colors.errorRed, // Make sure you have error colors defined in your color utils
    fontSize: 12,
    marginTop: 5,
  },
});
