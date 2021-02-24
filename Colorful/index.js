const Discord = require("discord.js")
const {prefix,tokenDiscord, giphyToken} = require("./config.json")
const GphApiClient = require('giphy-js-sdk-core')
// https://discordapp.com/oauth2/authorize?client_id=723974001352769620&scope=bot&permissions=268443648
//const suport = require("./Scripts/Extras/suport.js")


const client = new Discord.Client()
const embed = new Discord.MessageEmbed()

const giphy = GphApiClient(giphyToken)

var doRainbow = []
const colors = ["16711680","16744192","16776960","65280","255","4915330","9699539"]
const colorsHex = ["#ff0000","#ff7f00","#ffff00","#00ff00","#0000ff","#4b0082","#9400d3"]

client.once('ready', () => {
    console.log('Bot is Running')
})


client.on('message', message => {
    if(message.content.startsWith(`${prefix}`)){
        
        var user = message.member
        var guild = message.guild
        var channel = message.channel
        var content = message.content.toLowerCase()
        var commandMessage = content.split(" ")
        var command = commandMessage[1]
        var result = "command invalid"
        if(commandMessage.length>2){
            var input  = joinInput(commandMessage)
            switch(command){
                //color set
                case "use":{
                    result = setColor(guild, user, input, true)
                    break
                }
                case "color":{
                    result = isColor(commandMessage[2])
                    if(result)result=embed
                    else result=`The Color ${commandMessage[2]} is invalid`
                    break
                }
                case "saygif":{
                    let gif = sendGif(channel, user, input)
                    break
                } 
                default:{
                    result = "command invalid"
                    break
                }
            }
        }else if(commandMessage.length>1){
            switch(command){
                //color set
                case "help":{
                    result = help()
                    break
                }
                case "startrainbow":{ 
                    result = startRainbow(guild, user)
                    break
                }
                case "stoprainbow":{ 
                    result = stopRainbow(user)
                    break
                }
                default:{
                    result = "command invalid"
                    break
                }
            }
        }else
            result = "command invalid"
        channel.send(result).catch(console.error);      
    }
})

let joinInput = (commandMessage) => {
    let input = commandMessage[2]
    for(let i=3; i<commandMessage.length; i++)
        input += ` ${commandMessage[i]}`
    console.log(input)
    return input
}

let startRainbow = (guild, user) => {
    if(doRainbow==undefined){
        doRainbow = [user]
        loopRainbow(guild, user)
        return "The Rainbow Mode started"   
    }
    else if(doRainbow.indexOf(user)>-1){
        return "The Rainbow Mode is already running"
    }   
    else{
        doRainbow.push(user)
        loopRainbow(guild, user)
        return "The Rainbow Mode started"
    }
}

let stopRainbow = (user) => {
    var index = doRainbow.indexOf(user)
    if(index===-1){
        return "The Rainbow Mode is not running"
    }else{
        doRainbow.splice(index)
        return "The Rainbow Mode stopped"
    }
}

async function loopRainbow(guild, user){
    console.log("loop started")
    var indexC = 0
    console.log(`Rainbow: ${user.displayName}`);

        setInterval(function() {
            setColor(guild, user, colorsHex[indexC], false)
            indexC = (indexC+1)%7
            if(doRainbow.indexOf(user)===-1)return
        }, 5000);

    console.log(`Rainbow: ended`);
}
   
async function sendGif(channel, user, search){
    await giphy.search('gifs',{'q':`${search}`})
        .then((response) => {
            var totalResponses = response.data.length;
            var responseIndex = Math.floor(Math.random() * totalResponses); 
            console.log(response.data[responseIndex].images.fixed_height.url);
            channel.send(`${user.displayName} say: ${search}`,{files:[response.data[responseIndex].images.fixed_height.url]})
        })
        .catch(console.error)
}

//check if a color valid
let isColor = (color) => {
  let test = /^#[0-9A-F]{6}$/i.test(color);
  if(test){
    console.log(`The Color ${color} is valid`);
    embed.setColor(color)
	    .setTitle(`The Color ${color} is valid`)
    return true;
  } else{
    console.log(`The Color ${color} is invalid`);
    return false; 
  }
}

