import { io, Socket } from 'socket.io-client';
import { IncomingEvents, OutgoingEvents, SubscriptionParams } from './types';

export class SocketService {
	private _socket: Socket<IncomingEvents, OutgoingEvents>;

	constructor(url: string) {
		this._socket = io(url, {
			transports: ['websocket'],
		});

		this._socket.io.on('open', () => {
			console.log('connected to socket');
		});
	}

	subscribe(subscriptionParams: SubscriptionParams) {
		this._socket.emit('subscribe', subscriptionParams);
	}

	unsubscribe(subscriptionParams: SubscriptionParams) {
		this._socket.emit('unsubscribe', subscriptionParams);
	}

	on<Event extends keyof IncomingEvents>(
		event: Event extends string ? Event : never,
		cb: IncomingEvents[Event]
	) {
		this._socket.on(event, cb);

		return () => {
			this._socket.off(event, cb);
		};
	}
}
