
export type ApiResponse<T> = {
	message: true;
	status: number;
	data: T;
}