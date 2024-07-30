const arr = [[], [], [], [], []];
const strikeoff = [[], [], [], [], []];
const gameMap = new Map();

const login_screen = document.getElementById('loginpage');
const game_screen = document.getElementById('table');
const bingo_table = document.getElementById('bingotable');
const chat = document.getElementById('chatpage');

chat.style.display = 'none';
game_screen.style.display = 'none';
bingo_table.style.display = 'none';

window.clickFunc=function(i, j) {
    const element = document.getElementById(`${i}x${j}`);
    let content = element.innerHTML;
    content = `<span style='color:red'>${content}</span>`;
    element.innerHTML = content;
    strikeoff[i][j] = true;
    console.log(strikeoff);
    checkBingo();
}

export function startBingo(event, gameCode) {
    event.preventDefault(); 

    login_screen.style.display = 'none';
    game_screen.style.display = '';
    bingo_table.style.display = '';
    chat.style.display = '';

    const inputfield = document.getElementById("NickName");
    let nick = inputfield.value.trim();
    if (nick === "") {
        document.getElementById("incaseError").innerHTML = "Please enter a name";
        return;
    }
    window.nick = nick;
    console.log(nick);

    document.getElementById("printrandomnum").innerHTML=getRandomArbitrary(1,25)

    document.getElementById("printnickname").innerHTML = `Welcome to the game: ${nick}<br>Code: ${gameCode}`;
    document.getElementById("loginpage").remove();
    document.getElementById("welcomeheading").innerHTML = "Welcome To Bingo!";

    const uni = Array.from({ length: 25 }, (_, i) => i + 1); // 1 to 25
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const index = getRandomArbitrary(0, uni.length);
            arr[i][j] = uni[index];
            uni.splice(index, 1);
        }
    }
    console.log(arr);
    
    let html = "<table><tbody>";
    for (let i = 0; i < 5; i++) {
        html += '<tr>';
        for (let j = 0; j < 5; j++) {
            html += `<td style="border: 1px solid black">`;
            let str = String(arr[i][j]);
            html += `<p class='bingotablebuttons' id="${i}x${j}" onclick="clickFunc(${i},${j})">${str}</p>`;
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</table></tbody>";
    document.getElementById("printtable").innerHTML = html;
}

export function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomCode() {
    return Math.floor(1000 + Math.random() * 9000);
}

window.checkBingo = function() {
    const bingoString = "BINGO";
    let totalcount = 0;
    
    for (let i = 0; i < 5; i++) {
        let rowcount = 0;
        let columncount = 0;

        for (let j = 0; j < 5; j++) {
            if (strikeoff[i][j]) rowcount++;
            if (strikeoff[j][i]) columncount++;
        }

        if (rowcount === 5) totalcount++;
        if (columncount === 5) totalcount++;
    }

    if (strikeoff[0][0] && strikeoff[1][1] && strikeoff[2][2] && strikeoff[3][3] && strikeoff[4][4]) {
        totalcount++;
    }
    if (strikeoff[0][4] && strikeoff[1][3] && strikeoff[2][2] && strikeoff[3][1] && strikeoff[4][0]) {
        totalcount++;
    }

    if (totalcount > 5) {
        totalcount = 5;
    }

    console.log("The total count is: ", totalcount);
    for (let i = 1; i < totalcount+1; i++) {
        document.getElementById(i.toString()).innerHTML = bingoString[i-1];
    }
}

export function CreateRoomFunction(e) {
    let gameCode;
    do {
        gameCode = getRandomCode();
    } while (gameMap.has(gameCode));

    gameMap.set(gameCode, 1);
    console.log(gameCode);
    console.log("Number of users in room", gameMap.get(gameCode));
    startBingo(e, gameCode);
}

export function joinRoomFunction(e) {
    const roomCodeInputField = document.getElementById('codeInput');
    const roomCode = roomCodeInputField.value;

    if (!gameMap.has(roomCode)) {
        console.log("Room does not exist");
        document.getElementById('incaseRommFull').innerHTML = "Room does not exist, re-enter a valid code.";
        return;
    }

    let userCount = gameMap.get(roomCode);
    if (userCount >= 2) {
        console.log("Room is full");
        document.getElementById('incaseRommFull').innerHTML = "Room is full, re-enter a new code.";
        return;
    }

    gameMap.set(roomCode, userCount + 1);
    console.log("Number of users in room", gameMap.get(roomCode));
    startBingo(e, roomCode);
}
