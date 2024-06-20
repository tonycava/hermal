import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COOKEYS } from "@/common/utils";
import { jwtDecode } from "jwt-decode";

type Context = {
	user: User | null
}

const GlobalContext = createContext<Context>({ user: null });

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
			if (!token) return;
			const user = jwtDecode<User | null>(token)
			setUser(user);
		}

		fetchUser()
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;