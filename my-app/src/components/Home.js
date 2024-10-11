import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../style/home.module.css';


function Home(){
    const navigate = useNavigate();
    const [team, setTeam] = useState('');
    const [season, setSeason] = useState('');
    const [loading, setLoading] = useState(false);

    const activateSetTeam = (e) => {
        setTeam(e.target.value);
    }

    const activateSetSeason = (e) => {
        setSeason(e.target.value);
    }

    const activateNavigate = async () => {
        setLoading(true);
        try{
            let url = "http://localhost:8080/teamStatBySeason?team=" + team +
                        "&season=" + season;
            const response = await fetch(url);
            if(!response.ok){
                console.log("Failed fetch");
            }else{
                console.log("success");
            }
            
            const data = await response.json();
            //console.log(JSON.stringify(data));
            setLoading(false);

            console.log("log: " + typeof(data));
            url = "/team/stat?team=" + team + "&" + "season=" + season;
            navigate(url, {state: {teamStat : data}});
        } catch(error){
            setLoading(false);
        }
    }

    return(
        <div className={styles.home_div}>
            <div className={styles.item}>
                <div className={styles.item_item}><h2>Football team</h2></div>
                <div className={styles.item_item}>
                    <div>
                    <select name="team" onChange={activateSetTeam}>
                        <option value selected="selected" disabled="disabled">Choose Team</option>
                        <option value={"Arsenal"}>Arsenal</option>
                        <option value={"Aston-Villa"}>Aston-Villa</option>
                        <option value={"Bournemouth"}>Bournemouth</option>
                        <option value={"Brentford"}>Brentford</option>
                        <option value={"Brighton"}>Brighton</option>
                        <option value={"Chelsea"}>Chelsea</option>
                        <option value={"Crystal-Palace"}>Crystal-Palace</option>
                        <option value={"Everton"}>Everton</option>
                        <option value={"Fulham"}>Fulham</option>
                        <option value={"Liverpool"}>Liverpool</option>
                        <option value={"Manchester-City"}>Manchester-City</option>
                        <option value={"Manchester-United"}>Manchester-United</option>
                        <option value={"Newcastle-United"}>Newcastle-United</option>
                        <option value={"Nottingham-Forest"}>Nottingham-Forest</option>
                        <option value={"Tottenham"}>Tottenham</option>
                        <option value={"West-Ham-United"}>West-Ham-United</option>
                        <option value={"Wolverhampton-Wanderers"}>Wolverhampton-Wanderers</option>
                    </select>
                    </div>

                    <div>
                    <select name="season" onChange={activateSetSeason}>
                        <option value selected="selected" disabled="disabled">Choose Season</option>
                        <option value={"2023-2024"}>2023-2024</option>
                    </select>
                    </div>
                </div>
                <button disabled={(!team) || (!season)} onClick={() => {activateNavigate()}}>
                    {loading ? "Loading..." : "Check Stat"}
                </button>
            </div>
        </div>
    );
}

export default Home;