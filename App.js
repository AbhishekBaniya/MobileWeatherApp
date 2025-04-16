/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
/*import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_KEY = '471692543f81348837d49259f400486d';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(res.data);
    } catch (err) {
      setError('City not found!');
      setWeatherData(null);
    }
    setLoading(false);
  };

  const getWeatherIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#000" />}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {weatherData && (
        <View style={styles.weatherBox}>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Image
            source={{ uri: getWeatherIcon(weatherData.weather[0].icon) }}
            style={styles.icon}
          />
          <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
          <Text style={styles.desc}>{weatherData.weather[0].description}</Text>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Text>Wind: {weatherData.wind.speed} m/s</Text>
          <Text>Feels Like: {weatherData.main.feels_like}°C</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  weatherBox: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#b2dfdb',
    borderRadius: 15,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 18,
    textTransform: 'capitalize',
    marginBottom: 10,
  },
});*/
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_KEY = '471692543f81348837d49259f400486d';

const iconMap = {
  Clear: require('./assets/clear.png'),
  Clouds: require('./assets/cloud.png'),
  Rain: require('./assets/rain.png'),
  Drizzle: require('./assets/drizzle.png'),
};

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(res.data);
    } catch (err) {
      setError('City not found!');
      setWeatherData(null);
    }
    setLoading(false);
  };

  const getWeatherIcon = (main) => {
    return iconMap[main] || require('./assets/cloud.png'); // fallback
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity onPress={getWeather}>
          <Image source={require('./assets/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#000" />}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {weatherData && (
        <View style={styles.weatherBox}>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Image
            source={getWeatherIcon(weatherData.weather[0].main)}
            style={styles.icon}
          />
          <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
          <Text style={styles.desc}>{weatherData.weather[0].description}</Text>
          <View style={styles.row}>
            <Image source={require('./assets/humidity.png')} style={styles.infoIcon} />
            <Text>Humidity: {weatherData.main.humidity}%</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('./assets/wind.png')} style={styles.infoIcon} />
            <Text>Wind: {weatherData.wind.speed} m/s</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#e0f7fa' },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  input: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 10, fontSize: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  searchIcon: { width: 25, height: 25, marginLeft: 10 },
  button: { backgroundColor: '#00796b', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  error: { color: 'red', textAlign: 'center' },
  weatherBox: { alignItems: 'center', padding: 20, backgroundColor: '#b2dfdb', borderRadius: 15 },
  city: { fontSize: 24, fontWeight: 'bold' },
  icon: { width: 100, height: 100 },
  temp: { fontSize: 32, fontWeight: 'bold' },
  desc: { fontSize: 18, textTransform: 'capitalize', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  infoIcon: { width: 25, height: 25, marginRight: 10 },
});

