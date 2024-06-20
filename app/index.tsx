import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import PrimaryButton from "@/components/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COOKEYS } from "@/common/utils";

const Home = () => {
	const { user, setUser } = useGlobalContext();
	if (!user) return <Redirect href="/login"/>;


	const disconnect = async () => {
		await AsyncStorage.removeItem(COOKEYS.JWT_TOKEN);
		setUser(null);
		router.push('/login');
		return;
	}
	return (
		<View className="flex-1 items-center justify-center bg-white">

			<Link href="/sign-in">Sign in</Link>
			{user?.id}

			<PrimaryButton handlePress={disconnect} title="disconnect" ></PrimaryButton>
			<StatusBar style="auto"/>
		</View>
	)
}

export default Home;