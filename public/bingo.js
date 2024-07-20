var arr=[[],[],[],[],[]]
var strikeoff=[[],[],[],[],[]]

for(let i=0;i<5;i++){
    for(let j=0;j<5;j++){
        strikeoff[i][j]=false;
    }
}
const login_screen = document.getElementById('loginpage');
const game_screen = document.getElementById('table')
const bingo_table=document.getElementById('bingotable')
const chat=document.getElementById('chatpage')
chatpage.style.display='none'
game_screen.style.display='none';
bingo_table.style.display='none';



export function startBingo(event){
    // <button onclick="getRandomArbitrary()">Next Number</button>
    event.preventDefault(); 

    login_screen.style.display='none';
    game_screen.style.display='';
    bingo_table.style.display='';
    chat.style.display='';

    let inputfield= document.getElementById("NickName")
    let nick= inputfield.value
    nick = nick.trim()
    if(nick==""){
        document.getElementById("incaseError").innerHTML="Please enter a name"
        return 
    }
    window.nick=nick
    console.log(nick)

    document.getElementById("printnickname").innerHTML="Welcome to the game: " + nick
    
    const element=document.getElementById("loginpage")
    element.remove();
    
    
    document.getElementById("welcomeheading").innerHTML="Welcome To Bingo!"
    
    let uni=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            let index=getRandomArbitrary(0,uni.length)
            console.log(index)
            arr[i][j]=(uni[index])
            uni.splice(index,1)  
        }
    }
    console.log(arr)

    let html = "<table><tbody>";
    for(let i=0;i<5;i++){
        html += '<tr>';

        for(let j=0;j<5;j++){
            html += `<td style="border: 1px solid black">`;
            let str=String(arr[i][j])
            html += `<p id="${i}x${j}" onclick="clickFunc(${i},${j})">${str}</p>`;
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</table></tbody>";
    console.log(html)
    document.getElementById("printtable").innerHTML = html;

    checkBingo();
    console.log(strikeoff)

}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function clickFunc(i,j,player){
    let element = document.getElementById(`${i}x${j}`);
    let content = element.innerHTML;
    content = `<span style='color:red'>${content}</s>`;
    element.innerHTML = content;
    strikeoff[i][j]=true
    //updating the elements which are clicked
}
function printRandomNumber(){
    let num=getRandomArbitrary()
    document.getElementById("RandomNumber").innerHTML= String(num)

}
// create a bingo table of 5 boxes("BINGO ")
// whenever u find a sequence add count , and display the count number of digits from string "bingo"
//if all content is visible the game ends


function checkBingo(){
    let bingoString="BINGO"
    let totalcount=0;
    let rowcount=0;
    let columncount=0;
    //checking row wise and column wise  
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            if(strikeoff[i][j]==true){
                rowcount++;
            }
            if(strikeoff[j][i]==true){
                columncount++
            }
        }
        if(rowcount==5){
            totalcount++;
        }
        if(columncount==5){
            totalcount++;
        }
        rowcount=0;
        columncount=0;
    }


    if(strikeoff[0][0]==true&&strikeoff[1][1]==true&&strikeoff[2][2]==true&&strikeoff[3][3]==true&&strikeoff[4][4]==true ){
        totalcount++;
    }
    if(strikeoff[0][4]==true&&strikeoff[1][3]==true&&strikeoff[2][2]==true&&strikeoff[3][1]==true&&strikeoff[4][0]==true ){
        totalcount++;
    }

    //run a loop from 0 to totalnumber and and keep adding letters from string bingostring
    if(totalcount>5){
        totalcount=5;
    }

    console.log(totalcount)
    for(let i=0;i<totalcount;i++){
        document.getElementById(i.toString()).innerHTML=bingoString[i];
    }
    
    
}   