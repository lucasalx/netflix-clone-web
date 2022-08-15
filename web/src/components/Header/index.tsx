import './styles.css';

interface HeaderProps {
    black: boolean;
    data: any;
}

export function Header({ black, data }: HeaderProps) {
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={data.logoImage.url} alt={data.logoImage.alt} />
                </a>
            </div>

            <div className="header--user">
                <a href="/user">
                    <img src={data.userImage.url} alt={data.userImage.alt} />
                </a>
            </div>
        </header>
    );
}