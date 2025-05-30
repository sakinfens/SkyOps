# ✈️ SkyOps

**SkyOps** is a lightweight mobile operations app built with React Native + Expo, designed specifically for Part 135 charter operators managing Gulfstream G550 aircraft. It helps streamline daily operations including flight tracking, aircraft status monitoring, and pilot duty time logging.

---

## 📱 Features

- 🛫 **Today’s Flights Overview**  
  Quickly view next scheduled flight, total flights today, and key route info.

- 🛩 **Aircraft Status**  
  Monitor hours flown, upcoming inspections, and aircraft readiness.

- ⏱ **Pilot Duty Log Calculator**  
  Input report/release times to calculate FAA Part 135 duty time limits.

- 🌤️ **METAR Weather Integration**  
  Real-time METAR data pulled from AviationWeather.gov by ICAO code.

---

## 🧑‍💻 Tech Stack

- **React Native** (via Expo)
- **TypeScript**
- **React Navigation**
- **Day.js** for time handling
- **AviationWeather.gov API** for real-time METAR data

---

## 🔧 Setup

```bash
git clone https://github.com/YOUR_USERNAME/SkyOps.git
cd SkyOps
npm install
npx expo start
