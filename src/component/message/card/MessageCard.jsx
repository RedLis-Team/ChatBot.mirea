import clsx from 'clsx';

import botIcon from '../../../assert/botlogo.jpg'
import './MessageCard.scss'
import {ThreeDots} from "react-loader-spinner";
import {TypeAnimation} from "react-type-animation";
import { useEffect } from 'react';

export function MessageCard({type, text, isLoading}){


    const renderMessage = ()=>{
        if (isLoading){
            return (
                <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="#02633D"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{padding: '0 10px'}}
                    wrapperClass=""
                />
            )
        }

        if (type ==='bot'){
            return (
                <TypeAnimation
                    speed={80}
                    sequence={text}
                    wrapper="span"
                    cursor={false}
                    repeat={1}
                />
            )
        }

        return <span>{text}</span>
    }

    return (
        <div className={clsx(type, 'message')}>
            <div className='message__container'>
                <div className='message__icon'>
                    <img src={botIcon} alt='' className='message__img'/>
                </div>
                <div className='message__text'>{renderMessage()}</div>
            </div>
        </div>
    )
}