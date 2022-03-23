import { apiService } from '@/libs/api';
import { useAsync } from '@/libs/hooks';
import { useCallback, useEffect, useState } from 'react';
import { CryptoListItem } from './CryptoListItem';
import { Loader } from './Loader';
import styles from './styles.module.scss';

export const CryptoList = () => {
	const [page, setPage] = useState(1);
	const [assets, setAssets] = useState<IAPI.Asset[]>([]);

	const loadData = useCallback((page: number) => apiService.getCrypto(page, 10), []);

	const { loading, data, error, call } = useAsync(loadData, 1);

	useEffect(() => {
		if (data && data.data.assetCategories[0].assetCategoryData[0].assets?.length > 0) {
			setAssets((prev) => [...prev, ...data.data.assetCategories[0].assetCategoryData[0].assets]);
		}
	}, [data]);

	const handlePageChange = useCallback(() => {
		if (data?.data.totalPageCount === page) return;

		setPage((p) => p + 1);
		call(page + 1);
	}, [call, data?.data.totalPageCount, page]);

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
