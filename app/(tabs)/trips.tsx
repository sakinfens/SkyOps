import { FlatList, Pressable, StyleSheet } from 'react-native';

import { trips } from '@/app/data/tripsData';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface TripItem {
  id: string;
  tailNumber: string;
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  departureTime: string;
  arrivalTime: string;
  client: string;
  status: string;
}

export default function TripsScreen() {
  const handlePress = (item: TripItem) => {
    console.log('Selected trip:', item.origin, 'to', item.destination);
    // TODO: Navigate to trip details
  };

  const renderItem = ({ item }: { item: TripItem }) => (
    <Pressable 
      onPress={() => handlePress(item)}
      style={({ pressed }) => [
        styles.itemContainer,
        pressed && styles.itemPressed
      ]}>
      <ThemedView style={styles.itemContent}>
        <ThemedText type="subtitle">{item.originName} to {item.destinationName}</ThemedText>
        <ThemedText>{item.client} - {item.tailNumber}</ThemedText>
        <ThemedText type="default">Departure: {new Date(item.departureTime).toLocaleString()}</ThemedText>
        <ThemedText type="default">Status: {item.status}</ThemedText>
      </ThemedView>
    </Pressable>
  );

  return (
    <ParallaxScrollView
      title="Trips"
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Schedule</ThemedText>
      </ThemedView>
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
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
  itemPressed: {
    opacity: 0.7,
  },
  separator: {
    height: 16,
  },
});