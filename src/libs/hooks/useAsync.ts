import { useCallback, useEffect, useRef, useState } from 'react';
import { useMounted } from './useMounted';

export const useAsync = <T extends (...args: any[]) => any>(
	cb: T,
	...initialArgs: Parameters<T>
) => {
	const [data, setData] = useState<Awaited<ReturnType<T>> | null>(null);

	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);

	const isMounted = useMounted();

	const run = useCallback(
		async (...args: Parameters<T>) => {
			setLoading(true);

			try {
				const data = await cb(...args);
				if (isMounted()) {
					setData(data);
				}
			} catch (error) {
				if (error instanceof Error) {
					if (isMounted()) {
						setError(error);
					}
				} else if (isMounted()) {
					setError(new Error(error as any));
				}
			} finally {
				if (isMounted()) {
					setLoading(false);
				}
			}
		},
		[cb, isMounted]
	);

	const runnerRef = useRef(run);

	useEffect(() => {
		runnerRef.current = run;
	}, [run]);

	useEffect(() => {
		runnerRef.current(...initialArgs);
	}, []);

	return {
		data,
		loading,
		error,
		call: (...args: Parameters<T>) => runnerRef.current(...args),
	};
};
