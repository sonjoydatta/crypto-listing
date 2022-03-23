import { config } from '@/config';
import { CryptoResponse } from './@types';
import { HttpService } from './http.service';

class APIService {
	constructor(private http: HttpService) {}

	getCrypto(page = 1, limit = 10) {
		return this.http.get<CryptoResponse>(
			`v3/mobile-app/explore/asset-tiles-by-category?categor
		y=cryptocurrency&page=${page}&pageSize=${limit}&sortKey=name`,
			{
				headers: {
					'x-app-version-code': '468',
				},
			}
		);
	}
}

const httpInstance = new HttpService(config.apiURL);
export const apiService = new APIService(httpInstance);
