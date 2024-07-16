import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import socket from '@/common/socket';
import InputField from '@/components/InputField';
import PrimaryButton from '@/components/PrimaryButton';
import api from '@/common/api';
import { ApiResponse } from '@/common/interfaces/ApiResponse';
import { useRoute } from '@react-navigation/core';
import { useGlobalContext } from '@/context/GlobalProvider';
import { WsEvent } from '@/common/Event';


type Chat = {
	id: string;
	content: string;
	userId: string;
	groupId: string;
}

const Chat = () => {
		const route = useRoute();
		const { user } = useGlobalContext();
		const { groupId } = route.params as { groupId: string };
		const [content, setContent] = useState<string>('');
		const [chats, setChats] = useState<Chat[]>([]);

		const sendMessage = () => {
			if (!content) return;
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

			getChats();
			socket.emit(WsEvent.JOIN_GROUP, groupId);
		}, []);

		useEffect(() => {
			socket.on(WsEvent.SEND_CHAT, (chat: Chat) => {
				setChats((chats) => [...chats, chat]);
			});
			return () => {
				socket.off(WsEvent.SEND_CHAT);
			};
		}, []);


		return (
			<View className="flex-1 items-center justify-center bg-white">

				<InputField value={content} otherStyles="text-black" title="test"
				            handleChangeText={(content: string) => setContent(content)}/>
				<PrimaryButton handlePress={sendMessage} title="send"></PrimaryButton>

				{chats.map((chat, i) => {
					return <Text key={i}>{chat.content}</Text>;
				})}

				<StatusBar style="auto"/>
			</View>
		);
	}
;

export default Chat;