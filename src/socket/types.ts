export type CurrentPrice = {
	buyBackPrice: number;
	cryptocurrencyId: number;
	cryptocurrencySymbol: string;
	midPrice: number;
	partnerId: number;
	priceChange: number;
	priceChangePercent: number;
	sellPrice: number;
	updatedAt: Date;
	volume: number;
	weightedAveragePrice: number;
};

export type CurrencyUpdateEvent = {
	success: boolean;
	currentPrice: CurrentPrice;
	previousPrice?: null;
};

export type SubscriptionParams = {
	topics: string[];
};

export type OutgoingEvents = {
	subscribe: (subscriptionParams: SubscriptionParams) => void;
	unsubscribe: (subscriptionParams: SubscriptionParams) => void;
};

export type IncomingEvents = {
	[key: string]: (updatedData: CurrencyUpdateEvent) => void;
};
