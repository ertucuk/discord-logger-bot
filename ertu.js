const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits, SelectMenuBuilder, ActivityType,PermissionsBitField } = require("discord.js");
const client = global.client = new Client({ fetchAllMembers: true, intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands], partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember, Partials.ThreadMember, Partials.GuildScheduledEvent], ws: { version: "10" } });
let sendLogs = require("discord-sendLogs");
sendLogs(client);
const config = require("./config")
client.on("ready", async () => {
  console.sendLog(`${client.user.tag} olarak giriş yapıldı.`);
  client.user.setPresence({ activities: [{ name: config.presence ? config.presence : `Laterion`, type: ActivityType.Streaming, url: "https://www.twitch.tv/ertucuk" }], status: "dnd" });
})

client.on("channelCreate", (channel) => {
  let types = { 2: "Voice Channel", 0: "Text Channel", 5: "Announcement Channel", 4: "Category", 13: "Stage", 15: "Forum" }
  let embed = new EmbedBuilder()
  .setDescription(`A New Channel Has Been Created!!\n\nChannel; ${channel}\nChannel ID; ${channel.id}\nChannel Type; ${types[channel.type]}`)
  .setColor("#ff0000")
sendLog({ embeds: [embed] })
})
client.on("channelDelete", (channel) => {
  let types = { 2: "Voice Channel", 0: "Text Channel", 5: "Announcement Channel", 4: "Category", 13: "Stage", 15: "Forum" }
  let embed = new EmbedBuilder()
  .setDescription(`A Channel Has Been Deleted!\n\nChannel; ${channel.name}\nChannel ID; ${channel.id}\nChannel Type; ${types[channel.type]}`)
  .setColor("#ff0000")
sendLog({ embeds: [embed] })
})
client.on("channelUpdate", (oldChannel,newChannel) => {
  let types = { 2: "Voice Channel", 0: "Text Channel", 5: "Announcement Channel", 4: "Category", 13: "Stage", 15: "Forum" }
  if(oldChannel.name != newChannel.name){
    let embed = new EmbedBuilder()
    .setDescription(`Name of the ${oldChannel} channel was updated!\n\nOld name: ${oldChannel.name}\nNew name: ${newChannel.name}`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
  }else if(oldChannel.type != newChannel.type){
    let embed = new EmbedBuilder()
    .setDescription(`Type of the ${oldChannel} channel was changed!\n\nOld types; ${types[oldChannel.type]}\nNew types; ${types[newChannel.type]}`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
  }else{
  let embed = new EmbedBuilder()
  .setDescription(`Updated on ${oldChannel}, But Not Detected What Has Been Done!`)
  .setColor("#ff0000")
sendLog({ embeds: [embed] })
  }
})
client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
  let embed = new EmbedBuilder()
    .setDescription(`${channel} - (\`${channel.id}\`) Channel's Permissions Updated!`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
});
client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
  let embed = new EmbedBuilder()
    .setDescription(`${channel} - (\`${channel.id}\`) Channel's Topic Updated!`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
});
client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {
  let embed = new EmbedBuilder()
    .setDescription(`${oldChannel} The Channel Has Been Updated, But What Has Been Detected!`)
    .setColor("#ff0000")
    sendLog({ embeds: [embed] })
});
// - EMOJIS
client.on("emojiCreate", (emoji) =>{
  let embed = new EmbedBuilder()
  .setDescription(`A New Emoji Has Been Created!\n\nEmoji; ${emoji}\nEmoji ID; ${emoji.id}\nEmoji URL; [Click](${emoji.url})`)
  .setColor("#ff0000")
  .setThumbnail(`${emoji.url}`)
  sendLog({ embeds: [embed] })
})
client.on("emojiDelete", (emoji) =>{
  let embed = new EmbedBuilder()
  .setDescription(`An Emoji Has Been Deleted!\n\nEmoji; ${emoji.name}\nEmoji ID; ${emoji.id}\nEmoji URL; [Click](${emoji.url})`)
  .setColor("#ff0000")
  .setThumbnail(`${emoji.url}`)
  sendLog({ embeds: [embed] })
})
client.on("emojiUpdate", (oldEmoji,newEmoji) =>{
  if (oldEmoji.name !== newEmoji.name) {
  let embed = new EmbedBuilder()
  .setDescription(`The Name of the ${oldEmoji} Emoji has been Updated!\n\nOld Name; ${oldEmoji.name}\nNew name; ${newEmoji.name}\nEmoji URL; [Click](${newEmoji.url})`)
  .setColor("#ff0000")
  .setThumbnail(`${newEmoji.url}`)
  sendLog({ embeds: [embed] })
  }
})
//  GUILD & GUILDMEMBERS
client.on("guildMemberRoleAdd", (member, role) => {
  let embed = new EmbedBuilder()
    .setDescription(`${member} (\`${member.id}\`) Has Been Given ${role} (\`${role.id}\`)!`)
    .setColor("#37393f")
  sendLog({ embeds: [embed] })
});
client.on("guildMemberRoleRemove", (member, role) => {
  let embed = new EmbedBuilder()
    .setDescription(`${role} (\`${role.id}\`) Has Been Taken From ${member} (\`${member.id}\`)!`)
    .setColor("#37393f")
  sendLog({ embeds: [embed] })
});
client.on("guildMemberEntered", (member) => {
  let embed = new EmbedBuilder()
    .setDescription(`${member} - ${member.user.tag} Passed Through Server Gate!`)
    .setColor("#37393f")
  sendLog({ embeds: [embed] })
});
client.on("guildMemberBoost", (member) => {
  let embed = new EmbedBuilder()
    .setDescription(`${member} - ${member.user.tag} Boost on our server!`)
    .setColor("#00ff00")
  sendLog({ embeds: [embed] })
});
client.on("guildMemberUnboost", (member) => {
  let embed = new EmbedBuilder()
    .setDescription(`${member} - ${member.user.tag} Has Taken Boost On Our Server!`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
});
client.on("guildFeaturesUpdate", (oldGuild, newGuild) => {
  let embed = new EmbedBuilder()
    .setDescription(`Updated On The Server!\n\nOld Settings; ${oldGuild.features.join(", ")}\nNew Settings; ${newGuild.features.join(", ")}`)
    .setColor("#ff0000")
    .setThumbnail(`${newGuild.iconURL({dynamic:true})}`)
  sendLog({ embeds: [embed] })
});
client.on("guildPartnerAdd", (guild) => {
  let embed = new EmbedBuilder()
    .setDescription(`The Server Became a Discord Partner!`)
    .setColor("#00ff00")
  sendLog({ content: `@everyone`,  embeds: [embed] })
});
client.on("unhandledGuildUpdate", (oldGuild, newGuild) => {
  let embed = new EmbedBuilder()
    .setDescription(`An Update Has Been Made On The Server, But What Has Been Detected!`)
    .setColor("#ff0000")
    .setThumbnail(`${newGuild.iconURL({dynamic:true})}`)
  sendLog({ embeds: [embed] })
});
// - MESSAGES
client.on("messageContentEdited", (message, oldContent, newContent) => {
  let embed = new EmbedBuilder()
    .setDescription(`Edited a Message Content!\n\nMessage Owner; ${message.member}\nOld Message Content; ${oldContent}\nNew Message Content; ${newContent}`)
    .setColor("#37393f")
    .setThumbnail(`${message.member.user.avatarURL({dynamic:true})}`)
  sendLog({ embeds: [embed] })
});
client.on("messageDelete", async(messageDelete) => {
  if(messageDelete.author == null || messageDelete.content == null)return;
  let embed = new EmbedBuilder()
    .setDescription(`A message has been Deleted\n\nMessage Owner; ${messageDelete.author}\nMessage Content; ${messageDelete.content}\nChannel; ${messageDelete.channel}`)
    .setColor("#37393f")
    .setThumbnail(`${messageDelete.member.user.avatarURL({dynamic:true})}`)
  sendLog({ embeds: [embed] })
});
// - ROLE
client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
  let embed = new EmbedBuilder()
    .setDescription(`${role} - (\`${role.id}\`) Role Permissions Updated!`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
});
client.on("roleUpdate", (oldRole, newRole) => {
  if(oldRole.name !== newRole.name){
  let embed = new EmbedBuilder()
    .setDescription(`${oldRole} Role Name Updated!\n\nOld Name; ${oldRole.name}\nNew Name; ${newRole.name}`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
  }else if(oldRole.position !== newRole.position){
    let embed = new EmbedBuilder()
    .setDescription(`${oldRole} Role Position Updated!\n\nOld Position; ${oldRole.position}\nNew Position; ${newRole.position}`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
  }else if(oldRole.hexColor !== newRole.hexColor){
    let embed = new EmbedBuilder()
    .setDescription(`${oldRole} Role Color Updated!!\n\nOld Color; ${oldRole.hexColor}\nNew Color; ${newRole.hexColor}`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
  }else if(oldRole.icon !== newRole.icon){
    let embed = new EmbedBuilder()
    .setDescription(`${oldRole} Role Icon Updated!\n\nOld Icon; [Click!](${oldRole.iconURL})\nNew Icon; [Click!](${newRole.iconURL})`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
  }else{
    let embed = new EmbedBuilder()
    .setDescription(`${oldRole} Role Has Been Updated, But What Has Been Detected!`)
    .setColor("#ff0000")
  sendLog({ embeds: [embed] })
  }
});
client.on("roleCreate", (role) => {
  let embed = new EmbedBuilder()
  .setDescription(`A New Role Has Been Created!\n\nRole; ${role}\nRole ID; ${role.id}`)
  .setColor("#ff0000")
sendLog({ embeds: [embed] })
})
client.on("roleDelete", (role) => {
  let embed = new EmbedBuilder()
  .setDescription(`An Role Has Been Deleted\n\nRole; ${role.name}\nRole ID; ${role.id}\nRole Color; ${role.color}`)
  .setColor("#ff0000")
sendLog({ embeds: [embed] })
})
// - USERS
client.on("userFlagsUpdate", (user, oldFlags, newFlags) => {
  let embed = new EmbedBuilder()
    .setDescription(`${user} - ${user.tag} User's Badge Updated!`)
    .setColor("#37393f")
    .setThumbnail(`${user.avatarURL({dynamic:true})}`)
  sendLog({ embeds: [embed] })
});
client.sendLogin(config.BotToken);
Collection.prototype.array = function () { return [...this.values()] }
async function sendLog(ertu) {
  let channel = client.channels.cache.get(config.sendLogChannelID)
  if(!channel)return console.log("sendLog Channel is undefined")
  channel.send(ertu)
}