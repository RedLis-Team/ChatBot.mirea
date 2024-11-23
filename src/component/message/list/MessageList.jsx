import './MessageList.scss'
import { MessageCard } from '../card/MessageCard';
import { TypeAnimation } from 'react-type-animation';
import {useEffect, useRef, useState} from "react";
import axios from "axios";

const botUrl = 'http://10.0.58.117:8001'

const botAxios = axios.create({
    baseURL: botUrl,
})

export function MessageList({isListeningMessage, transcript, resetTranscript,setIsListeningMessage}){
    const [messageList,setMessageList] = useState([]);
    const [newMessages, setNewMessages] = useState('');

    const [isLoadingBotAnswer, setIsLoadingBotAnswer] = useState(false);

    const timer = useRef(null);
    const listEndRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (isListeningMessage) {
            setNewMessages(transcript)

            clearTimeout(timer.current)
            timer.current = setTimeout(async () => {
                setIsListeningMessage(false)

                if (newMessages.trim() === ''){
                    return
                }

                setMessageList(prev=>[...prev, {type: 'me', text: newMessages}])
                setNewMessages('')

                setIsLoadingBotAnswer(true)
                botAxios
                    .get(`/answer?text=${newMessages}`)
                .then(({data}) => {
                    setIsLoadingBotAnswer(false)
                    setMessageList(prev=>[...prev, data])
                }).catch(()=>{
                    setMessageList(prev=>[...prev, {
                        type: 'bot',
                        text: 'Извините, я не нашел точной информации по вашему запросу о МИРЭА. Пожалуйста, уточните вопрос или обратитесь к официальному сайту института для получения более подробной информации.' +
                            'Извините, я не нашел точной информации по вашему запросу о МИРЭА. Пожалуйста, уточните вопрос или обратитесь к официальному сайту института для получения более подробной информации.\'' +
                            'Извините, я не нашел точной информации по вашему запросу о МИРЭА. Пожалуйста, уточните вопрос или обратитесь к официальному сайту института для получения более подробной информации.\'' +
                            'Извините, я не нашел точной информации по вашему запросу о МИРЭА. Пожалуйста, уточните вопрос или обратитесь к официальному сайту института для получения более подробной информации.\''
                    }])
                    setIsLoadingBotAnswer(false)
                })

                resetTranscript()
            }, 2500)
        }
    },[transcript])

    useEffect(() => {

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                listEndRef.current.scrollIntoView({ behavior: 'smooth' })
            }
        });

        if (listRef.current) {
            resizeObserver.observe(listRef.current);
        }

        return () => {
            if (listRef.current) {
                resizeObserver.unobserve(listRef.current);
            }
        };
    }, []);

    const renderMessageList=()=>{
        return (
            <>
                {messageList.map((message,index)=><MessageCard {...message} key={index}/>)}
                {isListeningMessage && <MessageCard type={'me'} text={newMessages}/>}
                {isLoadingBotAnswer && <MessageCard type={'bot'} isLoading={isLoadingBotAnswer}/>}
            </>
        )
    }

    return (
        <div className='message-list' ref={listRef}>
            {messageList.length === 0 && newMessages.trim() === '' ? (
                <div className='message-list__empty-log'>
                    <TypeAnimation
                        speed={75}
                        className='message-list__text'
                        sequence={[
                            'Узнать про программы обучения',
                            2000,
                            'Посмотреть проходные баллы по направлению!',
                            2000,
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                    />
                </div>
            ) : renderMessageList()}
            <div ref={listEndRef}/>
        </div>
    )
}