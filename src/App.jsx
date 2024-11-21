import './App.scss'
import { Header } from './component/header/Header';

import './font.scss'
import { Footer } from './component/footer/Footer';
import { Micro } from './component/micro/Micro';
import { MessageList } from './component/message/list/MessageList';
import {useEffect,  useState} from "react";
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition";

function App() {
	const [isListeningMessage, setIsListeningMessage] = useState(false);

	const {
		transcript,
		resetTranscript,
		listening,
		browserSupportsSpeechRecognition,  // Boolean to check browser compatibility
	} = useSpeechRecognition({
		language: 'ru-RU',
		continuous: true
	});

	console.log(listening)

	useEffect(() => {
		if (browserSupportsSpeechRecognition){
			SpeechRecognition.startListening({ continuous: true })
		}

	}, [listening]);

	console.log(listening)

	useEffect(() => {
		if (!isListeningMessage && transcript.toLocaleLowerCase().includes('привет бот')) {
			setIsListeningMessage(true)
			resetTranscript()
		}
	}, [transcript])


	return (
		<div className="app">
			<Header/>
			<main className='app__message-list'>
				<MessageList
					isListeningMessage={isListeningMessage}
					transcript={transcript}
					resetTranscript={resetTranscript}
					setIsListeningMessage={setIsListeningMessage}
				/>
			</main>
			<Footer slot={()=><Micro isActive={isListeningMessage}/>}/>
		</div>
	)
}

export default App
