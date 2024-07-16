import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { FC } from 'react';

type CustomButtonProps = {
	title: string;
	handlePress?: () => void;
	containerStyles?: string
	textStyles?: string;
	isLoading?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
	                      title,
	                      handlePress,
	                      containerStyles,
	                      textStyles,
	                      isLoading,
                      }) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-[#D6955B] rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading}
		>
			<Text className={`text-[#FEEAA1] font-semibold text-lg ${textStyles}`}>
				{title}
			</Text>

			{isLoading && (
				<ActivityIndicator
					animating={isLoading}
					color="#fff"
					size="small"
					className="ml-2"
				/>
			)}
		</TouchableOpacity>
	);
};

export default CustomButton;