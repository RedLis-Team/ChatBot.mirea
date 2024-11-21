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

    useEffect(() => {
        if (isListeningMessage) {
            setNewMessages(transcript)

            clearTimeout(timer.current)
            timer.current = setTimeout(() => {
                setIsListeningMessage(false)

                if (newMessages.trim() === ''){
                    return
                }

                window.scrollTo(0, document.body.scrollHeight);

                setMessageList(prev=>[...prev, {type: 'me', text: newMessages}])
                setNewMessages('')

                setIsLoadingBotAnswer(true)
                botAxios
                    .get(`/answer?text=${newMessages}`)
                .then(({data}) => {
                    setIsLoadingBotAnswer(false)
                    setMessageList(prev=>[...prev, data])
                    window.scrollTo(0, document.body.scrollHeight);
                }).catch((error)=>{
                    console.log(error)
                    setIsLoadingBotAnswer(false)
                })

                resetTranscript()
            }, 3000)
        }
    })

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
        <div className='message-list'>
            {messageList.length === 0 && newMessages.trim() === '' ?(
                <div className='message-list__empty-log'>
                    <TypeAnimation
                        className='message-list__text'
                        sequence={[
                            'Узнать про программы обучения', // Types 'One'
                            3000,
                            'Посмотреть проходные баллы прошлых лет',
                            3000,
                            'Скажи привет МИРЭА и задай вопрос',
                            3000,
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                    />
                </div>
            ) : renderMessageList()}
        </div>
    )
}