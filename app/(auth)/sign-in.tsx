import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";

import InputField from "@/components/InputField";
import CustomButton from "@/components/PrimaryButton";
import { LoginForm } from "@/common/dto/auth.dto";
import { ApiResponse } from "@/common/interfaces/ApiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COOKEYS } from "@/common/utils";
import axios from "axios"

type LoginError = {
	email?: string;
	password?: string;
	server?: string;
}

const SignIn = () => {
	const [isSubmitting, setSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<LoginError | null>(null);
	const [form, setForm] = useState<LoginForm>({ email: "", password: "", });

	const onLogin = async () => {
		setSubmitting(true);

		try {
			const { data } = await axios.post<ApiResponse<any>>('http://localhost:3000/auth/login', form);

			if (data.status === 400) {
				setError({
					email: data.data["email"],
					password: data.data["password"],
					server: ""
				});

				setSubmitting(false);
				return;
			}

			await AsyncStorage.setItem(COOKEYS.JWT_TOKEN, data.data);
			setSubmitting(false);
			router.push("/");
		} catch (error) {
			console.log("Error", error);

			setError({
				email: "",
				password: "",
				server: "Internal server error, please try again later."
			})

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

					<Text>{error?.email ?? ""}</Text>

					<InputField
						title="Password"
						value={form.password}
						handleChangeText={(password: string) => setForm({ ...form, password })}
						otherStyles="mt-7"
					/>
					<Text>{error?.password ?? ""}</Text>

					<CustomButton
						title="Login"
						handlePress={onLogin}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>

					<Text>{error?.server ?? ""}</Text>

					<View className="absolute bottom-0 right-10 m-2 p-2 flex justify-center pt-5 flex-row gap-2">
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