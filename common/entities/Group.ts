export type Group = {
	id: string;
	name: string;
}

export type ItemGroup = {
	lastChat: string,
} & Group;