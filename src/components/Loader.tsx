import { FC, HTMLAttributes } from 'react';
import styles from './styles.module.scss';

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export const Loader: FC<Props> = (props) => (
	<div className={styles['crypto-loader']} {...props}>
		<div />
		<div />
		<div />
		<div />
	</div>
);
