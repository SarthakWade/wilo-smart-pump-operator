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
  const renderWaterTank = (
    tank: TankData,
    isMainTank: boolean = false,
    showIndicators: boolean = false,
    currentIndex: number = 0
  ) => {
    return (
      <View style={[styles.tankCard, isMainTank && styles.mainTankCard]}>
        <View style={styles.tankContent}>
          <Text style={styles.tankTitle}>{tank.name}</Text>

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

          {/* Page indicators inside tank card */}
          {showIndicators && (
            <View style={styles.pageIndicators}>
              {upperTanks.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.pageIndicator,
                    currentIndex === i && styles.activePageIndicator,
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderUpperTankItem = ({
    item,
    index,
  }: {
    item: TankData;
    index: number;
  }) => {
    return (
      <View style={styles.upperTankSlide}>
        {renderWaterTank(item, false, true, index)}
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <View style={styles.tanksContainer}>
        {/* Upper Tanks with Swipe */}
        <View style={styles.upperTanksContainer}>
          <FlatList
            data={upperTanks}
            renderItem={renderUpperTankItem}
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
    // Remove fixed height to allow tankCard to determine size
  },
  upperTanksList: {
    width: "100%",
  },
  upperTankSlide: {
    width: width * 0.45,
    alignItems: "center",
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
    minHeight: 250, // Use minHeight instead of fixed height for flexibility
    alignItems: "center",
    justifyContent: "center", // Center content vertically within the card
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Platform-specific adjustments
    ...(Platform.OS === "web" && {
      height: 250, // Fixed height for web consistency
    }),
  },
  mainTankCard: {
    // No additional styling - will use same background as upper tanks
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
    textAlign: "left",
  },
  tankSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tankContainer: {
    position: "relative",
    alignItems: "center",
    flex: 1,
  },
  percentageContainer: {
    marginLeft: 16,
    justifyContent: "center",
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
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  tankDetails: {
    alignItems: "center",
    marginBottom: 8,
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
