import Header from "@/src/components/Header/Header";
import _store from "@/src/store";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Provider } from "react-redux";

export default function RootLayout({ children }) {
  return (
    <Provider store={_store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </Provider>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECF1F6',
    paddingHorizontal: 10,
  },
})
