import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
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

interface PumpData {
  isOn: boolean;
  pressure: string;
  flow: string;
}

const Dashboard = () => {
  const [pumpData, setPumpData] = useState<PumpData>({
    isOn: true,
    pressure: "0 bar",
    flow: "0 L/min",
  });

  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isScheduleOn, setIsScheduleOn] = useState(true);
  const [isManualScheduleOn, setIsManualScheduleOn] = useState(false);
  const [currentUpperTankIndex, setCurrentUpperTankIndex] = useState(0);

  // Multiple upper tanks data
  const upperTanks: TankData[] = [
    {
      id: "1",
      name: "Upper tank(s)",
      percentage: 70,
      capacity: "10000 L",
      temperature: "22°C",
      currentVolume: 7000,
    },
    {
      id: "2",
      name: "Upper tank(s)",
      percentage: 85,
      capacity: "8000 L",
      temperature: "21°C",
      currentVolume: 6800,
    },
    {
      id: "3",
      name: "Upper tank(s)",
      percentage: 45,
      capacity: "12000 L",
      temperature: "23°C",
      currentVolume: 5400,
    },
  ];

  // Main tank data
  const mainTank: TankData = {
    id: "main",
    name: "Main tank(s)",
    percentage: 80,
    capacity: "10000 L",
    temperature: "22°C",
    currentVolume: 8000,
  };

  const togglePump = () => {
    setPumpData((prev) => ({ ...prev, isOn: !prev.isOn }));
  };

  const toggleAutoMode = () => {
    const newAutoMode = !isAutoMode;
    setIsAutoMode(newAutoMode);

    // Automatically turn on manual override when switching from auto to manual
    if (!newAutoMode) {
      setIsManualScheduleOn(true);
    }
  };

  const toggleSchedule = () => {
    setIsScheduleOn(!isScheduleOn);
  };

  const toggleManualSchedule = () => {
    setIsManualScheduleOn(!isManualScheduleOn);
  };

  const renderWaterTank = (
    tank: TankData,
    isMainTank: boolean = false,
    showIndicators: boolean = false,
    currentIndex: number = 0
  ) => {
    return (
      <View style={[styles.tankCard, isMainTank && styles.mainTankCard]}>
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

        {/* Progress bar - commented out */}
        {/* <View style={styles.progressContainer}>
          <Progress.Bar
            progress={tank.percentage / 100}
            width={isMainTank ? 140 : 120}
            height={6}
            color={Colors.wiloGreen}
            unfilledColor={Colors.grey}
            borderWidth={0}
            borderRadius={3}
          />
        </View> */}

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Name of the entity where installed pump
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tank Info Cards */}
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
              />
            </View>

            {/* Main Tank */}
            <View style={styles.mainTankContainer}>
              {renderWaterTank(mainTank, true)}
            </View>
          </View>
        </View>

        {/* Pump & Mode Section */}
        <View style={styles.section}>
          <View style={styles.pumpModeContainer}>
            {/* Pump Section */}
            <View style={styles.pumpSection}>
              <View style={styles.pumpHeader}>
                <Image
                  source={require("../assets/images/icons/pump-icon.png")}
                  style={[
                    styles.pumpIcon,
                    {
                      tintColor: pumpData.isOn
                        ? Colors.statusOn
                        : Colors.statusOff,
                    },
                  ]}
                  contentFit="contain"
                />
                <Text style={styles.pumpTitle}>Pump</Text>
              </View>

              <Pressable style={styles.statusButton} onPress={togglePump}>
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: pumpData.isOn ? Colors.statusOn : Colors.statusOff,
                    },
                  ]}
                >
                  {pumpData.isOn ? "ON" : "OFF"}
                </Text>
              </Pressable>

              <View style={styles.pumpDetails}>
                <Text style={styles.pumpDetailLabel}>Pressure</Text>
                <Text style={styles.pumpDetailValue}>{pumpData.pressure}</Text>
                <Text style={styles.pumpDetailLabel}>Flow</Text>
                <Text style={styles.pumpDetailValue}>{pumpData.flow}</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Mode Section */}
            <View style={styles.modeSection}>
              <Text style={styles.modeTitle}>Mode</Text>

              <Pressable style={styles.modeToggle} onPress={toggleAutoMode}>
                <View style={styles.modeIndicator}>
                  <Text style={styles.modeIndicatorText}>A</Text>
                </View>
                <Text style={styles.modeText}>Automatic</Text>
              </Pressable>

              {!isAutoMode && (
                <Text style={styles.manualModeText}>Manual mode active</Text>
              )}
            </View>
          </View>
        </View>

        {/* Schedule Section */}
        <View style={styles.section}>
          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>Schedule</Text>
              <Pressable
                style={[
                  styles.scheduleButton,
                  {
                    backgroundColor: isScheduleOn
                      ? Colors.statusOn
                      : Colors.statusOff,
                  },
                ]}
                onPress={toggleSchedule}
              >
                <Text style={styles.scheduleButtonText}>
                  {isScheduleOn ? "ON" : "OFF"}
                </Text>
              </Pressable>
            </View>

            {isScheduleOn && (
              <View style={styles.scheduleDetails}>
                <Text style={styles.scheduleDetailText}>
                  until 9:00 am (1.20 mins)
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Manual Schedule Toggle */}
        <View style={styles.section}>
          <View style={styles.manualScheduleContainer}>
            <Text style={styles.manualScheduleTitle}>Manual Schedule</Text>
            <Pressable
              style={[
                styles.manualToggle,
                {
                  backgroundColor: isManualScheduleOn
                    ? Colors.statusOn
                    : Colors.grey,
                },
              ]}
              onPress={toggleManualSchedule}
            >
              <View
                style={[
                  styles.toggleDot,
                  {
                    transform: [{ translateX: isManualScheduleOn ? 20 : 2 }],
                    backgroundColor: isManualScheduleOn
                      ? Colors.white
                      : Colors.red,
                  },
                ]}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    backgroundColor: Colors.headerBackground,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    margin: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
  },
  tanksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upperTanksContainer: {
    width: (width - 48) / 2,
  },
  upperTanksList: {
    width: "100%",
  },
  upperTankSlide: {
    width: width * 0.45,
    alignItems: "center",
    // ⚠️ DON'T ADD HEIGHT HERE - it will override tankCard height
    // This container should NOT have a fixed height
  },
  mainTankContainer: {
    width: (width - 48) / 2,
    // ⚠️ DON'T ADD HEIGHT HERE - it will override tankCard height
    // This container should NOT have a fixed height
  },
  tankCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    width: "100%",
    height: 200,
    alignItems: "center",
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainTankCard: {
    // No additional styling - will use same background as upper tanks
  },
  tankTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
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
  progressContainer: {
    alignItems: "center",
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
  pumpModeContainer: {
    flexDirection: "row",
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pumpSection: {
    flex: 1,
    alignItems: "center",
  },
  pumpHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  pumpIcon: {
    width: 24,
    height: 24,
  },
  pumpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  pumpDetails: {
    alignItems: "center",
  },
  pumpDetailLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  pumpDetailValue: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginBottom: 4,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 16,
  },
  modeSection: {
    flex: 1,
    alignItems: "center",
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  modeToggle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  modeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  modeIndicatorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  modeText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  manualModeText: {
    fontSize: 10,
    color: Colors.red,
    textAlign: "center",
  },
  scheduleContainer: {
    backgroundColor: Colors.scheduleBackground,
    borderRadius: 12,
    padding: 16,
  },
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
    flex: 1,
  },
  scheduleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  scheduleButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.white,
  },
  scheduleDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.3)",
  },
  scheduleDetailText: {
    fontSize: 12,
    color: Colors.white,
  },
  manualScheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  manualScheduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  manualToggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Dashboard;
