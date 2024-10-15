import React from "react";
import category from "../assets/category";
import styles from "../style/playerStat.module.css"
import { Link } from "react-router-dom";

function PlayerStat(props){

    return (
        <tr>
            {category.map((item, idx) => (
                <td className={styles.td}>
                    {idx===0 ? (<Link to='/playerchart' state={{data: props.stat, team: props.team}}>{props.stat[item]}</Link>) 
                    : (props.stat[item])}
                </td>
            ))}
        </tr>
    );
}

export default PlayerStat;