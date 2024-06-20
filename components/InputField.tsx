import React, { InputHTMLAttributes, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleProp } from "react-native";

import { icons } from "../constants";

type InputFieldProps = {
	title: string;
	value: string;
	placeholder: string;
	handleChangeText: (text: string) => void;
	otherStyle?: string;
} & InputHTMLAttributes<HTMLInputElement>

const InputField = ({
	                   title,
	                   value,
	                   placeholder,
	                   handleChangeText,
	                   otherStyles,
	                   ...props
                   }: any) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-black font-pmedium">{title}</Text>

			<View className="w-full h-16 px-4 rounded-2xl border-[#18534F] border-4 focus:border-secondary flex flex-row items-center">
				<TextInput
					className="flex-1 text-white font-psemibold text-base"
					style={
						{
							width: "97%",
						}
					}
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#7B7B8B"
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
					{...props}
				/>

				{title === "Password" && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={!showPassword ? icons.eye : icons.eyeHide}
							className="w-4 h-4"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}

			</View>
		</View>
	);
};

export default InputField;