export interface Info {
	name: string;
	icon: string;
	id?: any;
	description: string;
	assetCode: string;
	displaySymbol: string;
	subscriptionId: string;
	isTradable: boolean;
	favourite: boolean;
}

export interface ClickAction {
	type: string;
	target: string;
}

export interface LastPriceAndPercentageChange {
	value: string;
	rawPercentageChange: number;
	percentage: string;
	valueColor: string;
	percentageColor: string;
	arrowIcon: string;
}

export interface Display {
	lastPriceAndPercentageChange: LastPriceAndPercentageChange;
}

export interface Asset {
	info: Info;
	clickAction: ClickAction;
	display: Display;
}

export interface AssetCategoryData {
	assetSubcategory?: any;
	isAssetSubcategory: boolean;
	assets: Asset[];
}

export interface AssetCategory {
	title: string;
	assetCategory: string;
	logo: string[];
	assetCategoryData: AssetCategoryData[];
}

export interface CryptoResponse {
	page: number;
	totalCount: number;
	totalPageCount: number;
	pageSize: number;
	assetCategories: AssetCategory[];
}
