import clsx from 'clsx';

import botIcon from '../../../assert/botlogo.jpg'
import './MessageCard.scss'
import {ThreeDots} from "react-loader-spinner";

export function MessageCard({type, text, isLoading}){
    return (
        <div className={clsx(type, 'message')}>
            <div className='message__container'>
                <div className='message__icon'>
                    <img src={botIcon} alt='' className='message__img'/>
                </div>
                <p className='message__text'>{isLoading? (
                    <ThreeDots
                        visible={true}
                        height="40"
                        width="40"
                        color="#02633D"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{padding: '0 10px'}}
                        wrapperClass=""
                    />):text}</p>
            </div>
        </div>
    )
}