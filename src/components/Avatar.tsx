import { FC, ImgHTMLAttributes, memo } from 'react';
import styles from './styles.module.scss';

type AvatarProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'ClassName'>;

export const Avatar: FC<AvatarProps> = memo((props) => (
	<img {...props} className={styles['crypto-list__item--avatar']} />
));
