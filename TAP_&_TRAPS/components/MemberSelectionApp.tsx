import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  PanResponder,
  Animated,
  Alert,
} from 'react-native';

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
  isSelected?: boolean;
}

const MemberSelectionApp = () => {
  // State for storing touch points and selections - changed Map key type to string
  const [touchPoints, setTouchPoints] = useState<Map<string, TouchPoint>>(new Map());
  const [selectedPoints, setSelectedPoints] = useState<Map<string, TouchPoint>>(new Map());
  const [isSelecting, setIsSelecting] = useState(false);
  const selectionTimer = useRef<NodeJS.Timeout | null>(null);

  const handleHomePress = () => {
    Linking.openURL('your-home-page-url');
  };

  const makeRandomSelection = () => {
    // Convert touchPoints Map to array for random selection
    const touchPointsArray = Array.from(touchPoints.entries());
    if (touchPointsArray.length > 0) {
      // Randomly select one touch point
      const randomIndex = Math.floor(Math.random() * touchPointsArray.length);
      const [selectedId, selectedPoint] = touchPointsArray[randomIndex];

      // Update selected points
      const newSelectedPoints = new Map(selectedPoints);
      newSelectedPoints.set(selectedId, {
        ...selectedPoint,
        isSelected: true
      });
      setSelectedPoints(newSelectedPoints);

      // Remove selected point from touch points
      const newTouchPoints = new Map(touchPoints);
      newTouchPoints.delete(selectedId);
      setTouchPoints(newTouchPoints);
    }

    // Continue selection if there are remaining touch points
    if (touchPointsArray.length > 1) {
      selectionTimer.current = setTimeout(makeRandomSelection, 1000);
    } else {
      setIsSelecting(false);
      Alert.alert(
        "Selection Complete",
        "All selections have been made!",
        [
          { 
            text: "OK",
            onPress: resetSelection
          }
        ]
      );
    }
  };

  const resetSelection = () => {
    setTouchPoints(new Map());
    setSelectedPoints(new Map());
    setIsSelecting(false);
    if (selectionTimer.current) {
      clearTimeout(selectionTimer.current);
      selectionTimer.current = null;
    }
  };

  const startRandomSelection = () => {
    setIsSelecting(true);
    selectionTimer.current = setTimeout(makeRandomSelection, 1000);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isSelecting,
    onMoveShouldSetPanResponder: () => false,
    
    onPanResponderGrant: (evt) => {
      if (isSelecting) return;

      const touches = evt.nativeEvent.touches;
      const newTouchPoints = new Map(touchPoints);
      
      touches.forEach(touch => {
        // Only add new touch points if not already present
        if (!newTouchPoints.has(touch.identifier.toString()) && 
            !selectedPoints.has(touch.identifier.toString())) {
          newTouchPoints.set(touch.identifier.toString(), {
            x: touch.pageX,
            y: touch.pageY - 70, // Adjust for top section height
            timestamp: Date.now()
          });
        }
      });
      
      setTouchPoints(newTouchPoints);

      // Start random selection if this is the first set of touches
      if (!isSelecting && newTouchPoints.size > 0) {
        startRandomSelection();
      }
    },

    onPanResponderRelease: () => {
      // Optional: Handle touch release if needed
    }
  });

  const renderTouchPoints = () => {
    // Render unselected (red) touch points
    const unselectedPoints = Array.from(touchPoints.values()).map((point, index) => (
      <Animated.View
        key={`unselected-${index}`}
        style={[
          styles.touchPoint,
          {
            left: point.x - 30,
            top: point.y - 30,
            backgroundColor: '#FF000033',
            borderColor: '#FF0000',
          }
        ]}
      />
    ));

    // Render selected (green) touch points
    const selectedPointsView = Array.from(selectedPoints.values()).map((point, index) => (
      <Animated.View
        key={`selected-${index}`}
        style={[
          styles.touchPoint,
          {
            left: point.x - 30,
            top: point.y - 30,
            backgroundColor: '#00FF0033',
            borderColor: '#00FF00',
          }
        ]}
      />
    ));

    return [...unselectedPoints, ...selectedPointsView];
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <TouchableOpacity onPress={handleHomePress}>
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
      </View>

      {/* Touch Area */}
      <View style={styles.touchArea} {...panResponder.panHandlers}>
        {renderTouchPoints()}
      </View>

      {/* Status Section */}
      <View style={styles.statusSection}>
        <Text style={styles.statusText}>
          Touch Points: {touchPoints.size} | Selected: {selectedPoints.size}
        </Text>
        <Text style={styles.instructionText}>
          {isSelecting 
            ? 'Randomly selecting touched points...' 
            : 'Touch multiple points to begin'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
  },
  topSection: {
    width: '100%',
    height: 70,
    backgroundColor: '#3c3c3c',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 10,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  linkText: {
    fontSize: 18,
    color: '#1E90FF',
    paddingLeft: 20,
  },
  touchArea: {
    flex: 1,
    marginTop: 70,
    backgroundColor: '#000',
  },
  touchPoint: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    pointerEvents: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusSection: {
    width: '100%',
    backgroundColor: '#3c3c3c',
    padding: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  instructionText: {
    color: '#ccc',
    fontSize: 14,
  }
});

export default MemberSelectionApp;