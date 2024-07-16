import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";

import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import { RegisterForm } from "@/common/dto/auth.dto";
import { ApiResponse } from "@/common/interfaces/ApiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COOKEYS } from "@/common/utils";
import { jwtDecode } from "jwt-decode";
import { useGlobalContext } from "@/context/GlobalProvider";
import api from "@/common/api";

type RegisterError = {
	username?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	server?: string;
}

const Register = () => {
	const { setUser } = useGlobalContext();
	const [isSubmitting, setSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<RegisterError | null>(null);
	const [form, setForm] = useState<RegisterForm>({ username: "", email: "", password: "", confirmPassword: "" });

	const onRegister = async () => {
		setSubmitting(true);

		try {
			const { data } = await api.post<ApiResponse>('http://localhost:3000/auth/register', form);

			console.log(data);
			if (!data.isSuccess) {
				setError({
					username: data.data["username"],
					email: data.data["email"],
					password: data.data["password"],
					confirmPassword: data.data["confirmPassword"],
					server: ""
				});

				setSubmitting(false);
				return;
			}

			await AsyncStorage.setItem(COOKEYS.JWT_TOKEN, data.data);
			const user = jwtDecode<User | null>(data.data);
			setUser(user);
			setSubmitting(false);
			router.push("/");
		} catch (error) {
			console.log("Error", error);

			setError({
				username: "",
				email: "",
				confirmPassword: "",
				password: "",
				server: "Internal server error, please try again later."
			})

			setSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="h-full overflow-hidden">
			<ScrollView>
				<Image
					source={require("@/assets/svg/rond.svg")}
					className=" fixed -left-16 w-48 h-48"
				/>
				<Image
					source={require("@/assets/svg/rond.svg")}
					className=" fixed -top-12 -left-8 w-48 h-48"
				/>
				<View
					className="w-full md:w-1/2 md:h-1/2 flex justify-center self-center h-full px-4 my-6"
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}
				>

					<Text className="flex justify-center text-2xl font-semibold text-[#D6955B] mt-10 font-psemibold">
						Hermal
					</Text>

					<InputField
						title="Username"
						value={form.username}
						handleChangeText={(username: string) => setForm({ ...form, username })}
						otherStyles="mt-7"
					/>

					<Text>{error?.username ?? ""}</Text>

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
						type="password"
						handleChangeText={(password: string) => setForm({ ...form, password })}
						otherStyles="mt-7"
					/>

					<Text>{error?.password ?? ""}</Text>


					<InputField
						title="Confirm Password"
						type="password"
						value={form.confirmPassword}
						handleChangeText={(confirmPassword: string) => setForm({ ...form, confirmPassword })}
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
							href="/login"
							className="text-lg font-psemibold text-secondary"
						>
							Login
						</Link>
					</View>
				</View>
			</ScrollView>
			<Image
				source={require("@/assets/svg/rond.svg")}
				className=" fixed -bottom-12 -right-12 w-48 h-48"
			/>
		</SafeAreaView>
	);
};

export default Register;