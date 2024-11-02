import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Animated,
  GestureResponderEvent,
} from "react-native";

const MemberSelectionApp = () => {
  const [touchPoints, setTouchPoints] = useState(new Map());
  const [selectedPoints, setSelectedPoints] = useState(new Map());
  const [pointCount, setPointCount] = useState(1);

  const handleTouchStart = (event) => {
    const touch = event.nativeEvent;
    const newTouchPoints = new Map(touchPoints);

    // Generate a unique ID using timestamp
    const touchId = Date.now().toString();

    newTouchPoints.set(touchId, {
      x: touch.pageX,
      y: touch.pageY - 70, // Adjust for top section height
      timestamp: Date.now(),
      count: pointCount,
    });

    setTouchPoints(newTouchPoints);
    setPointCount((prev) => prev + 1);
  };

  const handleSelection = () => {
    if (touchPoints.size > 0) {
      // Convert touchPoints Map to array for random selection
      const touchPointsArray = Array.from(touchPoints.entries());
      const randomIndex = Math.floor(Math.random() * touchPointsArray.length);
      const [selectedId, selectedPoint] = touchPointsArray[randomIndex];

      // Update selected points
      const newSelectedPoints = new Map(selectedPoints);
      newSelectedPoints.set(selectedId, {
        ...selectedPoint,
        isSelected: true,
      });
      setSelectedPoints(newSelectedPoints);

      // Remove selected point from touch points
      const newTouchPoints = new Map(touchPoints);
      newTouchPoints.delete(selectedId);
      setTouchPoints(newTouchPoints);
    }
  };

  const resetSelection = () => {
    setTouchPoints(new Map());
    setSelectedPoints(new Map());
    setPointCount(1);
  };

  const renderTouchPoint = (
    point,
    key,
    isSelected // Removed parameter types
  ) => (
    <Animated.View
      key={key}
      style={[
        styles.touchPoint,
        {
          left: point.x - 30,
          top: point.y - 30,
          backgroundColor: isSelected ? "#00FF0033" : "#FF000033",
          borderColor: isSelected ? "#00FF00" : "#FF0000",
        },
      ]}
    >
      <Text
        style={[
          styles.pointNumber,
          { color: isSelected ? "#00FF00" : "#FF0000" },
        ]}
      >
        {point.count}
      </Text>
    </Animated.View>
  );

  const renderTouchPoints = () => {
    // Render unselected (red) touch points
    const unselectedPoints = Array.from(touchPoints.entries()).map(
      ([id, point]) => renderTouchPoint(point, `unselected-${id}`, false)
    );

    // Render selected (green) touch points
    const selectedPointsView = Array.from(selectedPoints.entries()).map(
      ([id, point]) => renderTouchPoint(point, `selected-${id}`, true)
    );

    return [...unselectedPoints, ...selectedPointsView];
  };

  return (
    <View style={styles.container}>
      {/* Touch Area */}
      <TouchableOpacity
        style={styles.touchArea}
        onPress={handleTouchStart}
        activeOpacity={1}
      >
        {renderTouchPoints()}
      </TouchableOpacity>

      {/* Status Section */}
      <View style={styles.statusSection}>
        <Text style={styles.statusText}>
          Touch Points: {touchPoints.size} | Selected: {selectedPoints.size}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button1,
              touchPoints.size === 0 && styles.buttonDisabled,
            ]}
            onPress={handleSelection}
            disabled={touchPoints.size === 0}
          >
            <Text style={styles.buttonText1}>Select Random Point</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={resetSelection}>
            <Text style={styles.buttonText2}>Reset</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.instructionText}>
          Tap anywhere on the screen to add points
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: "100%",
  },
  topSection: {
    width: "100%",
    height: 70,
    backgroundColor: "#3c3c3c",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingLeft: 10,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  linkText: {
    fontSize: 18,
    color: "#1E90FF",
    paddingLeft: 20,
  },
  touchArea: {
    flex: 1,
    marginTop: 70,
    backgroundColor: "#000",
  },
  touchPoint: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    pointerEvents: "none",
    justifyContent: "center",
    alignItems: "center",
  },
  pointNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statusSection: {
    width: "100%",
    backgroundColor: "#3c3c3c",
    padding: 16,
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
  },
  button1: {
    backgroundColor: "#2CEE89",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#E54343",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#D0D7DF",
  },
  buttonText1: {
    color: "#000",
    fontSize: 16,
  },
  buttonText2: {
    color: "#fff",
    fontSize: 16,
  },
  instructionText: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
  },
});

export default MemberSelectionApp;
