import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import InputField from "@/components/InputField";
import CustomButton from "@/components/PrimaryButton";
import { LoginForm } from "@/app/lib/dto/auth.dto";


const SignIn = () => {
	const [isSubmitting, setSubmitting] = useState<boolean>(false);
	const [form, setForm] = useState<LoginForm>({
		email: "",
		password: "",
	});

	const submit = async () => {
		if (form.email === "" || form.password === "") {
			Alert.alert("Error", "Please fill in all fields");
		}

		setSubmitting(true);

		try {
			Alert.alert("Success", "User signed in successfully");
			router.replace("/");
		} catch (error) {

		} finally {
			setSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="relative h-full">
			<ScrollView>
				<View
					className="w-full flex justify-center h-full px-4 my-6"
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}
				>
					<Image
						source={require("@/assets/svg/rond.svg")}
						style={{
							width: 100,
							height: 100,
							resizeMode: "contain",
						}}
						className="mt-10"
					/>

					<Text className="flex justify-center text-2xl font-semibold text-[#D6955B] mt-10 font-psemibold">
						Hermal
					</Text>

					<InputField
						title="Email"
						value={form.email}
						handleChangeText={(email: string) => setForm({ ...form, email })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>

					<InputField
						title="Password"
						value={form.password}
						handleChangeText={(password: string) => setForm({ ...form, password })}
						otherStyles="mt-7"
					/>

					<CustomButton
						title="Login"
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>


					<View className="fixed bottom-0 right-10 m-2 p-2 flex justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-[#18534F] font-pregular">
							Don't have an account?
						</Text>
						<Link
							href="/sign-up"
							className="text-lg font-psemibold text-secondary"
						>
							Register
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;