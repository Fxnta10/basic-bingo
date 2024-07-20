export const SOCKET_MESSAGE_TYPES = {
    CHAT_MESSAGE: {
        label: "CHAT_MESSAGE",
        toStr: function(username, message){
            return JSON.stringify({username, message});
        },
        fromStr: function(str){
            return JSON.parse(str);
        }
    },
}



// var dataStr = `{"name": "username", "message": "message"}`;
// var data = JSON.parse(dataStr);
// console.log(data.a.c.d)
// console.log(JSON.stringify(data))