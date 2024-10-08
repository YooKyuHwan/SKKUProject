import React from "react";
import { useLocation } from 'react-router-dom';


function TeamStat(){
    const location = useLocation();

    const queryParam = new URLSearchParams(location.search);
    const team = queryParam.get('team');

    return (
        <div>
            <h1>HELLO TEAM : {team}</h1>
        </div>
    );
}


export default TeamStat;