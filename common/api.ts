import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COOKEYS } from '@/common/utils';

const api = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem(COOKEYS.JWT_TOKEN);
		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	async (response) => {
		if (response.status === 401) {
			await AsyncStorage.removeItem(COOKEYS.JWT_TOKEN);
		}

		return response;
	}, (error) => {
		return Promise.reject(error);
	});

export default api;
