import { Image, Text, View, ScrollView, Alert, Pressable, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import socket from '@/common/socket';
import { WsEvent } from '@/common/Event';
import InputField from '@/components/InputField';
import PrimaryButton from '@/components/PrimaryButton';
import api from '@/common/api';
import { ApiResponse } from '@/common/interfaces/ApiResponse';
import { useRoute } from '@react-navigation/core';
import { useGlobalContext } from '@/context/GlobalProvider';
import Navbar from "@/components/Navbar";
import SelectSearch, { SelectedOptionValue, SelectSearchOption } from 'react-select-search';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COOKEYS } from "@/common/utils";

type Chat = {
	id: string;
	content: string;
	userId: string;
	groupId: string;
};

type Group = {
	id: string;
	name: string;
};

const Chat = () => {
	const route = useRoute();
	const { user } = useGlobalContext();
	const { groupId } = route.params as { groupId: string };
	const [content, setContent] = useState<string>('');
	const [chats, setChats] = useState<Chat[]>([]);
	const [group, setGroup] = useState<Group>();
	const [modalVisible, setModalVisible] = useState(false);
	const [options, setOptions] = useState<SelectSearchOption[]>([]);
	const [selectedOption, setSelectedOption] = useState<SelectedOptionValue[]>([]);

	const sendMessage = () => {
		const chat: Omit<Chat, 'id'> = {
			content,
			groupId,
			userId: user?.id!,
		};
		socket.emit(WsEvent.CHAT_SEND, chat);

		setChats((chats) => [...chats, { id: '', ...chat }]);
		setContent('');
	};

	useEffect(() => {
		const getChats = async () => {
			const res = await api.get<ApiResponse<any>>(`/chats/${groupId}`);
			setChats(res.data.data);
		};

		const getGroupInfo = async () => {
			const res = await api.get<ApiResponse<any>>(`/chats/groups/${groupId}`);
			setGroup(res.data.data);
		};

		getChats();
		getGroupInfo();
		socket.emit(WsEvent.JOIN_GROUP, groupId);
	}, []);

	useEffect(() => {
		socket.on(WsEvent.SEND_CHAT, (chat: Chat) => {
			setChats((chats) => [...chats, chat]);
		});
		return () => {
			socket.off(WsEvent.SEND_CHAT);
		};
	}, [socket]);

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

	const addUserToGroup = async () => {
		const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
		if (!token) return;

		const { data } = await api.put<ApiResponse<any>>(`/chats/groups/${groupId}/${selectedOption}`, {
			headers: {
				Authorization: token
			}
		});

		setModalVisible(false);
	}

	return (
		<View className="flex-1 bg-white">
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
							title="Ajouter"
							handlePress={addUserToGroup}
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
			<ScrollView className="flex-1">
				{group && (
					<View className="pt-14 flex flex-row items-center">
						<Image
							source={require("@/assets/images/profile.png")}
							alt="profile picture"
							style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'black' }}
						/>
						<Text className="text-black text-lg font-bold ml-3">{group.name}</Text>
						<PrimaryButton
							title=""
							handlePress={() => setModalVisible(true)}
							containerStyles={"flex items-center ml-auto mr-5 px-4 rounded-full"}
						>
							<Image
								source={require("@/assets/svg/plus.svg")}
								alt="add"
								style={{ width: 20, height: 20 }}
							/>
						</PrimaryButton>
					</View>

				)}
				<View className="h-2 border-b-2 border-black"/>
				{chats.map((chat, i) => {
					const isCurrentUser = chat.userId === user?.id;
					return (
						<View
							key={i}
							className={`m-2 p-2 rounded-lg ${
								isCurrentUser ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'
							}`}
						>
							<Text className="text-black">{chat.content}</Text>
						</View>
					);
				})}
			</ScrollView>

			<View className="p-4 mb-20 flex flex-row items-center">
				<InputField
					value={content}
					otherStyles="text-black"
					placeholder="Type your message here"
					handleChangeText={(content: string) => setContent(content)}
				/>
				<PrimaryButton handlePress={sendMessage} title="Send" containerStyles={"ml-4 mt-2 w-14"}>
					Send
				</PrimaryButton>
			</View>

			<Navbar />
			<StatusBar style="auto" />
		</View>
	);
};

export default Chat;
