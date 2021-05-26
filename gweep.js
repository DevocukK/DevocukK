const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const { Client, Util } = require("discord.js");
const fs = require("fs");//gweep creative
require("./util/eventLoader")(client);//gweep creative

//gweep creative
const log = message => {
  console.log(`${message}`);
};
//gweep creative

//gweep creative
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
//gweep creative
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);//gweep creative
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//gweep creative
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);//gweep creative
    }
  });//gweep creative
};//gweep creative

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.permissions.has("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 4;
  return permlvl;
};//gweep creative

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g

client.login(ayarlar.token);
const moment = require('moment');
moment.locale('tr');//gweep creative
const { S_IFREG } = require("constants");
const data = require('quick.db');
const logs = require('discord-logs');
logs(client);


client.on('ready', async () => {
client.user.setStatus('online');
console.log(`${client.user.username} ismiyle bağlandım.`);
})
//gweep creative
client.on('message', async message => {
if(message.channel.type !== 'text') return;
const datas = await data.fetch(`tag.${message.guild.id}`);
if(message.content.toLowerCase().toString().includes('tag')) {
if(datas) return message.channel.send('`'+datas+'`');
};
});





client.on('message', async message => {
  if(message.channel.type !== 'text') return;
const chimped = await data.fetch(`chimped.${message.guild.id}`);
if(!chimped) return;
let command = chimped.find(a => a.command === message.content.toLocaleLowerCase());
if(command) {
message.channel.send(`${message.author} ${command.respond}`);
};
});




client.on("ready", () => {
  client.channels.cache.get("829346470020644945").join();
})

client.login(process.env.token)