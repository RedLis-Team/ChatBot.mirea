import './Footer.scss'

export function Footer({slot = () => {}}) {

    return (
        <footer className="footer">
            {slot()}
        </footer>
    )
}