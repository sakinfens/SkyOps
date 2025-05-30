import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function DutyScreen() {
  const [reportTime, setReportTime] = useState('06:00');
  const [releaseTime, setReleaseTime] = useState('21:00');
  const [dutyTime, setDutyTime] = useState<string | null>(null);
  const [isOverLimit, setIsOverLimit] = useState(false);

  const calculateDutyTime = () => {
    const [reportHours, reportMinutes] = reportTime.split(':').map(Number);
    const [releaseHours, releaseMinutes] = releaseTime.split(':').map(Number);

    let totalMinutes = (releaseHours * 60 + releaseMinutes) - (reportHours * 60 + reportMinutes);
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60; // Add 24 hours if crossing midnight
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    setDutyTime(`${hours}h ${minutes}m`);
    setIsOverLimit(hours > 14 || (hours === 14 && minutes > 0));
  };

  return (
    <ParallaxScrollView
      title="Duty Log"
      headerBackgroundColor={{ light: '#1B3B5A', dark: '#1B3B5A' }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.sectionTitle}>Report Time</ThemedText>
        <TextInput
          style={styles.timeInput}
          value={reportTime}
          onChangeText={setReportTime}
          placeholder="00:00"
          keyboardType="numbers-and-punctuation"
        />

        <ThemedText type="title" style={styles.sectionTitle}>Release Time</ThemedText>
        <TextInput
          style={styles.timeInput}
          value={releaseTime}
          onChangeText={setReleaseTime}
          placeholder="00:00"
          keyboardType="numbers-and-punctuation"
        />

        <Pressable
          onPress={calculateDutyTime}
          style={({ pressed }) => [
            styles.calculateButton,
            pressed && styles.buttonPressed
          ]}>
          <ThemedText style={styles.buttonText}>Calculate Duty Time</ThemedText>
        </Pressable>

        {dutyTime && (
          <ThemedView style={styles.resultContainer}>
            <ThemedText style={styles.dutyTimeText}>
              Duty Time: {dutyTime}
            </ThemedText>
            {isOverLimit && (
              <ThemedText style={styles.warningText}>
                (Over FAA 14hr limit)
              </ThemedText>
            )}
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  timeInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calculateButton: {
    backgroundColor: '#1B3B5A',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  dutyTimeText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  warningText: {
    color: 'red',
    fontSize: 18,
  },
}); 