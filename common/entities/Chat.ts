type Chat = {
	id: string;
	content: string;
	userId: string;
	groupId: string;
}

export type ItemChat = {
	username: string,
} & Chat;