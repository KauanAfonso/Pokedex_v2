import styles from "./Header.module.css";
import logo from "../img/logo.png";

export function Header(){
    return(
        <header>
            <div className={styles.container}>
                <img src={logo} alt="logo_pokemon"/>
                <div className={styles.container_info}>
                    <h2>Made by Kauan Afonso</h2>
                    <a href="/">Home</a>
                </div>

            </div>
        </header>
    )
}