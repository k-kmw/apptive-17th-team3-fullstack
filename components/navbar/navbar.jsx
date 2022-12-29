import React from "react";
import { useSession } from "next-auth/react"
import Image from 'next/image'

import GoogleButton from '../googleLogin/googleLogin';
import styles from './navbar.module.css';

const Navbar = () => {
    const { data: session } = useSession()
    const minTime = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
    const maxTime = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

    let UserInfo = (<></>);
    if(session){
        UserInfo = (
            <div className={styles.userInfo}>
                <div className={styles.userText}>
                    <h2 className={styles.name}>{session.user.name}</h2>
                    <h3 className={styles.email}>{session.user.email}</h3>
                </div>
                <Image className={styles.userImg} src={session.user.image} width={"50px"} height={"50px"} alt="" />
                <div>
                    <p>{minTime}</p>
                    <p>{maxTime}</p>
                </div>
            </div>
        );
    }

    const notyet = () => {
        alert('서비스 준비중 입니다.')
    }

    return (
        <nav className={styles.container}>
            <div className={styles.logo}><img className={styles.img} src="/logo.png"/></div>
            <ul className={styles.menubar}>
                <li className={styles.menu}>대시보드</li>
                <li className={styles.menu} onClick={notyet}>프로젝트</li>
                <li className={styles.menu} onClick={notyet}>설정</li>
                <li className={styles.menu} onClick={notyet}>도움말</li>
            </ul>
            
            <GoogleButton />
            {UserInfo}
        </nav>
    )
};

export default React.memo(Navbar);