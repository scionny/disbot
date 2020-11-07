var schedule = require('node-schedule');

module.exports = {
    sendMessage: sendMessage,
    sendScheduledMessage: function(client, date, channelName, content) {
        var j = schedule.scheduleJob(date, function(){
            sendMessage(client, channelName, content);
        });
    }
};

function sendMessage(client, channelName, content) {
    const channel = client.channels.cache.find(channel => channel.name === channelName)
    channel.send(content)
}