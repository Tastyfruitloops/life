function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class cell
{
    constructor(alive,x,y)
    {
        this.isAlive=alive;
        this.x=x;
        this.y=y;
        this.markAlive=false;
        this.markDead=false;
    }
}


let wh=0;
let ww=0;
let gen=[];
function initGeneration(height, width)
{
    gen=[];
    wh=height;
    ww=width;
    for (let i=0;i<height;i++)
    {
        let line=[];
        for (let j=0;j<width;j++)
        {
            let a=new cell(false,i,j);
            line.push(a);
            //console.log(a);
        }
        gen.push(line);
    }
    //alert(wh);
    //alert(ww);
}



function getGeneration()
{
    return gen;
}

function changeGeneration(x,y)
{
    gen[x][y].isAlive=(!gen[x][y].isAlive);
}


function turnAlive(x,y,newgen)
{
    let nearAlive=0;

    for (let i=x-1;i<=x+1;i++)
    {
        for (let j=y-1;j<=y+1;j++)
        {
            if (i==x&&j==y) {continue;}
            let a,b;
            if (i<0) {a=wh-1;} 
            else
            {
               if (i>wh-1) {a=0;} else {a=i;} 
            }
            
            if (j<0) {b=ww-1;} else 
            {
                if (j>ww-1) {b=0;} else {b=j;}
            }
            
            if (gen[a][b].isAlive) {nearAlive++;}
        }
    }
    if (nearAlive<2&&newgen.isAlive==true) {newgen.markDead=true;}
    if (nearAlive==3&&newgen.isAlive==false) {newgen.markAlive=true;}
    if (nearAlive>=4&&newgen.isAlive==true) {newgen.markDead=true;}
    return newgen;
}

function newGeneration()
{

    for (let i=0;i<gen.length;i++)
    {
        for (let j=0;j<gen[0].length;j++)
        {
            turnAlive(i,j,gen[i][j]);
        }
    }
    for (let i=0;i<gen.length;i++)
    {
        for (let j=0;j<gen[0].length;j++)
        {
            if (gen[i][j].markAlive)
            {
                gen[i][j].isAlive=true;
            }
            if (gen[i][j].markDead)
            {
                gen[i][j].isAlive=false;
            }
            gen[i][j].markAlive=false;
            gen[i][j].markDead=false;
        }
    }
}

function genRand()
{
    let mx=(wh*ww)/5;
    for (let i=0;i<mx;i++)
    {
        gen[getRandomInt(wh)][getRandomInt(ww)].isAlive=true;
    }
}