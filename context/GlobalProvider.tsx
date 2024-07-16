import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COOKEYS } from '@/common/utils';
import { jwtDecode } from 'jwt-decode';

type Context = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	isLogged: boolean;
}

const GlobalContext = createContext<Context>({ user: null, setUser: () => null, isLogged: false });

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [isLogged, setIsLogged] = useState<Context['isLogged']>(false);
	const [user, setUser] = useState<Context['user']>(null);

	useEffect(() => {
		async function fetchUser() {
			const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
			if (!token) return;
			const user = jwtDecode<User | null>(token);
			setUser(user);
		}

		fetchUser();
	}, []);

	useEffect(() => {
		setIsLogged(!user);
	}, [user]);

	return (
		<GlobalContext.Provider
			value={{
				user,
				setUser,
				isLogged
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;