const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: false});
const config = process.env;
const messaging = require("./messaging.js");
const moment = require('moment-timezone');

var prefix = config.prefix;

client.on("ready", () => {
    console.log(`${client.user.username} está preparado!`);
    client.user.setActivity("use !help to start using me :D");   
});

client.on("message", async message => {
    const input = message.content.slice(prefix.length).trim().split(' ');
	command = input.shift();
	commandArgs = input.join(' ');

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;    
    
    switch(command) {
        case "tezza":
            saveAndSendBossMessage(message, commandArgs, "Frintezza", config.frintezza_channel);
            sendScheduledMessage(config.frintezza_time, "Respawn of **Frintezza** starts NOW!");
            break;
        case "zaken":
            saveAndSendBossMessage(message, commandArgs, "Zaken", config.zaken_channel);
            sendScheduledMessage(config.zaken_time, "Respawn of **Zaken** starts NOW!");
            break;
        case "baium":
            saveAndSendBossMessage(message, commandArgs, "Baium", config.baium_channel);
            sendScheduledMessage(config.baium_time, "Respawn of **Baium** starts NOW!");
            break;
        case "antharas":
            saveAndSendBossMessage(message, commandArgs, "Antharas", config.antharas_channel);
            sendScheduledMessage(config.antharas_time, "Respawn of **Antharas** starts NOW!");
            break;
        case "valakas":
            saveAndSendBossMessage(message, commandArgs, "Valakas", config.valakas_channel);
            sendScheduledMessage(config.valakas_time, "Respawn of **Valakas** starts NOW!");
            break;
        case "QA":
            saveAndSendBossMessage(message, commandArgs, "Qeen Ant", config.qa_channel);
            sendScheduledMessage(config.qa_time, "Respawn of **Qeen Ant** starts NOW!");
            break;
        case "core":
            saveAndSendBossMessage(message, commandArgs, "Core", config.core_channel);
            sendScheduledMessage(config.core_time, "Respawn of **Core** starts NOW!");
            break;
        case "orfen":
            saveAndSendBossMessage(message, commandArgs, "Orfen", config.orfen_channel);
            sendScheduledMessage(config.orfen_time, "Respawn of **Orfen** starts NOW!");
            break;
        case "barakiel":
            saveAndSendBossMessage(message, commandArgs, "Barakiel", config.barakiel_channel);
            break;
        case "hallate":
            saveAndSendBossMessage(message, commandArgs, "Hallate", config.hallate_channel);
            break;
        case "kernon":
            saveAndSendBossMessage(message, commandArgs, "Kernon", config.kernon_channel);
            break;
        case "golkonda":
            saveAndSendBossMessage(message, commandArgs, "Golkonda", config.golkonda_channel);
            break;
        case "cabrio":
            saveAndSendBossMessage(message, commandArgs, "Cabrio", config.cabrio_channel);
            break;
        case "help":
            return message.reply(" List of available commands:\n" +
                "!tezza [drop] [jewel]\n" +
                "!zaken [drop] [jewel]\n" +
                "!baium [drop] [jewel]\n" +
                "!antharas [drop] [jewel]\n" +
                "!valakas [drop] [jewel]\n" +
                "!QA [drop] [jewel]\n" +
                "!core [drop] [jewel]\n" +
                "!barakiel [drop] [jewel]\n" +
                "!hallate [drop] [jewel]\n" +
                "!kernon [drop] [jewel]\n" +
                "!golkonda [drop] [jewel]\n" +
                "!cabrio [drop] [jewel]\n" +
                "Usage examples `!tezza UE MH` || `!QA RageQuit`"            
            );
            break;
        default: 
            return message.reply(`Command not recognized, use !help to view the list of available commands or ask @Scionny`);
            
    }
});

client.login(config.token);

function saveAndSendBossMessage(message, commandArgs, bossName, channelName) {
    const splitArgs = commandArgs.split(' ');
    const raid = bossName;
    const drop = splitArgs.shift();
    const jewel = splitArgs.shift();                
    const msg = messaging.raidKillMsg(raid, new Date(), drop, jewel);
    console.log("User " + message.author.username + " sent a boss kill notification: " + msg);
    messaging.sendMessage(client, channelName, msg);    
}

function sendScheduledMessage(respawnInHours, message) {
    messaging.sendScheduledMessage(client,  moment(new Date()).add(respawnInHours, 'h').toDate(), config.notify_channel, `@everyone ${message}`);            
}

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);