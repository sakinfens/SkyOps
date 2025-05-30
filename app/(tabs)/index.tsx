import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchMetar } from '@/utils/weather';

interface ParsedMetar {
  wind: string;
  visibility: string;
  sky: string;
  temperature: string;
  pressure: string;
  raw: string;
}

interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route?: '/(tabs)/trips' | '/(tabs)/aircraft';
}

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Trips',
    description: 'View and manage upcoming flights',
    icon: '✈️',
    route: '/(tabs)/trips',
  },
  {
    id: '2',
    title: 'Aircraft',
    description: 'Monitor fleet status',
    icon: '🛩️',
    route: '/(tabs)/aircraft',
  },
  {
    id: '3',
    title: 'Weather',
    description: 'Check weather conditions',
    icon: '🌤️',
  },
];

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState<ParsedMetar | null>(null);

  useEffect(() => {
    async function loadWeather() {
      const metar = await fetchMetar('KJFK');
      setWeatherData(metar);
    }
    loadWeather();
  }, []);

  const handlePress = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route);
    } else if (item.title === 'Weather') {
      // Could add weather details modal here
      console.log('Weather pressed');
    }
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <Pressable 
      onPress={() => handlePress(item)}
      style={({ pressed }) => [
        styles.itemContainer,
        pressed && styles.itemPressed
      ]}>
      <ThemedView style={styles.itemContent}>
        <ThemedView style={styles.headerRow}>
          <ThemedText style={styles.icon}>{item.icon}</ThemedText>
          <ThemedText type="subtitle">{item.title}</ThemedText>
        </ThemedView>
        <ThemedText>{item.description}</ThemedText>
        {item.title === 'Weather' && weatherData && (
          <ThemedView style={styles.weatherDetails}>
            <ThemedText>Wind: {weatherData.wind}</ThemedText>
            <ThemedText>Visibility: {weatherData.visibility}</ThemedText>
            <ThemedText>Sky: {weatherData.sky}</ThemedText>
            <ThemedText>Temperature: {weatherData.temperature}</ThemedText>
            <ThemedText>Pressure: {weatherData.pressure}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </Pressable>
  );

  return (
    <ParallaxScrollView
      title="SkyOps"
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  icon: {
    fontSize: 24,
  },
  itemPressed: {
    opacity: 0.7,
  },
  separator: {
    height: 16,
  },
  weatherDetails: {
    marginTop: 8,
  },
});
