import { useSession } from "next-auth/react"
import Image from 'next/image'

import GoogleButton from '../googleLogin/googleLogin';
import styles from './navbar.module.css';

const Navbar = () => {
    const { data: session } = useSession()

    let UserInfo = (<></>);
    if(session){
        UserInfo = (
            <div className={styles.userInfo}>
                <div className={styles.userText}>
                    <h2 className={styles.name}>{session.user.name}</h2>
                    <h3 className={styles.email}>{session.user.email}</h3>
                </div>
                <Image className={styles.userImg} src={session.user.image} width={"50px"} height={"50px"} alt="" />
            </div>
        );
    }

    return (
        <nav className={styles.container}>
            <h1 className={styles.logo}>LOGO</h1>
            <ul className={styles.menubar}>
                <li className={styles.menu}>대시보드</li>
                <li className={styles.menu}>프로젝트</li>
                <li className={styles.menu}>설정</li>
                <li className={styles.menu}>도움말</li>
            </ul>
            
            <GoogleButton />
            {UserInfo}
        </nav>
    )
};

export default Navbar;