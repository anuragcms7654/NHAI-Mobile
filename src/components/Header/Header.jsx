import React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, StyleSheet, SafeAreaView, View } from 'react-native';
import National from "../../assets/images/logo/National-Emblem.svg";
import Nhai from "../../assets/images/logo/NHAI.svg";

// import { StatusBar } from 'react-native';
// import { Ionicons } from 'react-native-vector-icons'; // Optional: To show notification icon or any icon

const Header = ({ logoSource }) => {
  return (
      <Appbar.Header style={styles.header}>
        <Appbar.Action 
          icon="menu" 
          style={styles.MenuIcon} 
        />
        <National width={40} height={30}/>
        <Nhai width={40} height={30}/>
        <Appbar.Content 
          title={<Image source={logoSource} style={styles.logo} />}
          subtitle="App Subtitle" 
        />
      </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0, 
    backgroundColor: '#ECF1F6',
  },
  header: {
    backgroundColor: '#ECF1F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: '13%',  
    height: 25,
    resizeMode: 'contain', 
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  MenuIcon: {
    width: 30,
    height: 25,
    resizeMode: 'contain',
  },
  notificationIconContainer: {
    position: 'absolute',
    right: 10, // Adjust position for the icon
    top: 10, // Adjust top margin
  },
});

export default Header;
