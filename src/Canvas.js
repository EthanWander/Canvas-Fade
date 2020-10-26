const draw = (ctx, imgData, side, left, top, mid) => {  
  function opacity(x,a,r,inverted) {
    let val;
    if(x <= a-r) val = 0;
    else if(x >= a+r) val = 1;
    else {
      val = x - a + r;
      val *= Math.PI/(2*r);
      val = -Math.cos(val)/2 + 0.5;
    }
    if(inverted) return -val+1; // from 1 to 0
    return val; // from 0 to 1
  }
    
  let newImgData = ctx.createImageData(side,side);
  let opac = 255;
  side = Math.floor(side);
    
  if(left){
    if(top){
      for(let i=0; i<side; i++){ // row
        for(let j=0; j<side; j++){ // column
          opac = opacity(j+i,2*(1-mid)*side,120,false);
          let index = 0;
          for(let k=0; k<3; k++){
            index = ((i * (newImgData.width * 4)) + (j * 4)) + k;
            newImgData.data[index] = imgData.data[index];
          }
          index = ((i * (newImgData.width * 4)) + (j * 4)) + 3;
          newImgData.data[index] = imgData.data[index]*opac;
        }
      } // FROM TOP LEFT 
    }
    else{
      for(let i=0; i<side; i++){ // row
        for(let j=0; j<side; j++){ // column
          opac = opacity(j+side-i,2*(1-mid)*side,120,false);
          let index = 0;
          for(let k=0; k<3; k++){
            index = ((i * (newImgData.width * 4)) + (j * 4)) + k;
            newImgData.data[index] = imgData.data[index];
          }
          index = ((i * (newImgData.width * 4)) + (j * 4)) + 3;
          newImgData.data[index] = imgData.data[index]*opac; 
        }  
      } // FROM BOTTOM LEFT
    }
  } 
  else{
    if(top){
      for(let i=0; i<side; i++){ // row
        for(let j=0; j<side; j++){ // column
          opac = opacity(j+side-i,2*mid*side,120,true);
          let index = 0;
          for(let k=0; k<3; k++){
            index = ((i * (newImgData.width * 4)) + (j * 4)) + k;
            newImgData.data[index] = imgData.data[index];
          }
          index = ((i * (newImgData.width * 4)) + (j * 4)) + 3;
          newImgData.data[index] = imgData.data[index]*opac;
        }
      } // FROM TOP RIGHT
    }
    else{
      let x;
      let y;
      let index;
      for(let i=0; i<2*side-1; i++){ // row
        opac = opacity(i,2*mid*side,120,true);
        x=0;
        y=i;
        if(i<side){
          for(let j=0; j<=i; j++){ // column  
            index = 0;
            for(let k=0; k<3; k++){
              index = ((y * (newImgData.width * 4)) + (x * 4)) + k;
              newImgData.data[index] = imgData.data[index];
            }
            index = ((y * (newImgData.width * 4)) + (x * 4)) + 3;
            newImgData.data[index] = imgData.data[index]*opac;  
            x++;
            y--;
          }
        }
        else{
          x=i-side;
          y=side-1;
          for(let j=0; j<2*side-1-i; j++){ // column  
            index = 0;
            for(let k=0; k<3; k++){
              index = ((y * (newImgData.width * 4)) + (x * 4)) + k;
              newImgData.data[index] = imgData.data[index];
            }
            index = ((y * (newImgData.width * 4)) + (x * 4)) + 3;
            newImgData.data[index] = imgData.data[index]*opac;  
            x++;
            y--;
          }
        }
      }  // FROM BOTTOM RIGHT
    }
  }
    
  ctx.putImageData(newImgData, 0, 0);
  
}

export {draw};