export const formatPrice = (price: number, maximumFractionDigits = 0): string => {
	return price.toLocaleString('id-ID', {
		style: 'currency',
		currency: 'IDR',
		maximumFractionDigits,
	});
};

export const isPositiveNumber = (value: number | string): boolean => {
	if (typeof value === 'string') value = parseInt(value, 10);
	return value > 0;
};

export const removeSpaces = (value: string): string => {
	return value.replace(/\s/g, '');
};

export const isArrayLastItem = <T extends any[]>(array: T, index: number): boolean => {
	return array[array.length - 1] === index;
};
