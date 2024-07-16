import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Stack } from "expo-router";

import "../styles.css"
import GlobalProvider from "@/context/GlobalProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

	useEffect(() => {

			SplashScreen.hideAsync();

	}, []);

	return <GlobalProvider>
		<Stack>
			<Stack.Screen name="(auth)" options={{ headerShown: false }}></Stack.Screen>
			<Stack.Screen name="index" options={{ headerShown: false }}></Stack.Screen>
			<Stack.Screen name="groups" options={{ headerShown: false }}></Stack.Screen>
		</Stack>
	</GlobalProvider>
}

export default RootLayout;