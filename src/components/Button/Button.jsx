import React from "react";
import { StyleSheet, View } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { colors } from "@/src/utils/colorCode";

const Button = ({ mode = "contained", onPress, label, style }) => {
  const dynamicRippleColorcontainer = "rgba(255, 255, 255, 0.5)";
  const dynamicRippleOutline = "rgba(16, 70, 133, 0.5)";

  return (
    <View>
      <PaperButton
        onPress={onPress}
        style={[mode === "contained" ? styles.buttoncontainer : styles.buttonOutline,style]          
        }
        labelStyle={
          mode === "contained" ? styles.containerlabel : styles.outlineLabel
        }
        rippleColor={
          mode === "contained"
            ? dynamicRippleColorcontainer
            : dynamicRippleOutline
        }
      >
        {label}
      </PaperButton>
    </View>
  );
};
export default Button;

const styles = StyleSheet.create({
  buttoncontainer: {
    width: "20.75rem",
    height: "3rem",
    maxWidth: "100%",
    backgroundColor: colors.brand500,
  },
  containerlabel: {
    color: colors.gray000,
  },
  buttonOutline: {
    width: "20.75rem",
    height: "3rem",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.brand500,
    borderStyle: "solid",
    borderRadius: 50,
  },
  outlineLabel: {
    color: colors.brand500,
  },
});
