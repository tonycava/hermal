import { useState } from 'react';
import { Link, router } from 'expo-router';
import { View, Text, Dimensions, Image } from 'react-native';

import InputField from "@/components/InputField";
import CustomButton from "@/components/PrimaryButton";
import { LoginForm } from "@/common/dto/auth.dto";
import { ApiResponse } from "@/common/interfaces/ApiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COOKEYS } from "@/common/utils";
import { useGlobalContext } from "@/context/GlobalProvider";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import api from "@/common/api";

type LoginError = {
	email?: string;
	password?: string;
	server?: string;
}

const Login = () => {
	const { setUser } = useGlobalContext();
	const [isSubmitting, setSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<LoginError | null>(null);
	const [form, setForm] = useState<LoginForm>({ email: '', password: '', });

	const onLogin = async () => {
		setSubmitting(true);


		try {
			const { data } = await api.post<ApiResponse>('/auth/login', form);
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
			const user = jwtDecode<User | null>(data.data);
			setUser(user);
			setSubmitting(false);
			router.push('/');
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

	return <View className="h-full flex">
		<View>
			<Image
				source={require('@/assets/svg/rond.svg')}
				className="fixed -top-12 -right-12 w-48 h-48"
			/>
			<View
				className="w-full md:w-1/2 flex justify-center self-center px-4"
				style={{ minHeight: Dimensions.get('window').height - 100 }}
			>

				<Text className="text-2xl font-semibold text-[#D6955B] mt-10 font-psemibold">
					Hermal
				</Text>

				<InputField
					title="Email"
					value={form.email}
					handleChangeText={(email: string) => setForm({ ...form, email })}
					otherStyles="mt-7"
					keyboardType="email-address"
				/>

				<Text>{error?.email ?? ''}</Text>

				<InputField
					title="Password"
					value={form.password}
					type="password"
					handleChangeText={(password: string) => setForm({ ...form, password })}
					otherStyles="mt-7"
				/>

				<Text>{error?.password ?? ''}</Text>

				<CustomButton
					title="Login"
					handlePress={onLogin}
					containerStyles="mt-7"
					isLoading={isSubmitting}
				>Login</CustomButton>

				<Text>{error?.server ?? ''}</Text>

				<View className="fixed bottom-0 right-10 mb-9 p-2 flex justify-center pt-5 flex-row gap-2">
					<Text className="text-lg text-[#18534F] font-pregular">
						Don't have an account?
					</Text>
					<Link
						href="/register"
						className="text-lg font-psemibold text-secondary"
					>
						Register
					</Link>
				</View>
			</View>
		</View>
		<Image
			source={require('@/assets/svg/rond.svg')}
			className=" fixed -bottom-12 -left-12 w-48 h-48"
		/>
		<Image
			source={require('@/assets/svg/rond.svg')}
			className=" fixed -bottom-16 w-48 h-48"
		/>
	</View>;

};

export default Login;
