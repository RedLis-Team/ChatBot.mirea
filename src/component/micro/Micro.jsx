import { useState } from 'react';
import { Blob } from '../blob/Blob';

import './Micro.scss'
import { FaMicrophone } from 'react-icons/fa';
import clsx from 'clsx';

export function Micro(){
    const [isActive, setIsActive] = useState(false)

    return (
        <div className='micro'>
            <button
                className={clsx('micro__button')}
                onClick={() => setIsActive(prev => !prev)}
            >
                <FaMicrophone />
            </button>

            <div className='micro__blob-container'>
                <Blob className={'micro__blob'} width={isActive? '250px': '0'} fill={'#02633D'}/>
            </div>
        </div>
    )
}