import React from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";

const { width } = Dimensions.get("window");

interface TankData {
  id: string;
  name: string;
  percentage: number;
  capacity: string;
  temperature: string;
  currentVolume: number;
}

interface TanksSectionProps {
  upperTanks: TankData[];
  mainTank: TankData;
  currentUpperTankIndex: number;
  setCurrentUpperTankIndex: (index: number) => void;
}

const TanksSection: React.FC<TanksSectionProps> = ({
  upperTanks,
  mainTank,
  currentUpperTankIndex,
  setCurrentUpperTankIndex,
}) => {
  // Helper function to get tank status
  const getTankStatus = (percentage: number) => {
    if (percentage < 20) return { label: "Low", color: Colors.statusCritical };
    if (percentage < 40) return { label: "Medium", color: Colors.statusWarning };
    return { label: "Good", color: Colors.statusSuccess };
  };
  const renderWaterTank = (tank: TankData, isMainTank: boolean = false) => {
    return (
      <View style={[styles.tankCard, isMainTank && styles.mainTankCard]}>
        <View style={styles.tankContent}>
          {isMainTank && <Text style={styles.tankTitle}>{tank.name}</Text>}

          {/* Tank section with percentage on the right */}
          <View style={styles.tankSection}>
            {/* Water Tank Visualization */}
            <View style={styles.tankContainer}>
              <View style={styles.tankBody}>
                {/* Water level with static height */}
                <View
                  style={[
                    styles.waterLevel,
                    {
                      height: (tank.percentage / 100) * 80,
                      backgroundColor: "#4A90E2",
                    },
                  ]}
                />
                {/* Tank outline */}
                <View style={styles.tankOutline} />
              </View>
            </View>

            {/* Percentage moved to the right */}
            <View style={styles.percentageContainer}>
              <Text style={styles.tankPercentage}>{tank.percentage}%</Text>
            </View>
          </View>

          {/* Tank details */}
          <View style={styles.tankDetails}>
            <Text style={styles.tankDetailText}>
              {tank.currentVolume.toLocaleString()} L
            </Text>
            <Text style={styles.tankDetailText}>{tank.temperature}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderUpperTankContent = ({
    item,
    index,
  }: {
    item: TankData;
    index: number;
  }) => {
    return (
      <View style={styles.swipeableContent}>
        {/* Tank section with percentage on the right */}
        <View style={styles.tankSection}>
          {/* Water Tank Visualization */}
          <View style={styles.tankContainer}>
            <View style={styles.tankBody}>
              {/* Water level with static height */}
              <View
                style={[
                  styles.waterLevel,
                  {
                    height: (item.percentage / 100) * 80,
                    backgroundColor: "#4A90E2",
                  },
                ]}
              />
              {/* Tank outline */}
              <View style={styles.tankOutline} />
            </View>
          </View>

          {/* Percentage moved to the right */}
          <View style={styles.percentageContainer}>
            <Text style={styles.tankPercentage}>{item.percentage}%</Text>
          </View>
        </View>

        {/* Tank details */}
        <View style={styles.tankDetails}>
          <Text style={styles.tankDetailText}>
            {item.currentVolume.toLocaleString()} L
          </Text>
          <Text style={styles.tankDetailText}>{item.temperature}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <View style={styles.tanksContainer}>
        {/* Upper Tanks with Swipe */}
        <View style={styles.upperTanksContainer}>
          {/* Static Tank Card Container */}
          <View style={styles.staticTankCard}>
            {/* Static Upper Tank Title */}
            <Text style={styles.staticTankTitle}>Upper Tank</Text>

            {/* Swipeable Tank Content Only */}
            <View style={styles.swipeableArea}>
              <FlatList
                data={upperTanks}
                renderItem={renderUpperTankContent}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={width * 0.45}
                decelerationRate="fast"
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(
                    event.nativeEvent.contentOffset.x / (width * 0.45)
                  );
                  setCurrentUpperTankIndex(index);
                }}
                style={styles.upperTanksList}
                // Platform-specific props for better mobile performance
                removeClippedSubviews={Platform.OS !== "web"}
                getItemLayout={(data, index) => ({
                  length: width * 0.45,
                  offset: width * 0.45 * index,
                  index,
                })}
              />
            </View>

            {/* Static Page Indicators */}
            <View style={styles.staticPageIndicators}>
              {upperTanks.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.pageIndicator,
                    currentUpperTankIndex === i && styles.activePageIndicator,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Main Tank */}
        <View style={styles.mainTankContainer}>
          {renderWaterTank(mainTank, true)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  tanksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Center tanks vertically
    // Remove fixed height to allow flexible sizing
    // Platform-specific height handling
    ...(Platform.OS === "web" && {
      minHeight: 250, // Ensure consistent height on web
    }),
  },
  upperTanksContainer: {
    width: (width - 48) / 2,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  staticTankCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    width: "100%",
    minHeight: 250,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Platform-specific adjustments
    ...(Platform.OS === "web" && {
      height: 250,
    }),
  },
  swipeableArea: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  swipeableContent: {
    width: width * 0.45,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  upperTanksList: {
    width: "100%",
    height: "100%",
  },

  mainTankContainer: {
    width: (width - 48) / 2,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally as well
  },
  tankCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    width: "100%",
    minHeight: 200, // Reduced height since no title inside for upper tanks
    alignItems: "center",
    justifyContent: "center", // Center content vertically within the card
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Platform-specific adjustments
    ...(Platform.OS === "web" && {
      height: 200, // Fixed height for web consistency
    }),
  },
  mainTankCard: {
    minHeight: 250, // Main tank keeps larger height for title
    ...(Platform.OS === "web" && {
      height: 250, // Fixed height for web consistency
    }),
  },
  tankContent: {
    flex: 1,
    justifyContent: "center", // Center all content vertically
    alignItems: "center", // Center all content horizontally
    width: "100%",
  },
  tankTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  staticTankTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  tankSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    width: "100%",
  },
  tankContainer: {
    position: "relative",
    alignItems: "center",
    marginRight: 8,
  },
  percentageContainer: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 50,
  },
  tankBody: {
    width: 60,
    height: 80,
    borderWidth: 2,
    borderColor: Colors.wiloGreen,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
  tankOutline: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: Colors.wiloGreen,
    borderRadius: 6,
  },
  waterLevel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  tankPercentage: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  tankDetails: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    width: "100%",
  },
  tankDetailText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
    textAlign: "center",
  },
  pageIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  staticPageIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    width: "100%",
  },
  pageIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.grey,
    marginHorizontal: 3,
  },
  activePageIndicator: {
    backgroundColor: Colors.wiloGreen,
  },
});

export default TanksSection;
