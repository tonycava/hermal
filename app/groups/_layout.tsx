import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '@/context/GlobalProvider';

const GroupsLayout = () => {
	const { user } = useGlobalContext();

	if (!user) return <Redirect href="/" />;

	return (
		<>
			<Stack>
				<Stack.Screen
					name="[groupId]/index"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>

			<StatusBar backgroundColor="#161622" style="light" />
		</>
	);
};

export default GroupsLayout;
