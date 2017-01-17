/*
0、
┏━━━┳━━━┳━━━┳━━━┓
┃   ┃   ┃   ┃   ┃
┗━━━┻━━━┻━━━┻━━━┛

1、
┏━━━┳━━━┓
┃   ┃   ┃   
┣━━━╋━━━┫
┃   ┃   ┃
┗━━━┻━━━┛

2、					3、
┏━━━┓                     ┏━━━┓
┃   ┃                     ┃   ┃
┣━━━╋━━━┳━━━┓     ┏━━━┳━━━╋━━━┫
┃   ┃   ┃   ┃     ┃   ┃   ┃   ┃
┗━━━┻━━━┻━━━┛     ┗━━━┻━━━┻━━━┛    

4、				5、
    ┏━━━┳━━━┓     ┏━━━┳━━━┓ 
    ┃   ┃   ┃     ┃   ┃   ┃
┏━━━╋━━━╋━━━┛     ┗━━━╋━━━╋━━━┓
┃   ┃   ┃             ┃   ┃   ┃
┗━━━┻━━━┛             ┗━━━┻━━━┛

6、
    ┏━━━┓
    ┃   ┃
┏━━━╋━━━╋━━━┓
┃   ┃   ┃   ┃
┗━━━┻━━━┻━━━┛

*/
var RECTANGLE_WIDTH=30;		//矩形宽度
var SPEED=1;
var blocks=[
		[
			[1,1,1,1]
		],
		[
			[1,1],
			[1,1]
		],
		[
			[1,0,0],
			[1,1,1]
		],
		[
			[0,0,1],
			[1,1,1]
		],
		[
			[0,1,1],
			[1,1,0]
		],
		[
			[1,1,0],
			[0,1,1]
		],
		[
			[0,1,0],
			[1,1,1]
		]
	];

/*
(弃用)绘制矩形
(x,y)起点坐标
cxt画布
*/
function drawRectangle(x,y,cxt){
	cxt.beginPath();
	cxt.moveTo(x,y);
	cxt.lineTo(x+RECTANGLE_WIDTH,y);
	cxt.lineTo(x+RECTANGLE_WIDTH,y+RECTANGLE_WIDTH);
	cxt.lineTo(x,y+RECTANGLE_WIDTH);
	cxt.closePath();

	cxt.strokeStyle="black";
	cxt.fillStyle="yellow";

	cxt.fill();
	cxt.stroke();
}

/*
绘制俄罗斯方块
(x,y):起点坐标
cxt:画布
num:随机产生的方块序号（0~6）
*/
function drawBlock(x,y,cxt,num){
	cxt.fillStyle="yellow";
	cxt.strokeStyle="black";
	if(num>=0 && num<7){
		var black=blocks[num];
		for (var i = 0; i < black.length; i++) {
			for (var j = 0; j < black[i].length; j++) {
				if(black[i][j]==1){
					cxt.fillRect(x+j*RECTANGLE_WIDTH,y+i*RECTANGLE_WIDTH,RECTANGLE_WIDTH,RECTANGLE_WIDTH);
					cxt.strokeRect(x+j*RECTANGLE_WIDTH,y+i*RECTANGLE_WIDTH,RECTANGLE_WIDTH,RECTANGLE_WIDTH);
					//drawRectangle(x+j*RECTANGLE_WIDTH,y+i*RECTANGLE_WIDTH,cxt);
				}
			}
		}
	}
}

/*
生成方块
*/
function renderBlock(cxt){
	var cow=Math.floor(WINDOW_WIDTH/RECTANGLE_WIDTH);	//总列数
	var num=Math.floor(Math.random()*7);
	var x=Math.floor(Math.random()*(cow-3))*RECTANGLE_WIDTH;
	var y=0;
	if(moveBlock==null){
		drawBlock(x,y,cxt,num);
		moveBlock={x:x,y:y,num:num};
	}
}

/*
向下移动方块
*/
function downBlock(cxt){
	if(moveBlock!=null){
		var blockHeight=blocks[moveBlock.num].length;
		if(moveBlock.y+blockHeight*RECTANGLE_WIDTH*SPEED<WINDOW_HEIGHT){
			cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
			moveBlock.y=moveBlock.y+RECTANGLE_WIDTH*SPEED;
			drawBlock(moveBlock.x,moveBlock.y,cxt,moveBlock.num);
		}else{
			staticBlocks.push(moveBlock);
			moveBlock=null;
		}
	}
}

/*
绘制边线
*/
function drawLines(cxt){
	var row=Math.floor(WINDOW_HEIGHT/RECTANGLE_WIDTH);	//总行数
	var cow=Math.floor(WINDOW_WIDTH/RECTANGLE_WIDTH);	//总列数
	cxt.strokeStyle="#ccc";
	//绘制横线
	for (var i = 1; i < row; i++) {
		cxt.beginPath();
		cxt.moveTo(0,RECTANGLE_WIDTH*i);
		cxt.lineTo(WINDOW_WIDTH,RECTANGLE_WIDTH*i);
		cxt.closePath();
		cxt.stroke();
	}
	//绘制竖线
	for (var i = 1; i < cow; i++) {
		cxt.beginPath();
		cxt.moveTo(RECTANGLE_WIDTH*i,0);
		cxt.lineTo(RECTANGLE_WIDTH*i,WINDOW_HEIGHT);
		cxt.closePath();
		cxt.stroke();
	}
}

/*
绘制静态方块
*/
function drawStatic(cxt){
	for (var i = 0; i < staticBlocks.length; i++) {
		drawBlock(staticBlocks[i].x,staticBlocks[i].y,cxt,staticBlocks[i].num);
	}
	document.getElementById("blockCount").innerHTML=staticBlocks.length+1;
}

/*
移动方块
*/
function moveBlock(cxt){
	
}

function doKeyDown(e) {  
    var keyID = e.keyCode ? e.keyCode :e.which;
    if(moveBlock==null) return;
    switch(keyID){
    	case 37:  			//←
    		if(moveBlock.x>0)		moveBlock.x-=RECTANGLE_WIDTH;
    		break;
    	case 39:  			//→
     		if(moveBlock.x+blocks[moveBlock.num][0].length*RECTANGLE_WIDTH<WINDOW_WIDTH)	moveBlock.x+=RECTANGLE_WIDTH;
    		break;
    	case 40:  			//↓
    		if(moveBlock.y+blocks[moveBlock.num].length*RECTANGLE_WIDTH<WINDOW_HEIGHT)		moveBlock.y+=RECTANGLE_WIDTH;
    	default:
    		break;
    }
}