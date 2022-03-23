import { useEffect, useRef, useState } from 'react';

export const useObserver = (callback: () => void) => {
	const ref = useRef<IntersectionObserver | null>(null);
	const [isIntersected, setIsInterSected] = useState(false);

	useEffect(
		() => () => {
			ref.current?.disconnect();
		},
		[]
	);

	return (element: Element | null) => {
		if (element) {
			if (ref.current) ref.current.disconnect();
			if (isIntersected) return;

			ref.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setIsInterSected(true);
					callback();
				}
			});
			ref.current.observe(element);
		}
	};
};
