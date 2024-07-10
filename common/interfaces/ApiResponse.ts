export type ApiResponse<T = any> = {
	isSuccess: true;
	status: number;
	data: T;
}