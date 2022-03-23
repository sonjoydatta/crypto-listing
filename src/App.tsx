import { CryptoList } from './components/CryptoList';
import { config } from './config';
import { SocketProvider, SocketService } from './socket';

const socket = new SocketService(config.socketURL);

const App = () => (
	<div className='App'>
		<SocketProvider service={socket}>
			<CryptoList />
		</SocketProvider>
	</div>
);

export default App;
