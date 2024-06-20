import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {
	const { user } = useGlobalContext();
	if (!user) return <Redirect href="/home" />;

	return (
		<View className="flex-1 items-center justify-center bg-white">

			<Link href="/sign-in">Sign in</Link>
			{user?.id}
			<StatusBar style="auto"/>
		</View>
	)
}

export default Home;