const moment = require('moment-timezone');
var schedule = require('node-schedule');

module.exports = {
    sendMessage: sendMessage,
    raidKillMsg: raidKillMsg,
    sendScheduledMessage: sendScheduledMessage
};

function sendMessage(client, channelName, content) {
    const channel = client.channels.cache.find(channel => channel.name === channelName)
    channel.send(content)
}

function raidKillMsg(raid, raidKill, drop, jewel) {
    let msg = `Raid __**${raid}**__ killed on ${spanishDate(raidKill)},\n`;
            
    if (drop) {
        msg += `Drop: __**${drop}**__. `;
    }
    
    if (jewel) {
        msg += `Jewel: __**${jewel}**__.\n`
    }

    return msg;
}

function sendScheduledMessage(client, date, channelName, content) {
    var j = schedule.scheduleJob(date, function(){
        sendMessage(client, channelName, content);
    });
}

//PRIVATE

function spanishDate(date) {
    return moment(date).tz("Europe/Madrid").toLocaleString() + " (spanish time)";
}

