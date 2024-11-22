import { FaBots } from 'react-icons/fa6';

import './Header.scss'

export function Header() {
    return (
        <header className='header'>
            <FaBots className='header__icon' />
            <div className='header__text'>
                <h1>Институт искусственного интеллекта</h1>
            </div>
        </header>
    )
}