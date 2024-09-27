import React from "react";
import styles from '../style/home.module.css';

function Home(){
    return(
        <div className={styles.home_div}>
            <div className={styles.item}>
                <div className={styles.item_item}><h2>Football team</h2></div>
                <div className={styles.item_item}>
                    <select name="team">
                        <option value selected="selected" disabled="disabled">Choose Team</option>
                        <option>Arsenal</option>
                        <option>Aston-Villa</option>
                        <option>Bournemouth</option>
                        <option>Brentford</option>
                        <option>Brighton</option>
                        <option>Chelsea</option>
                        <option>Crystal-Palace</option>
                        <option>Everton</option>
                        <option>Fulham</option>
                        <option>Liverpool</option>
                        <option>Manchester-City</option>
                        <option>Manchester-United</option>
                        <option>Newcastle-United</option>
                        <option>Nottingham-Forest</option>
                        <option>Tottenham</option>
                        <option>West-Ham-United</option>
                        <option>Wolverhampton-Wanderers</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Home;