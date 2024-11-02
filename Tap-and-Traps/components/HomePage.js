import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const HomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TAP & TRAPS</Text>
        <Text style={styles.subtitle}>Random Member Selection</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How to Use:</Text>
          <View style={styles.instructionContainer}>
            <Text style={styles.instruction}>
              1. Tap anywhere to add members
            </Text>
            <Text style={styles.instruction}>
              2. Each tap creates a numbered point
            </Text>
            <Text style={styles.instruction}>
              3. Press 'Select' to randomly choose members
            </Text>
            <Text style={styles.instruction}>
              4. Selected members turn green
            </Text>
            <Text style={styles.instruction}>5. Use 'Reset' to start over</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("MemberSelect")}
          style={styles.startButton}
          accessible={true}
          accessibilityLabel="Start Member Selection"
        >
          <Text style={styles.startButtonText}>Start Selection</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white for readability
  },
  header: {
    backgroundColor: "#000",
    padding: 10,
    alignItems: "center",
    paddingTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10, // for Android shadow effect
  },
  title: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  instructionContainer: {
    gap: 10,
  },
  instruction: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
});

export default HomePage;
