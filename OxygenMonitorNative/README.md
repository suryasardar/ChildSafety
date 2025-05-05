# OxygenMonitorNative (React Native)

This is the React Native (Expo) version of your Oxygen Monitoring app.

## Getting Started

1. Install Expo CLI if you don't have it:
   ```sh
   npm install -g expo-cli
   ```

2. Install dependencies:
   ```sh
   cd OxygenMonitorNative
   npm install
   ```

3. Start the app:
   ```sh
   npx expo start
   ```

4. Scan the QR code with the Expo Go app (iOS/Android) or run on an emulator.

## Project Structure
- `App.js` - Main entry point
- `screens/` - All your app screens (Login, Signup, OxygenLevel, History, etc.)

## Migrating from Web
- Use `<View>`, `<Text>`, `<TextInput>`, `<Button>` instead of HTML tags.
- Use React Navigation for screen navigation.
- Use Expo Notifications for push/local notifications.

---

For more info, see the [Expo documentation](https://docs.expo.dev/). 