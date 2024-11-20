import './MessageList.scss'
import { MessageCard } from '../card/MessageCard';
import { TypeAnimation } from 'react-type-animation';

export function MessageList(){
    const messageList=[
        {
            type: 'me',
            text: 'It seems like you typed "ntnc," but I\'m not sure what it refers to. Could you clarify or provide more context? I\'d be happy to help!',
        },
        {
            type: 'bot',
            text: 'Липкий хедер (sticky header) — это такой элемент на странице, который остается на виду при прокрутке, то есть "прилипает" к верхней части экрана, когда пользователь прокручивает страницу вниз.\n' +
                '\n' +
                'Для создания липкого хедера в CSS, можно использовать свойство position: sticky. Вот пример:',
        },
    ]

    const renderMessageList=()=>{
        return messageList.map((message,index)=><MessageCard {...message} key={index}/>)
    }

    return (
        <div className='message-list'>
            {messageList.length === 0 ?(
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