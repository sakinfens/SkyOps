import { FlatList, Pressable, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { aircraft } from '../data/Aircraftdata';

interface AircraftItem {
  tailNumber: string;
  model: string;
  totalHours: number;
  nextInspectionDue: number;
  status: string;
}

export default function AircraftScreen() {
  const renderItem = ({ item }: { item: AircraftItem }) => (
    <Pressable 
      style={({ pressed }) => [
        styles.itemContainer,
        pressed && styles.itemPressed
      ]}>
      <ThemedView style={styles.itemContent}>
        <ThemedView style={styles.headerRow}>
          <ThemedText style={styles.icon}>🛩️</ThemedText>
          <ThemedText type="subtitle">{item.tailNumber}</ThemedText>
        </ThemedView>
        <ThemedText>{item.model}</ThemedText>
        <ThemedView style={styles.detailsRow}>
          <ThemedText>Hours: {item.totalHours}</ThemedText>
          <ThemedText>Next Inspection: {item.nextInspectionDue}h</ThemedText>
        </ThemedView>
        <ThemedText type="default">Status: {item.status}</ThemedText>
      </ThemedView>
    </Pressable>
  );

  return (
    <ParallaxScrollView
      title="Aircraft"
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <FlatList
        data={aircraft}
        renderItem={renderItem}
        keyExtractor={item => item.tailNumber}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  itemContent: {
    padding: 16,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  itemPressed: {
    opacity: 0.7,
  },
  separator: {
    height: 16,
  },
});