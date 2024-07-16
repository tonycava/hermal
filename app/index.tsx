import { Alert, Image, Modal, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from 'expo-router';
import { useGlobalContext } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COOKEYS } from "@/common/utils";
import axios from "axios";
import { ApiResponse } from "@/common/interfaces/ApiResponse";
import { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import api from '@/common/api';
import PrimaryButton from '@/components/PrimaryButton';

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
	if (!user) return <Redirect href="/login" />;

	const [groups, setGroups] = useState<Group[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [searchUser, setSearchUser] = useState<string>('');
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const getGroups = async () => {
			const {data} = await api.get<ApiResponse<any>>('/chats/groups');

			console.log(data.data);
			setGroups(data.data);
		}
		getGroups();
	}, []);

	const options = [
		{name: 'Swedish', value: 'sv'},
		{name: 'English', value: 'en'},
	];

	const addGroup = async () => {
		const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
		if (!token) return;

		const {data} = await axios.post<ApiResponse<any>>('http://localhost:3000/chats/groups/create', {
			headers: { Authorization: token }
		});

		console.log(data.data);
	}

	const getUsers = async () => {
		const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
		if (!token) return;

		const {data} = await axios.get<ApiResponse<any>>('http://localhost:3000/chats/search-user?searchTerm=' + searchUser, {
			headers: {
				Authorization: token
			}
		});
		console.log(data.data);
	}

	const disconnect = async () => {
		await AsyncStorage.removeItem(COOKEYS.JWT_TOKEN);
		setUser(null);
		router.push('/login');
		return;
	}

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
							value=""
							placeholder="Nom du groupe"
							handleChangeText={() => {}}
							otherStyles="mt-4 mx-4"
						/>

					</View>
				</View>
			</Modal>
			<Image
				source={require("@/assets/svg/rond.svg")}
				className=" fixed -top-12 -left-12 w-48 h-48"
			/>

			<View className="flex self-start w-full">
				<Text className="flex self-start justify-center text-3xl font-semibold text-[#D6955B] mt-20 ml-2 font-psemibold">
					Hermal
				</Text>


				<PrimaryButton handlePress={() => setModalVisible(true)} containerStyles="ml-auto mt-16 mr-5 px-4 py-2 rounded-full" title="test">

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

			<StatusBar style="auto"/>
		</View>
	)
}

export default Home;