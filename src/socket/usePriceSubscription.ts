import { useCallback, useEffect, useRef } from 'react';
import { useSocket } from './context';
import { CurrencyUpdateEvent } from './types';

export const usePriceSubscription = (
	subscriptionID: string,
	cb: (updatedPrice: CurrencyUpdateEvent) => void
) => {
	const socket = useSocket();
	const cbRef = useRef(cb);
	const unsubRef = useRef<() => void | null>();

	useEffect(() => {
		cbRef.current = cb;
	}, [cb]);

	const unsubscribe = useCallback(() => {
		socket.unsubscribe({ topics: [subscriptionID] });
	}, [socket, subscriptionID]);

	const serverUnsubscriptionRef = useRef(unsubscribe);

	useEffect(() => {
		serverUnsubscriptionRef.current = unsubscribe;
	}, [unsubscribe]);

	useEffect(() => {
		unsubRef.current?.();
		serverUnsubscriptionRef.current();

		socket.subscribe({ topics: [subscriptionID] });

		unsubRef.current = socket.on(subscriptionID, cbRef.current);
	}, [socket, subscriptionID]);

	useEffect(() => {
		return () => {
			unsubRef.current?.();
			serverUnsubscriptionRef.current();
		};
	}, []);
};
