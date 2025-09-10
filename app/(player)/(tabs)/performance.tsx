import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Platform } from 'react-native';
import { Scale, Activity, Moon, Droplet, Dumbbell, Timer, Pizza, LineChart as ChartLine, Heart, Trophy, Target, Brain } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';

export default function Performance() {
  const [player, setPlayer] = useState(null);
  const [bmi, setBmi] = useState({ weight: '', height: '', result: null });
  const [calories, setCalories] = useState({ burned: 2500, consumed: 2000 });
  const [sleep, setSleep] = useState({ hours: 7.5, quality: 'Good' });
  const [water, setWater] = useState({ glasses: 6, target: 8 });
  const [heartRate, setHeartRate] = useState({ current: 72, max: 180, min: 60 });
  const [matchStats, setMatchStats] = useState({
    goalsScored: 12,
    assists: 8,
    matchesPlayed: 15,
    winRate: 75
  });
  const [fitnessScore, setFitnessScore] = useState({
    overall: 85,
    stamina: 80,
    strength: 75,
    speed: 85,
    agility: 90
  });
  const [mentalStats, setMentalStats] = useState({
    focus: 85,
    decisionMaking: 80,
    teamwork: 90,
    leadership: 75
  });
  const [performanceData, setPerformanceData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [65, 70, 68, 72, 69, 74, 71],
    }],
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const playerData = JSON.parse(localStorage.getItem('player') || 'null');
      if (!playerData) {
        router.replace('/(auth)/player');
      }
      setPlayer(playerData);
    }
  }, []);

  const calculateBMI = () => {
    const weight = parseFloat(bmi.weight);
    const height = parseFloat(bmi.height) / 100;
    if (weight && height) {
      const result = weight / (height * height);
      setBmi({ ...bmi, result });
    }
  };

  const addWater = () => {
    setWater(prev => ({ ...prev, glasses: Math.min(prev.glasses + 1, prev.target) }));
  };

  if (!player) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please login to view your performance data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Scale size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>BMI Calculator</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={bmi.weight}
              onChangeText={(text) => setBmi({ ...bmi, weight: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={bmi.height}
              onChangeText={(text) => setBmi({ ...bmi, height: text })}
            />
            <Pressable style={styles.button} onPress={calculateBMI}>
              <Text style={styles.buttonText}>Calculate BMI</Text>
            </Pressable>
            {bmi.result && (
              <View style={styles.bmiResult}>
                <Text style={styles.result}>Your BMI: {bmi.result.toFixed(1)}</Text>
                <Text style={styles.bmiCategory}>
                  {bmi.result < 18.5 ? 'Underweight' :
                   bmi.result < 25 ? 'Normal weight' :
                   bmi.result < 30 ? 'Overweight' : 'Obese'}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Heart size={24} color="#EF4444" />
            <Text style={styles.cardTitle}>Heart Rate Monitor</Text>
          </View>
          <View style={styles.heartRateStats}>
            <Text style={styles.currentHeartRate}>{heartRate.current} BPM</Text>
            <View style={styles.heartRateRange}>
              <Text style={styles.rangeText}>Min: {heartRate.min}</Text>
              <Text style={styles.rangeText}>Max: {heartRate.max}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Activity size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>Calorie Tracker</Text>
          </View>
          <View style={styles.stats}>
            <View style={styles.calorieBar}>
              <View style={[styles.calorieFill, { width: `${(calories.burned / 3000) * 100}%` }]} />
            </View>
            <Text style={styles.stat}>Burned: {calories.burned} kcal</Text>
            <Text style={styles.stat}>Consumed: {calories.consumed} kcal</Text>
            <Text style={[styles.stat, styles.netCalories]}>
              Net: {calories.burned - calories.consumed} kcal
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Trophy size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>Match Statistics</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{matchStats.goalsScored}</Text>
              <Text style={styles.statLabel}>Goals</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{matchStats.assists}</Text>
              <Text style={styles.statLabel}>Assists</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{matchStats.matchesPlayed}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{matchStats.winRate}%</Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Moon size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>Sleep Tracker</Text>
          </View>
          <View style={styles.stats}>
            <View style={styles.sleepQualityBar}>
              <View style={[styles.sleepQualityFill, { width: '75%' }]} />
            </View>
            <Text style={styles.stat}>Hours: {sleep.hours}</Text>
            <Text style={styles.stat}>Quality: {sleep.quality}</Text>
            <Text style={styles.sleepAdvice}>
              Recommended: 7-9 hours of sleep per night
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Target size={24} color="#059669" />
            <Text style={styles.cardTitle}>Fitness Score</Text>
          </View>
          <View style={styles.fitnessContainer}>
            <Text style={styles.overallScore}>{fitnessScore.overall}</Text>
            <View style={styles.fitnessMetrics}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Stamina</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${fitnessScore.stamina}%` }]} />
                </View>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Strength</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${fitnessScore.strength}%` }]} />
                </View>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Speed</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${fitnessScore.speed}%` }]} />
                </View>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Agility</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${fitnessScore.agility}%` }]} />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Droplet size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>Water Intake</Text>
          </View>
          <View style={styles.waterTracker}>
            <Text style={styles.stat}>{water.glasses} / {water.target} glasses</Text>
            <View style={styles.waterProgress}>
              <View 
                style={[
                  styles.waterProgressFill, 
                  { width: `${(water.glasses / water.target) * 100}%` }
                ]} 
              />
            </View>
            <Pressable style={styles.button} onPress={addWater}>
              <Text style={styles.buttonText}>Add Glass</Text>
            </Pressable>
            <Text style={styles.waterAdvice}>
              Target: 2L (8 glasses) per day
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(900)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Brain size={24} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Mental Performance</Text>
          </View>
          <View style={styles.mentalStats}>
            {Object.entries(mentalStats).map(([key, value]) => (
              <View key={key} style={styles.mentalMetric}>
                <Text style={styles.mentalLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                <View style={styles.mentalProgress}>
                  <View style={[styles.mentalProgressFill, { width: `${value}%` }]} />
                  <Text style={styles.mentalValue}>{value}%</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1000)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Dumbbell size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>Workout Summary</Text>
          </View>
          <View style={styles.workoutStats}>
            <View style={styles.workoutStat}>
              <Timer size={20} color="#9CA3AF" />
              <Text style={styles.stat}>{workout.minutes} minutes</Text>
            </View>
            <View style={styles.exercises}>
              {workout.exercises.map((exercise, index) => (
                <View key={index} style={styles.exercise}>
                  <Text style={styles.exerciseText}>{exercise}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.workoutAdvice}>
              Recommended: 30-60 minutes of exercise daily
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1200)} style={styles.card}>
          <View style={styles.cardHeader}>
            <ChartLine size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>Weekly Progress</Text>
          </View>
          {Platform.OS === 'web' ? (
            <View style={styles.chartContainer}>
              <LineChart
                data={performanceData}
                width={320}
                height={200}
                chartConfig={{
                  backgroundColor: '#1E3A8A',
                  backgroundGradientFrom: '#1E3A8A',
                  backgroundGradientTo: '#1E3A8A',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={styles.chart}
              />
            </View>
          ) : (
            <Text style={styles.chartPlaceholder}>
              Performance chart available on web platform
            </Text>
          )}
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  inputGroup: {
    gap: 12,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  button: {
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  bmiResult: {
    alignItems: 'center',
    marginTop: 12,
  },
  result: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  bmiCategory: {
    color: '#F59E0B',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  stats: {
    gap: 12,
  },
  stat: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  netCalories: {
    fontFamily: 'Inter-Bold',
    color: '#059669',
  },
  calorieBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  calorieFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  sleepQualityBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  sleepQualityFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 4,
  },
  sleepAdvice: {
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 8,
  },
  waterTracker: {
    alignItems: 'center',
    gap: 12,
  },
  waterProgress: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  waterProgressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  waterAdvice: {
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  workoutStats: {
    gap: 16,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exercises: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exercise: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  exerciseText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  workoutAdvice: {
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartPlaceholder: {
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  heartRateStats: {
    alignItems: 'center',
    padding: 20,
  },
  currentHeartRate: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#EF4444',
  },
  heartRateRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  rangeText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#F59E0B',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
  },
  fitnessContainer: {
    alignItems: 'center',
    padding: 20,
  },
  overallScore: {
    fontSize: 64,
    fontFamily: 'Inter-Bold',
    color: '#059669',
    marginBottom: 24,
  },
  fitnessMetrics: {
    width: '100%',
    gap: 16,
  },
  metricItem: {
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 4,
  },
  mentalStats: {
    padding: 16,
    gap: 16,
  },
  mentalMetric: {
    marginBottom: 12,
  },
  mentalLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  mentalProgress: {
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mentalProgressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
  },
  mentalValue: {
    position: 'absolute',
    right: 8,
    top: 4,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});