import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";


const Home = () => {
	return (
		<View className="flex-1 items-center justify-center bg-white">

			<Link href="/sign-in">Sign in</Link>
			<StatusBar style="auto"/>
		</View>
	)
}

export default Home;