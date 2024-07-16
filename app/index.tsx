import { Alert, Image, Modal, Pressable, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COOKEYS } from "@/common/utils";
import Navbar from "@/components/Navbar";
import { ApiResponse } from "@/common/interfaces/ApiResponse";
import React, { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import SelectSearch, { SelectedOptionValue, SelectSearchOption } from 'react-select-search';
import PrimaryButton from "@/components/PrimaryButton";
import api from "@/common/api";

type Group = {
	id: string;
	name: string;
}

type User = {
	id: string;
	username: string;
}

type Chat = {
	id: string;
	content: string;
	createdAt: string;
}

const Home = () => {
	const { user, setUser } = useGlobalContext();
	const [groups, setGroups] = useState<Group[]>([]);
	const [lastChats, setLastChats] = useState<{ [key: string]: Chat | null }>({});
	const [modalVisible, setModalVisible] = useState(false);
	const [groupName, setGroupName] = useState<string>('');
	const [options, setOptions] = useState<SelectSearchOption[]>([]);
	const [selectedOption, setSelectedOption] = useState<SelectedOptionValue[]>([]);

	useEffect(() => {
		const getChatsFromGroup = async (groupId: string): Promise<Chat | null> => {
			const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
			if (!token) return null;

			const { data } = await api.get<ApiResponse<any>>('http://localhost:3000/chats/' + groupId, {
				headers: {
					Authorization: token
				}
			});

			if (data.data.length === 0) return null;

			// Trier les chats par createdAt pour trouver le plus récent
			const sortedChats = data.data.sort((a: Chat, b: Chat) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
			return sortedChats[0];
		}

		const getGroups = async () => {
			const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
			if (!token) return;

			const { data } = await api.get<ApiResponse<any>>('http://localhost:3000/chats/groups', {
				headers: {
					Authorization: token
				}
			});

			setGroups(data.data);

			// Récupérez le dernier chat pour chaque groupe
			data.data.forEach(async (group: Group) => {
				const lastChat = await getChatsFromGroup(group.id);
				setLastChats(prev => ({ ...prev, [group.id]: lastChat }));
			});
		}
		getGroups();
	}, []);

	if (!user) return <Redirect href="/login" />;

	const addGroup = async () => {
		const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
		if (!token) return;

		const { data } = await api.post<ApiResponse<any>>('http://localhost:3000/chats/groups/create', {
			name: groupName,
			users: [...selectedOption, user.id]
		}, {
			headers: {
				Authorization: token
			}
		});

		setGroups([...groups, data.data]);
		setModalVisible(false);
		return;
	}

	const getUsers = async (query: string) => {
		const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
		if (!token) return;

		const { data } = await api.get<ApiResponse<any>>('http://localhost:3000/chats/search-user?searchTerm=' + query, {
			headers: {
				Authorization: token
			}
		});
		return data.data.map((user: User) => {
			return {
				name: user.username,
				value: user.id
			}
		});
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
					<View className="border-4 rounded-2xl border-[#D6955B] w-3/4 h-1/2 bg-white">
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
									setSelectedOption(option)
									return;
								}
								setSelectedOption([option]);
							}}
							placeholder={"Ajouter des membres"}
							className={"mt-4 mx-4 border-4 border-[#D6955B] rounded-2xl"}
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
				source={require("@/assets/svg/rond.svg")}
				className="fixed -top-12 -left-12 w-48 h-48"
			/>

			<View className="flex flex-row self-start w-full">
				<Text
					className="flex self-start justify-center text-3xl font-semibold text-[#D6955B] mt-20 ml-2 font-psemibold">
					Hermal
				</Text>

				<PrimaryButton title="" handlePress={() => setModalVisible(true)} containerStyles={"ml-auto mt-16 mr-5 px-4 py-2 rounded-full"}>
					<Image
						source={require("@/assets/svg/plus.svg")}
						className="w-2 h-2 aspect-square"
					/>
				</PrimaryButton>
			</View>

			{groups.length === 0 ? (
				<Text className="text-2xl font-semibold mt-10">Pas de groupe</Text>
			) : (
				<View className="flex flex-col mt-10 w-full">
					{groups.map((group) => (
						<View key={group.id} className="flex flex-col mb-4">
							<Link href={`/groups/${group.id}`} className="flex flex-row items-center ml-6">
								<Image
									source={require("@/assets/images/profile.png")}
									alt="profile picture"
									style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'black' }}
								/>
								<Text className="text-2xl font-semibold ml-4">{group.name}</Text>
							</Link>
							{lastChats[group.id] && (
								<Text className="text-base text-gray-500 ml-20">{lastChats[group.id]?.content}</Text>
							)}
						</View>
					))}
				</View>
			)}

			<Navbar />
			<StatusBar style="auto" />
		</View>
	)
}

export default Home;
