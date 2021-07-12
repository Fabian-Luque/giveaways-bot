require('dotenv').config();
const Discord = require('discord.js');
const {token, prefix} = require("./config.js")
const bot = new Discord.Client();
const HttpCall = require('./services/http.service').HttpCall;
bot.login(token);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async message => {

  if (message.author.bot);
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command == 'creator') {
    const timeTaken = Date.now() - message.createdTimestamp;
    // message.reply(`Mi Creador es Kzelly, tiempo de respuesta ${timeTaken}ms.`)
    message.channel.send(`Mi Creador es Kzelly, tiempo de respuesta ${timeTaken}ms.`)
  }
  if (command == 'giveaways') {
    const resp = await new HttpCall().get('https://www.gamerpower.com/api/giveaways?platform=pc', null).then(resp => resp.slice(0, 10));
    
    for (const game of resp) {
      const embed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle(game.title)
        .setURL(game.open_giveaway_url)
        .setThumbnail(game.thumbnail)
        .setImage(game.thumbnail)
        .addFields([
          { name: 'Platform', value: trim(game.platforms, 1024) },
          { name: 'Price', value: trim(game.worth, 1024) },
          { name: 'discount dates', value: `${game.published_date} to. ${game.end_date}` },
          { name: 'description', value: `${game.description}` },
        ])
        // .setTimestamp()
	      .setFooter('Buy me a beer whit !donate', 'https://c10.patreonusercontent.com/3/eyJ3Ijo0MDB9/patreon-media/p/reward/6618126/4259e383194d485baed21c592046f7bc/1.png?token-time=2145916800&token-hash=O-EnGDyOtU_1qiz4wwH-qIiEzLops5eWU7KKcnD7XJg%3D');

      message.channel.send(embed);
    }
  }
});

const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);