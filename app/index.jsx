import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";


export default function Index() {
  const [isMounted, setIsMounted] = useState(false); // Track layout mount state
  const authorised = true; // Example condition
  const router = useRouter();

  useEffect(() => {
    // Mark as mounted to avoid navigation errors
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Navigate only after the layout has mounted
    if (isMounted && authorised) {
      router.push("/auth");
    }
    
  }, [isMounted, authorised]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      {/* <Link href ="/auth/login" style={styles.button}>
        Go to About screen
      </Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
