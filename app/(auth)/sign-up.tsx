import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "@/constants";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import { RegisterForm } from "@/common/dto/auth.dto";
import axios from "axios";
import { ApiResponse } from "@/common/interfaces/ApiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COOKEYS } from "@/common/utils";

type RegisterError = {
	email?: string;
	password?: string;
	confirmPassword?: string;
	server?: string;
}

const SignUp = () => {
	const [isSubmitting, setSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<RegisterError | null>(null);
	const [form, setForm] = useState<RegisterForm>({ username: "", email: "", password: "", confirmPassword: "" });

	const onRegister = async () => {
		setSubmitting(true);

		try {
			const { data } = await axios.post<ApiResponse<any>>('http://localhost:3000/auth/register', form);

			if (data.status === 400) {
				setError({
					email: data.data["email"],
					password: data.data["password"],
					confirmPassword: data.data["confirmPassword"],
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
				confirmPassword: "",
				password: "",
				server: "Internal server error, please try again later."
			})

			setSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="h-full">
			<ScrollView>
				<View
					className="w-full flex justify-center h-full px-4 my-6"
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

					<Text>{error?.email ?? ""}</Text>

					<InputField
						title="Password"
						value={form.password}
						handleChangeText={(password: string) => setForm({ ...form, password })}
						otherStyles="mt-7"
					/>

					<Text>{error?.password ?? ""}</Text>


					<InputField
						title="Confirm Password"
						value={form.password}
						handleChangeText={(password: string) => setForm({ ...form, password })}
						otherStyles="mt-7"
					/>
					<Text>{error?.confirmPassword ?? ""}</Text>


					<PrimaryButton
						title="Register"
						handlePress={onRegister}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>

					<Text>{error?.server ?? ""}</Text>

					<View className="flex justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-[#18534F] font-pregular">
							Have an account already?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-psemibold text-secondary"
						>
							Login
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;