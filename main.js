

//不提升成全局变量，浏览器读不到，怎么解决？


// window.onload =function(){

// let canvas1=document.getElementById('xxx');
// let context=canvas1.getContext('2d');//获取2d上下文，来作画
// context.style='black';//先改 变笔的颜色再画
// context.fillRect(0,0,100,100);
let canvas=document.getElementById("xxx")//首先拿到我要操作的元素
let context=canvas.getContext('2d');//获取2d上下文，来作画

listenToUser(canvas);

pen.onclick=function(){
    pen.classList.add('active');
    eraser.classList.remove('active');
}
eraser.onclick=function(){
    eraser.classList.add('active');
    pen .classList.remove('active');
}

red.onclick=function(){
    context.strokeStyle="red";
    red.classList.add('active');
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick=function(){
    context.strokeStyle="green";
    green.classList.add('active');
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick=function(){
    context.strokeStyle="blue";
    blue.classList.add('active');
    red.classList.remove('active')
    green.classList.remove('active')
}
//只有用这个属性才能做成全屏画布
setCanvasSize();

//用户改变也能维持全屏，但画的东西不见了
// window.onresize=function(){
//     setCanvasSize();
// }
//重点！！有这一段代码就无法在手机下运行？？

//硬背,获取用户页面宽高
function setCanvasSize(){
    let pageWidth=document.documentElement.clientWidth;
    let pageHeight=document.documentElement.clientHeight;
    canvas.width=pageWidth;
    canvas.height=pageHeight;
    }




// //在画布上操作，用画步调用api
// canvas.ontouchstart=function(aaa){
// console.log(aaa);
// painting=true;
// x=aaa.touches[0].clientX;
// y=aaa.touches[0].clientY;
// lastPoint={"x":x, "y":y};
// // drawCircle(x,y,3); //没有画这个圈其实也能用，可以删掉
// }
// // }
// canvas.ontouchmove=function(aaa){
//     x=aaa.touches[0].clientX;
//     y=aaa.touches[0].clientY;
//     let newPoint={"x":x,"y":y};
//     if(painting){   //写if(painting＝true不行，why????)
  
//     drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
//     lastPoint=newPoint;
//     }
//     else{}
// }

// canvas.onmouseup=function(aaa){
//     painting=false;
// }

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.lineWidth=4;
    // context.strokeStyle='green'; //不把筆的顏色寫死 
    context.stroke();
    context.closePath();
}
function drawCircle(x,y,radius){
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2);
    
    context.fill();
    }

function listenToUser(canvas){
    
    var using=false;
    var lastPoint={x:undefined, y:undefined}

    //坑，浪费好久测不出来！！在浏览器测试的时候务必常按刷新！！
    //特性检测：检测是否为触屏设备
    if(document.body.ontouchstart!==undefined){ //代表为触屏设备
        canvas.ontouchstart=function(aaa){
           
            using=true;
            x=aaa.touches[0].clientX;
            y=aaa.touches[0].clientY;
            lastPoint={"x":x, "y":y};
            // drawCircle(x,y,3); //没有画这个圈其实也能用，可以删掉
            }

            canvas.ontouchmove=function(aaa){
                x=aaa.touches[0].clientX;
                y=aaa.touches[0].clientY;
                let newPoint={"x":x,"y":y};
                if(using){   //写if(painting＝true不行，why????)
              
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint=newPoint;
                }
                else{}
            }

//没有ontouchend函数，画笔也不会停，why?




    }else {
        canvas.onmousedown=function(aaa){
            console.log(aaa);
            using=true;
            x=aaa.clientX;
            y=aaa.clientY;
            lastPoint={"x":x, "y":y};
            drawCircle(x,y,3); //没有画这个圈其实也能用，可以删掉
            }
            // }
            canvas.onmousemove=function(aaa){
                x=aaa.clientX;
                y=aaa.clientY;
                let newPoint={"x":x,"y":y};
                if(using){   //写if(painting＝true不行，why????)
              
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint=newPoint;
                }
                else{}
            }
            
            canvas.onmouseup=function(aaa){
                using=false;
            }
        }



}
