import { apiService } from '@/libs/api';
import { useAsync } from '@/libs/hooks';
import { useCallback, useMemo, useState } from 'react';
import { CryptoListItem } from './CryptoListItem';
import { Loader } from './Loader';
import styles from './styles.module.scss';

export const CryptoList = () => {
	const [assets, setAssets] = useState<IAPI.Asset[]>([]);

	const loadData = useCallback((page: number) => apiService.getCrypto(page, 10), []);

	const { loading, data, error, call } = useAsync(loadData, 1);

	const { page, totalPageCount } = useMemo(() => {
		if (data) {
			const {
				page,
				totalPageCount,
				assetCategories: {
					0: {
						assetCategoryData: {
							0: { assets },
						},
					},
				},
			} = data.data;
			setAssets((prev) => [...prev, ...assets]);
			return { page, totalPageCount };
		}
		return { page: 1, totalPageCount: 1 };
	}, [data]);

	const handlePageChange = useCallback(() => {
		if (totalPageCount === page) return;

		call(page + 1);
	}, [call, page, totalPageCount]);

	if (loading && !assets?.length) {
		return <div>Loading...</div>;
	}

	if (data) {
		return (
			<div className={styles['crypto-container']}>
				<ul className={styles['crypto-list']}>
					{assets.map((asset, index, arr) => {
						return (
							<CryptoListItem
								key={asset.info.subscriptionId}
								asset={asset}
								onLoadMore={index === arr.length - 1 ? handlePageChange : undefined}
							/>
						);
					})}
					{loading && <Loader />}
				</ul>
			</div>
		);
	}

	return <div>{error?.message || 'Something Went Wrong '}</div>;
};
