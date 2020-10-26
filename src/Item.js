import React, {useEffect, useState, useRef} from 'react';
import {draw} from './Canvas.js';


function Item({ x, setX, v, setV, a, setA, date, onBtn, startOpac, color, winDim }) {
  const canvasRef = useRef(null);
  const firstUpdate = useRef(true);
  const [imgData, setImgData] = useState(null);
  
  const d = 250;
  const l = (d/2)*Math.sqrt(2);
  
  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas.getContext('2d');
    
    if(color !== "nop"){
      context.fillStyle = color;
      context.fillRect(0,0,2*l,2*l);
      setImgData(context.getImageData(0,0,2*l,2*l));
    }
    else
    {
      let img = new Image();
      img.onload = () => {
        img.crossOrigin = "Anonymous";
        context.drawImage(img,0,0);
        setImgData(context.getImageData(0,0,2*l,2*l));
      }
      img.src = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&w=1000&q=80";
    }
  }, [color])
  
  useEffect(()=>{
    let canvas = canvasRef.current;
    let context = canvas.getContext('2d');
    
    let pos = x+d/2;
    
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    else if(pos > winDim.width-startOpac-l/2){
      let a = (pos-(winDim.width-startOpac)-1.5*l)/(-2*l);
      draw(context, imgData, 2*l, false, false, a);
      if(x>winDim.width) setX(-2*l);
    }
    else if(pos < startOpac+l/2){
      let a = (pos-startOpac+1.5*l)/(2*l);
      if(imgData !== null) draw(context, imgData, 2*l, true, false, a);
      if(x < -2*l) setX(winDim.width);
    }
        
    if(v !== 0 && !onBtn) {
      setA(a=>-v/20);
      if(v<0.2 && v>-0.2){ 
        setV(0);
        setA(0);
      }
    }
    
    if((v<=8 || a<=0) && (v>=-8 || a>=0)) setV(v=>v+a);
    setX(x=>x+v);
  },[date]);

  return(
    <div className="item" style={{left: x}}>
      <canvas id="canvas" ref={canvasRef} width={2*l} height={2*l}>
      </canvas>
      <div className="text">Hello</div>
    </div>
  )
}

export default Item;