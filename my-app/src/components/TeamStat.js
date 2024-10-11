import React from "react";
import { useLocation } from 'react-router-dom';
import PlayerStat from "./PlayerStat";
import category from "../assets/category";
import styles from "../style/teamStat.module.css";

function TeamStat(props){
    const location = useLocation();

    const queryParam = new URLSearchParams(location.search);
    const team = queryParam.get('team');
    const {teamStat} = location.state || {};

    return (
        <div className={styles.container}>
            <h1>HELLO TEAM : {team}</h1>
            
            <div className={styles.tableDiv}>
                <table>
                    <tr>
                        {category.map((item) => (
                            <th className={styles.th}>{item}</th>
                        ))}
                    </tr>

                    {teamStat.map((item) => (
                        <PlayerStat stat={item} className={styles.ps}></PlayerStat>
                    ))}
                    
                </table>
            </div>
            
        </div>
    );
}

export default TeamStat;