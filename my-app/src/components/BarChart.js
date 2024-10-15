import React, {useEffect, useRef} from "react";
import * as d3 from "d3";
import { useLocation } from "react-router-dom";

function BarChart(){
    const svgRef = useRef();

    const location = useLocation();
    const {data, team} = location.state|| {}

    useEffect(()=>{
        const svg = d3.select(svgRef.current);
        const margin = { top: 40, right: 40, bottom: 100, left: 60 };
        const width = 1200;
        const height = 800;

        const x = d3.scaleBand()
            .domain(data.map(d => d.player))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.goals)]).nice()
            .range([height - margin.bottom, margin.top]);

        svg.selectAll("*").remove();

        svg.append("g")
            .attr("fills", "steelblue")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.player))
            .attr("y", d => y(d.goals))
            .attr("height", d => y(0) - y(d.goals))
            .attr("width", x.bandwidth());

        //x Axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("text")  // x축 레이블 회전
            .attr("transform", "rotate(45)")
            .style("text-anchor", "start");
      
        //y Axis
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

    }, [data]);

    return(
        <div >
            <h1>{team}</h1>
            <h1>Goals per Player</h1>
            <svg ref={svgRef} width={1500} height={1000}></svg>
        </div>
    );
}

export default BarChart;