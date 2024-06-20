import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "@/constants";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import { RegisterForm } from "@/app/lib/dto/auth.dto";

const SignUp = () => {
	const [isSubmitting, setSubmitting] = useState<boolean>(false);
	const [form, setForm] = useState<RegisterForm>({
		username: "",
		email: "",
		password: "",
	});

	const submit = async () => {
		setSubmitting(true);

		router.replace("/");

		setSubmitting(false);

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
						otherStyles="mt-10"
					/>

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

					<InputField
						title="Confirm Password"
						value={form.password}
						handleChangeText={(password: string) => setForm({ ...form, password })}
						otherStyles="mt-7"
					/>

					<PrimaryButton
						title="Register"
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>

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
			<Image
				source={require("@/assets/svg/rond.svg")}
				className=" fixed -bottom-12 -right-12 w-48 h-48"
			/>
		</SafeAreaView>
	);
};

export default SignUp;