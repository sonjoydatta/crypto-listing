import { useObserver, useOnScreen } from '@/libs/hooks';
import { CurrencyUpdateEvent, useSocket } from '@/socket';
import { formatPrice, isPositiveNumber, removeSpaces } from '@/utils';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Avatar } from './Avatar';
import styles from './styles.module.scss';

type CryptoListItemProps = {
	asset: IAPI.Asset;
	onLoadMore?: () => void;
};

export const CryptoListItem: FC<CryptoListItemProps> = ({ asset, onLoadMore }) => {
	const [displayData, setDisplayData] = useState(asset.display);
	const loadMoreobserver = useObserver(() => onLoadMore?.());
	const statusRef = useRef<HTMLDivElement>(null);
	const isVisible = useOnScreen(statusRef);
	const socket = useSocket();
	const subscriptionID = useMemo(() => asset.info.subscriptionId, [asset.info.subscriptionId]);
	const unsubRef = useRef<() => void>();

	const updateDisplayData = useCallback((val: CurrencyUpdateEvent) => {
		setDisplayData((prev) => {
			return {
				...prev,
				lastPriceAndPercentageChange: {
					...prev.lastPriceAndPercentageChange,
					arrowIcon: !isPositiveNumber(val.currentPrice.priceChangePercent) ? 'RED' : 'GREEN',
					rawPercentageChange: val.currentPrice.priceChangePercent,
					value: removeSpaces(formatPrice(val.currentPrice.sellPrice)),
				},
			};
		});
	}, []);

	useEffect(() => {
		if (subscriptionID) {
			if (isVisible) {
				socket.subscribe({ topics: [subscriptionID] });
				unsubRef.current = socket.on(subscriptionID, updateDisplayData);
			} else {
				socket.unsubscribe({ topics: [subscriptionID] });
				unsubRef.current?.();
			}

			return () => {
				socket.unsubscribe({ topics: [subscriptionID] });
				unsubRef.current?.();
			};
		}
	}, [isVisible, socket, subscriptionID, updateDisplayData]);

	return (
		<li ref={onLoadMore ? loadMoreobserver : undefined} className={styles['crypto-list__item']}>
			<Avatar src={asset.info.icon} />
			<div>
				<p className={styles['crypto-list__item--title']}>{asset.info.displaySymbol}</p>
				<span className={styles['crypto-list__item--subtitle']}>{asset.info.name}</span>
			</div>
			<div
				ref={statusRef}
				className={`${styles['crypto-list__item--rp']} ${
					displayData.lastPriceAndPercentageChange.arrowIcon !== 'RED'
						? styles['crypto-list__item--rp-green']
						: ''
				}`}
			>
				{displayData.lastPriceAndPercentageChange.value}
				<span>{displayData.lastPriceAndPercentageChange.rawPercentageChange}%</span>
			</div>
		</li>
	);
};
