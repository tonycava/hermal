import { Alert, Image, Modal, Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, Redirect, router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COOKEYS } from '@/common/utils';
import { ApiResponse } from '@/common/interfaces/ApiResponse';
import { useEffect, useState } from 'react';
import InputField from '@/components/InputField';
import SelectSearch, { SelectedOptionValue, SelectSearchOption } from 'react-select-search';
import PrimaryButton from '@/components/PrimaryButton';
import api from '@/common/api';
import Navbar from '@/components/Navbar';

type Group = {
	id: string;
	name: string;
}

type User = {
	id: string;
	username: string;
}

const Home = () => {
	const { user, setUser } = useGlobalContext();
	const [groups, setGroups] = useState<Group[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [groupName, setGroupName] = useState<string>('');
	const [options, setOptions] = useState<SelectSearchOption[]>([]);
	const [selectedOption, setSelectedOption] = useState<SelectedOptionValue[]>([]);

	useEffect(() => {
		const getGroups = async () => {
			const { data } = await api.get<ApiResponse>('/chats/groups');
			setGroups(data.data);
		};
		getGroups();
	}, []);

	if (!user) return <Redirect href="/login"/>;

	const addGroup = async () => {
		const { data } = await api.post<ApiResponse<any>>('/chats/groups/create', {
			name: groupName,
			users: [...selectedOption, user.id]
		});

		setGroups([...groups, data.data]);
		setModalVisible(false);
		return;
	};

	const getUsers = async (query: string) => {
		const { data } = await api.get<ApiResponse>(`http://localhost:3000/chats/search-user?searchTerm=${query}`);
		return data.data.map((user: User) => {
			return {
				name: user.username,
				value: user.id
			};
		});
	};

	const disconnect = async () => {
		await AsyncStorage.removeItem(COOKEYS.JWT_TOKEN);
		setUser(null);
		router.push('/login');
		return;
	};

	return (
		<View className="flex-1 items-center bg-white">
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}>
				<View className="flex-1 justify-center items-center bg-white bg-opacity-50">
					<View className="border-4 rounded-2xl border-[#D6955B] w-3/4 h-1/3 bg-white">
						<InputField
							title="Nom du groupe"
							value={groupName}
							placeholder="Nom du groupe"
							handleChangeText={(newGroupName: string) => {
								setGroupName(newGroupName);
							}}
							otherStyles="mt-4 mx-4"
						/>
						<SelectSearch
							options={options}
							getOptions={getUsers}
							search={true}
							multiple={true}
							debounce={500}
							onChange={(option) => {
								if (Array.isArray(option)) {
									setSelectedOption(option);
									return;
								}
								setSelectedOption([option]);
							}}
							placeholder={'Ajouter des membres'}
							className={'mt-4 mx-4 border-4 border-[#D6955B] rounded-2xl'}
						/>
						<PrimaryButton
							title="Créer"
							handlePress={addGroup}
							containerStyles="bg-[#D6955B] rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-4 mx-4"
						/>
						<Pressable
							className="bg-[#D6955B] rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-4 mx-4"
							onPress={() => setModalVisible(!modalVisible)}>
							<Text>Fermer</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<Image
				source={require('@/assets/svg/rond.svg')}
				className="fixed -top-12 -left-12 w-48 h-48"
			/>

			<View className="flex self-start w-full">
				<Text
					className="flex self-start justify-center text-3xl font-semibold text-[#D6955B] mt-20 ml-2 font-psemibold">
					Hermal
				</Text>


				<PrimaryButton handlePress={() => setModalVisible(true)}
				               containerStyles="ml-auto mt-16 mr-5 px-4 py-2 rounded-full" title="test">

				</PrimaryButton>
			</View>

			{groups.length === 0 ? (
				<Text className="text-2xl font-semibold mt-10">Pas de groupe</Text>
			) : (
				<View className="flex flex-col mt-10">
					{groups.map((group) => (
						<Link href={`/groups/${group.id}`} key={group.id}>
							<Text className="text-2xl font-semibold">{group.name}</Text>
						</Link>
					))}
				</View>
			)}

			<Navbar/>
			<StatusBar style="auto"/>
		</View>
	);
};

export default Home;
