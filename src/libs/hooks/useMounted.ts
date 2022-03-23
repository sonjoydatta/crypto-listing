import { useCallback, useEffect, useRef } from 'react';

export const useMounted = () => {
	const isMountedRef = useRef(true);

	useEffect(
		() => () => {
			isMountedRef.current = false;
		},
		[]
	);

	const isMounted = useCallback(() => isMountedRef.current, []);

	return isMounted;
};
