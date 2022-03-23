import { MutableRefObject, useEffect, useState } from 'react';

export const useOnScreen = <T extends HTMLDivElement | null>(ref: MutableRefObject<T>) => {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

	useEffect(() => {
		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return isIntersecting;
};
