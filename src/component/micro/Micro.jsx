import { Blob } from '../blob/Blob';

import './Micro.scss'
import { FaMicrophone } from 'react-icons/fa';
import clsx from 'clsx';

export function Micro({isActive}){
    return (
        <div className='micro'>
            <button
                className={clsx('micro__button')}
            >
                <FaMicrophone />
            </button>

            <div className='micro__blob-container'>
                <Blob className={'micro__blob'} width={isActive? '250px': '0'} fill={'#02633D'}/>
            </div>
        </div>
    )
}