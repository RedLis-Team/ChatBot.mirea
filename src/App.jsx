import './App.scss'
import { Header } from './component/header/Header';

import './font.scss'
import { Footer } from './component/footer/Footer';
import { Micro } from './component/micro/Micro';
import { MessageList } from './component/message/list/MessageList';
import { useEffect, useRef, useState } from 'react';

import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition";

function App() {
	const [isListeningMessage, setIsListeningMessage] = useState(false);
	const interval = useRef(null);

	const {
		transcript,
		resetTranscript,
		listening,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition({
		language: 'ru-RU',
		continuous: true
	});

	useEffect(() => {
		if (browserSupportsSpeechRecognition){
			SpeechRecognition.startListening({ continuous: true })
		}

	}, [listening]);

	useEffect(() => {
		if (!isListeningMessage && transcript.toLocaleLowerCase().includes('привет бот')) {
			setIsListeningMessage(true)
			resetTranscript()
		}
	}, [transcript])

	useEffect(() => {
		interval.current = setInterval(() => {
			if (!isListeningMessage){
				resetTranscript()
			}
		}, 15*60*1000)

		return () => {
			clearInterval(interval.current)
		}
	}, []);

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
