import React from "react";
import category from "../assets/category";
import styles from "../style/playerStat.module.css"

function PlayerStat(props){

    return (
        <tr>
            {category.map((item) => (
                <td className={styles.td}>{props.stat[item]}</td>
            ))}
        </tr>
    );
}

export default PlayerStat;