let cutHex = (hex) => {return (hex.charAt(0)=="#") ? hex.substring(1,7):hex}
let HexToRGB = (hex) => {
    let r = parseInt((cutHex(hex)).substring(0,2),16)
    let g = parseInt((cutHex(hex)).substring(2,4),16)
    let b = parseInt((cutHex(hex)).substring(4,6),16)
    return `${r}${g}${b}`
  }

let RGBToHex = (R,G,B) => {return toHex(R)+toHex(G)+toHex(B)}
let toHex = (n) => {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
} 

function HexToDec(hex){
    return parseInt((hex.slice(1)), 16);
  }

let getRoleUser = (user) => {
    let role = user.roles.cache.find(role => role.name === 'Colorful Life')
    return role
}

let getRoleGuild = (guild, color) => {
    let role = guild.roles.cache.find(role => role.color === HexToDec(color))
    return role
}

let checkRoleGuild = (guild, color) => {
    let membersWithRole = guild.members.cache.filter(member => { 
        return member.roles.cache.find(role => role.color === color);
    }).map(member => {
        return member.user.username;
    })
    return membersWithRole
}

let deleteRoleGuildAll = (guild) =>{
    let serverMember = guild.members.cache.map(member => {
        deleteRoleUser(member.user)
        return member.user.username;
    })
    
    if(membersWithRole<1)
        role.delete()
            .then(console.log("The role was sucessfully deleted"))
            .catch(console.error)

    else console.log("You dont have a Colorful Life Role")
    }

    let deleteRoleGuild = (guild, role, del) =>{
        if(del){
            let color=role.color
            let membersWithRole = checkRoleGuild(guild, color)
            if(membersWithRole<1)
                role.delete()
                    .then(console.log("The role was sucessfully deleted"))
                    .catch(console.error)
        
            else console.log("You dont have a Colorful Life Role")
        }
        console.log("The Rainbow Role will not be deleted")
    }

let deleteRoleUser = (user) =>{
    let role=getRoleUser(user)
    if(role)
        role.delete()
            .then(console.log("The role was sucessfully deleted"))
            .catch(console.error)
    
    else console.log("You dont have a Colorful Life Role")
    }
        
    

//check if a user have a required Role and change its color to the given one and if not it gives it to him
function setColor(guild, user, color, del){
    if(isColor(color)){
        var role = getRoleUser(user)
        //user has a role
        if(role){
            user.roles.remove(role)
                //The Role was removed with sucess
                .then(() => {
                    console.log("Actual Role removed")   
                    deleteRoleGuild(guild, role, del)
                })
                    
                //An error happened when giving the Role
                .catch(console.error)
        }
        //user has not a role
        console.log("Role can be added")
        //now adding another
        let addRole = addColorRole(guild, user, color)

        if(addRole){
            //The Role was give with sucess
            console.log(`The Role was added`);
            return `${user} - Your Color changed to ${color}`
        }else{
            //An error happened when giving the Role
            console.log(`The Role was not added`);
            return `${user} - A error happened when adding Color ${color}`
        }
    }else
        return `${user} - The Color ${color} is invalid` 
}

// Give a user a Role with color, if its not exist it create a new one
async function addColorRole(guild, user, color){
    let role = getRoleGuild(guild, color)
    if(role){
        //The role does exist
        let role = getRoleGuild(guild, color)
        user.roles.add(role)
            .then(() => {
                console.log("Role Colorful added")
                //The Role was give with sucess
                return true})

            .catch(() => {
                console.error
                //An error happened when giving the Role
                return false})
    }else{
        //The Role doesn't exisst
        createRole(guild, color).then(()=>{
            return addColorRole(guild, user, color)
        })    
    }
}

// Create a new role with a color with data and a reason
async function createRole(guild, color){
    await guild.roles.create({
    data: {
      name: 'Colorful Life',
      color: color
    }
  })
    .catch(console.error);
}

client.login(tokenDiscord)