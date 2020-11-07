const Sequelize = require('sequelize');
const moment = require('moment-timezone');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
    raid: { type: Sequelize.STRING, unique: true},
    jewel: Sequelize.STRING,
    drop: Sequelize.STRING,
    raidKill: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    username: Sequelize.STRING
});

module.exports = {
    createTag: async function (message, raid, drop, jewel) {
        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            const tag = await Tags.create({
                raid: raid,
                drop: drop,
                jewel: jewel,
                username: message.author.username,
            });
            let msg = `Raid __**${tag.raid}**__ killed on ${spanishDate(tag.raidKill)},\n`;
            
            if (drop) {
                msg += `Drop: __**${tag.drop}**__. `;
            }
            if (jewel) {
                msg += `Jewel: __**${tag.jewel}**__.\n`
            }

            return msg;
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.reply('That tag already exists.');
            }
            console.log(e);
            return message.reply('Something went wrong with adding a tag.');
        }
    },
    fetchTag: async function(bossName) {
        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;        
        return await Tags.findOne({ where: { raid: bossName } });
    },
    updateTag: async function(message, raid, drop, jewel) {
        const affectedRows = await Tags.update({
            drop: drop,
            jewel: jewel,
            raidKill: new Date(),
            username: message.author.username,
        }, { where: { raid: raid } });

        if (affectedRows > 0) {
            let msg = `Raid __**${raid}**__ killed on ${spanishDate(new Date())},\n`;
            
            if (drop) {
                msg += `Drop: __**${drop}**__. `;
            }
            if (jewel) {
                msg += `Jewel: __**${jewel}**__.\n`
            }

            return msg;
        }
        
        return message.reply('Something went wrong updating boss kill');
    },
    tagSync: function () {
        Tags.sync();
    }
};

function spanishDate(date) {
    return moment(date).tz("Europe/Madrid").toLocaleString() + " (spanish time)";
}