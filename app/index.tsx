import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";


const Home = () => {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className="font-pblack">Open up App.js to start working on your app!</Text>
			<Link href="/sign-in">Siogn in</Link>
			<StatusBar style="auto"/>
		</View>
	)
}

export default Home;