import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, Avatar, Card, Paragraph } from 'react-native-paper';

export default function _layout() {
  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="NHAI One" style={styles.appBarContent} />
        <Avatar.Image
          size={36}
          source={{ uri: 'https://placehold.co/36x36' }} // Placeholder for profile image
          style={styles.avatar}
        />
      </Appbar.Header>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome, Nitin Kumar</Text>
        <Text style={styles.subtitle}>
          You have been invited to join <Text style={styles.boldText}>Team NHAI</Text>
        </Text>
      </View>

      {/* Grid Section (Dynamic Expansion) */}
      <View style={styles.gridSection}>
        {Array.from({ length: 15 }).map((_, index) => (
          <Card key={index} style={[styles.card, styles.gridCard]}>
            <Card.Content>
              <View style={styles.skeleton} />
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.navCircle} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the entire screen
    backgroundColor: '#F5F5F5',
    width: '100%', // Set the width of the container to 100%
    paddingHorizontal: 0, // Remove left and right padding
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
  },
  appBarContent: {
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  welcomeSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
  },
  boldText: {
    fontWeight: 'bold',
  },
  gridSection: {
    flex: 1, // Ensures the grid section takes up the remaining space
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: 0, // Remove padding from the grid section
    width: '100%', // Set grid to 100% width
  },
  card: {
    width: '30%', // Ensure cards take up 30% of the width of the container
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    margin: 8, // Space between each card
  },
  gridCard: {
    marginBottom: 16, // Space between grid cards
  },
  skeleton: {
    width: 48,
    height: 48,
    backgroundColor: '#D0D0D0',
    borderRadius: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D0D0D0',
  },
});
