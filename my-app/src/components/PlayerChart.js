import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as d3 from "d3";
import { label } from "framer-motion/client";

function PlayerChart(props){
    const svgRefBarchart = useRef();
    const svgRefDonutchart = useRef(); 
    const svgRefRadarchart = useRef();

    const location = useLocation();
    const {data, team} = location.state || {};

    useEffect(() => {
        const playerStat = data ? [
            { label: "Goals", value: data.goals },
            { label: "Assists", value: data.assists },
            { label: "goal-per90", value: data.goals_per90},
            { label: "assist-per90", value: data.assists_per90},
            { label: "xG", value: data.xg },
            { label: "Games", value: data.games },
            { label: "Game-start", value : data.games_starts},
            { label: "Yellow Cards", value: data.cards_yellow },
            { label: "Red Cards", value: data.cards_red }
        ] : [];

        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 70, left: 40 };

        const svg = d3.select(svgRefBarchart.current)
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "#f9f9f9");

        svg.selectAll("*").remove();

        const xScale = d3.scaleBand()
            .domain(playerStat.map(d => d.label))
            .range([margin.left, width - margin.right])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(playerStat, d => d.value)])
            .nice()
            .range([height - margin.bottom, margin.top]);
        
        //X-Asix
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .attr("font-size", "15px")
            .selectAll("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40) translate(-10,0)"); 
            

        //Y-Axis
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))
            .attr("font-size", "15px");

        svg.selectAll(".bar")
            .data(playerStat)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.label))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - margin.bottom - yScale(d.value))
            .attr("fill", "steelblue");

        svg.selectAll(".label")
            .data(playerStat)
            .join("text")
            .attr("class", "label")
            .attr("x", d => xScale(d.label) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.value) - 5)
            .attr("text-anchor", "middle")
            .text(d => d.value);
        
    }, [data]);

    useEffect(() => {
        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const playerStat = [
            { label: "Goals", value: data.goals },
            { label: "Assists", value: data.assists },
            { label: "Penal Made", value: data.pens_made },
            { label: "Penal Attempt", value: data.pens_att },
        ];
        
        const svg = d3.select(svgRefDonutchart.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
        const pie = d3.pie().value(d => d.value);
        const arc = d3.arc().innerRadius(100).outerRadius(radius);
        
        svg.selectAll("*").remove(); 

        svg.selectAll("path")
            .data(pie(playerStat))
            .join("path")
            .attr("d", arc)
            .attr("fill", d => (d.data.value > 0 ? color(d.data.label) : "none")) 
            .attr("stroke", d => (d.data.value > 0 ? "white" : "red")) 
            .attr("stroke-width", d => (d.data.value > 0 ? 2 : 2)); 

        svg.selectAll("text")
            .data(pie(playerStat))
            .join("text")
            .attr("transform", d => {
                const [x, y] = arc.centroid(d); 
                // 값이 0인 경우 라벨 숨기기
                return d.data.value > 0 ? `translate(${x}, ${y})` : "translate(0, 0)"; 
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .attr("font-size", "15px")
            .attr("fill", "black")
            .text(d => (d.data.value > 0 ? d.data.label : ""));
        
    }, [data]);

    useEffect(() => {
        const playerStat = [
            { axis: "Goals", value: data.goals },
            { axis: "Assists", value: data.assists },
            { axis: "xG", value: data.xg },
            { axis: "xA", value: data.xg_assist },
        ];

        const width = 440;
        const height = 440;
        const radius = Math.min(width, height) / 2;
        const angleSlice = (Math.PI * 2) / playerStat.length;

        const svg = d3.select(svgRefRadarchart.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        svg.selectAll("*").remove();  

        const radialScale = d3.scaleLinear()
            .domain([0, d3.max(playerStat, d => d.value)])
            .range([0, radius]);
        
        svg.selectAll(".axis")
            .data(playerStat)
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => radialScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (d, i) => radialScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("stroke", "gray")
            .attr("stroke-width", "3px");

        // radar
        const radarLine = d3.lineRadial()
            .radius(d => radialScale(d.value))
            .angle((d, i) => i * angleSlice);

        svg.append("path")
            .datum(playerStat)
            .attr("d", radarLine)
            .attr("fill", "lightblue")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 4)
            .attr("opacity", 3.0);
        
        // Axis
        svg.selectAll(".axis-label")
            .data(playerStat)
            .enter()
            .append("text")
            .attr("x", (d, i) => (radialScale(d.value) + (d.value === d3.max(playerStat, s => s.value) ? 0 : 40)) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (d, i) => (radialScale(d.value) + (d.value === d3.max(playerStat, s => s.value) ? 0 : 40)) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("text-anchor", function(d, i) {
            return (angleSlice * i > Math.PI) ? "end" : "start";
            })
            .attr("font-size", "14px")
            .attr("fill", "black")
            .text(d => d.axis);

        svg.append("circle")
            .attr("r", radius)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2);
    
    }, [data]);

    return (
        <div>
            <div>
                <h1></h1>
                <div><h4>TEAM: {team}</h4></div>
                <div><h4>NAME: {data?.player}</h4></div>
                <div><h4>AGE: {data?.age}</h4></div>
                <div><h4>Position: {data?.position}</h4></div>
            </div>
            <div>
                <div>
                    <h1>Bar Chart</h1>
                    <svg ref={svgRefBarchart}></svg>
                </div>
                <h1></h1>
                <h1></h1>
                <h1></h1>
                <div style={{margin: '100px'}}>
                    <h1>Donut Chart</h1>
                    <svg ref={svgRefDonutchart}></svg>
                    <p style={{fontSize : '10px'}}>[category: Goals, Assists, Penal-made, Penal-attemp]</p>
                </div>
                <h1></h1>
                <h1></h1>
                <h1></h1>
                <h1></h1>
                <div style={{margin: '100px'}}>
                    <h1>Radar Chart</h1>
                    <svg ref={svgRefRadarchart}></svg>
                </div>
            </div>
        </div>
    );
}

export default PlayerChart;