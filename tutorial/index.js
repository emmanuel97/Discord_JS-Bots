const Discord = require("discord.js");
const {prefix, token,giphyToken} = require("./config.json");
const GphApiClient = require('giphy-js-sdk-core')

const giphy = GphApiClient(giphyToken)
const client = new Discord.Client();

client.once('ready', () =>{
    console.log('I\'m ready');
})


client.on('message' , message =>{
    //console.log(message.content);
    if(message.member.hasPermission(['KICK_MEMBERS','BAN_MEMBERS'])){
        
        if(message.content.startsWith(`${prefix}kick`)){
        // message.channel.send('Kick')

        let member= message.mentions.members.first();
        member.kick().then((member) =>{
            giphy.search('gifs',{'q':'fail'})
                .then((response) => {
                    var totalResponses = response.data.length;
                    var responseIndex = Math.floor(Math.random() * totalResponses); 
                    //console.log(responseIndex)
                    message.channel.send(`:wave: ${member.displayName}, Kicked like Jackie Chang`,{
                        files:[response.data[responseIndex].images.fixed_height.url]
                    })
                })
            
            })
            
        }
    } 
})



client.login(token);