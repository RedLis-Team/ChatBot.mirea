import './App.scss'
import { Header } from './component/header/Header';

import './font.scss'
import { Footer } from './component/footer/Footer';
import { Micro } from './component/micro/Micro';
import { MessageList } from './component/message/list/MessageList';

function App() {

	return (
		<div className="app">
			<Header/>
			<main className='app__message-list'>
				<MessageList/>
			</main>
			<Footer slot={Micro}/>
		</div>
	)
}

export default App
