import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Item from './Item.js';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function App({date}) {
  const winDim = getWindowDimensions();
  const [x,setX] = useState(0);
  const [v,setV] = useState(0);
  const [a,setA] = useState(0);
  const [onBtn, setOnBtn] = useState(false);
  const [color, setColor] = useState("nop");
  
  const startOpac = 300;
  const d = 250;
  const l = (d/2)*Math.sqrt(2);
    
  const handleMouseOver = (side) => {
    setOnBtn(true);
    if(side === "right") setA(0.2);
    else setA(-0.2);
  }
  
  const handleMouseOut = (side) => {
    setOnBtn(false);
    setA(0);
  }
  
  const handleChangeBtn = () => {
    if(color === "rgba(100,200,0,1)") setColor("nop");
    else setColor("rgba(100,200,0,1)");
  }
  
  return (
    <div className="body">
      <button onClick={handleChangeBtn} className="change-btn">change</button>
      <button onMouseEnter={() => handleMouseOver("left")} onMouseLeave={() => handleMouseOut("left")} className="scrl-btn left-scrl-btn">left</button>
      <Item 
        x={x} setX={setX}
        v={v} setV={setV}
        a={a} setA={setA}
        date={date}
        onBtn={onBtn}
        startOpac={startOpac}
        color={color}
        winDim={winDim}
      />
      {/*<div className="bar" style={{left: x+d/2-3}}></div>*/}
      <div className="bar indicator" style={{left: startOpac-3}}></div>
      <div className="bar indicator" style={{left: startOpac-l-3}}></div>
      <div className="bar indicator" style={{left: winDim.width-startOpac+l-3}}></div>
      <div className="bar indicator" style={{left: winDim.width-startOpac-3}}></div>

      <h1>{date.toLocaleTimeString()}</h1>
      <button onMouseEnter={() => handleMouseOver("right")} onMouseLeave={() => handleMouseOut("right")} className="scrl-btn right-scrl-btn">right</button>
    </div>
  );
}

export default App;

