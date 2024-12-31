import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import DigitalIndia from "../src/assets/images/logo/DigitalIndia.svg";
import National from "../src/assets/images/National-Emblem.svg";
import Nhai from "../src/assets/images/NHAI.svg";
import { useSelector } from "react-redux";

export default function Index() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const {isAuthorized} = useSelector(state => state.auth)
  const authorised = true;
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setTimeout(() => {
        setShowSplash(false);
        if (isAuthorized) {
          router.push("/dashboard");
        }else{
          router.push("/auth");
        }
      }, 3000);
    }
  }, [isMounted, authorised]);

  return (
    // Conditional rendering based on `showSplash`
    showSplash && (
      <View style={styles.container}>
        <ImageBackground
          source={require('../src/assets/images/logo/form-bg.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.containerLog}>
            <View style={styles.logos}>
              <National width={60} height={45} />
              <Nhai width={60} height={45} />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.subtitle}>DataLake 3.0</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.poweredBy}>Powered by</Text>
            <DigitalIndia width={90} height={45} />
          </View>
        </ImageBackground>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLog: {
    position: 'absolute',
    top: 140,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logos: {
    flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    position: 'absolute',
    top: 200,
    left: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Inter-Black',
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    width: '100%',
    padding: 10,
  },
  poweredBy: {
    color: '#adadad',
    fontSize: 11,
  },
});
