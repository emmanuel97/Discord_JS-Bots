const Discord = require("discord.js")
const {prefix,tokenDiscord} = require("./config.json")


const suport = require("./Scripts/Extras/suport.js")

const Resources = require("./Scripts/Actions/resources.js")
const battle = require("./Scripts/Actions/battle.js")
const player = require("./Scripts/Actions/player.js")
const travel = require("./Scripts/Actions/travel.js")

/*
const academy = require("./Scripts/Buildings/academy.js")
const arena = require("./Scripts/Buildings/arena.js")
const bank = require("./Scripts/Buildings/bank.js")
const beastmaster = require("./Scripts/Buildings/beastmaster.js")
const blacksmith = require("./Scripts/Buildings/blacksmith.js")
const church = require("./Scripts/Buildings/church.js")
const guildA = require("./Scripts/Buildings/guildA.js")
const guildP = require("./Scripts/Buildings/guildP.js")
const inn = require("./Scripts/Buildings/inn.js")
const magic = require("./Scripts/Buildings/magic.js")
const market = require("./Scripts/Buildings/market.js")
const portal = require("./Scripts/Buildings/portal.js")
const stables = require("./Scripts/Buildings/stables.js")
const training = require("./Scripts/Buildings/training.js")
*/

const client = new Discord.Client()

client.once('ready', () => {
    console.log('Bot is Running')
})


client.on('message', message => {
    if(message.content.startsWith(`${prefix}`)){
        
        var sender = message.member
        var commandMessage = message.content.split(" ") //"!kick me".split(" ")
        var commandPrefix = commandMessage[0]
        var mentions = message.mentions.members.array() || new Array();

        var result = ""
        switch(commandPrefix){
            
            //resources
            case "!axe":{
                result = Resources.axe(sender)
                break
            }
            case "!mine":{
                result = resources.mine(sender)
                break
            }case "!test":{
                break
            }default:{
                result = "command invalid"
                break
            }
        }
        message.channel.send(result)
        //message.channel.send(mentions.length)
        //message.channel.send(mentions[0].id)
        //console.log(message.guild.members.cache.get(mentions[0].id));
        //console.log(mentions)
    }
})

client.login(tokenDiscord)

            //travel

            //shop

            //craft

            //player




            /*
            case "!go":{
                travel.go(sender, commandMessage[1])
                break
            }case "!travel":{
                travel.travel(sender, commandMessage[1])
                break
            }case "!trade":{
                player.trade(sender, mentions[0])
                break
            }case "!consume":{
                player.consume(sender, commandMessage[1])
                break
            }case "!equip":{
                player.equip(sender, commandMessage[1])
                break
            }case "!unequip":{
                player.unequip(sender, commandMessage[1])
                break
            }case "!drop":{
                player.drop(sender, commandMessage[1])
                break
            }case "!profession" || "pr":{
                player.getProfession(sender, commandMessage[1])
                break
            */
