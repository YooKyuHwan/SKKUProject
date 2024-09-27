import React from "react";
import soccerBallImg from '../assets/free-icon-football-ball.png';
import styles from '../style/header.module.css';

function Header(){
    return (
        <div className={styles.div}>
            <div className={styles.item}>
                <img className={styles.header_img} src={soccerBallImg} alt="soccerball_image"></img>
                <div className={styles.header_div}>
                    <h1>EPL Data Visualization</h1>
                </div>
            </div>
            <div className={styles.item}>
                
            </div>
        </div>
    );
}

export default Header;