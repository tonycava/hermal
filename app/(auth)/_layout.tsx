import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";

const AuthLayout = () => {
	// const { user } = useGlobalContext();
	// if (user) return <Redirect href="/" />;
    console.log("hermal: layout");

	return (
		<>
			<Stack>
				<Stack.Screen
					name="login"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="register"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>

			<StatusBar backgroundColor="#161622" style="light" />
		</>
	);
};

export default AuthLayout;