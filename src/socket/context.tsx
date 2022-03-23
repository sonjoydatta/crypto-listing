import { createContext, FC, ReactNode, useContext } from 'react';
import { SocketService } from './socket.service';

export const SocketContext = createContext<SocketService | null>(null);

type Props = {
	children: ReactNode;
	service: SocketService;
};

export const SocketProvider: FC<Props> = ({ children, service }) => {
	return <SocketContext.Provider value={service}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
	const socket = useContext(SocketContext);

	if (!socket) {
		throw new Error(
			'Socket Service was not provided to Socket Provider Or the component is not wrapped in a Socket Provider'
		);
	}

	return socket;
};
