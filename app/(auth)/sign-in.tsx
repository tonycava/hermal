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
		<SafeAreaView className="h-full overflow-hidden">
			<ScrollView>
				<Image
					source={require("@/assets/svg/rond.svg")}
					className=" fixed -top-12 -right-12 w-48 h-48"
				/>
				<View
					className="w-full md:w-1/2 flex justify-center h-full self-center px-4 overflow-hidden"
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}
				>

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


					<View className="fixed bottom-0 right-10 mb-9 p-2 flex justify-center pt-5 flex-row gap-2">
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
			<Image
				source={require("@/assets/svg/rond.svg")}
				className=" fixed -bottom-12 -left-12 w-48 h-48"
			/>
			<Image
				source={require("@/assets/svg/rond.svg")}
				className=" fixed -bottom-16 w-48 h-48"
			/>
		</SafeAreaView>
	);
};

export default SignIn;