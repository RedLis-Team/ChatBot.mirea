import clsx from 'clsx';

import botIcon from '../../../assert/botlogo.jpg'
import './MessageCard.scss'

export function MessageCard({type, text}){
    return (
        <div className={clsx(type, 'message')}>
            <div className='message__container'>
                <div className='message__icon'>
                    <img src={botIcon} alt='' className='message__img'/>
                </div>
                <p className='message__text'>{text}</p>
            </div>
        </div>
    )
}