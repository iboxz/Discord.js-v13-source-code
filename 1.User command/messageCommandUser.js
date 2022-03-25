/*
User command (it's work with command handler)

                Simple handler code:

client.on('message', message => {
	if (message.content === '!user') {
        require(`./commands/messageCommandUser.js`).execute(message, args);
	}
});

    Command: user
    Description: Shows account information
    Usage: !user [id or mention]
    Example: 
        To view your own user account information
            ◟!user 

        To view another user's account information
            ◟!user 655082737220452352
        or
            ◟!user <@655082737220452352>
        or
            ◟!user @IBOX#8974
*/

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'user',
    description: '🖼️ Shows account information',
    async execute(message, args) {
        try {    
            console.log(`${message.member.id} in ${message.guild.name} triggered user command.`);
        
            let user = message.mentions.users.first()
            let member = message.mentions.members.first();
            let id = args[0] || null;

            if (user) {
                const banner2 = await user.fetch();
                const embed = new MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`${user.username} account info:`)
                    .setDescription(`<@${user.id}>`)
                    .setAuthor(`${user.tag}`, user.displayAvatarURL())
                    .addFields({ name: `User ID`, inline: true, value: `${user.id}` })
                    .addFields({ name: 'Nickname', value: `${member.nickname || 'false'}`, inline: true, })
                    .addFields({ name: `Avatar`, inline: true, value: `<:Reply:897020646226268190>[Link](${user.displayAvatarURL({ size: 4096, dynamic: true })})` })
                    .addFields({ name: 'Joined server', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(member.joinedAt / 1000)}:R>` || '<:Reply:897020646226268190> Out of server' })
                    .addFields({ name: 'Joined Discord', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(user.createdAt / 1000)}:R>` })
                    .addFields({ name: `Roles [${member.roles.cache.size - 1}]`, value: `\u200B${`${member.roles.cache.sort((a, b) => b.position - a.position).map((r) => r).slice(0, -1)}`.slice(0, 1000)}`})
                    .setImage(`${banner2.bannerURL({ size: 4096, dynamic: true }) || ''}`)
                    .setThumbnail(`${user.displayAvatarURL({ size: 4096, dynamic: true })}`)
                    .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    .setTimestamp();
                await message.reply({ embeds: [embed] });
            } else if (id) {
                try {
                    if (id.length !== 18) return message.reply(`Please check the provided ID`);
                    const iduser = await message.client.users.cache.get(id);
                    const idmember = await message.guild.members.cache.get(id);
                    const banner = await iduser.fetch();

                    const embed = new MessageEmbed()
                        .setColor('#2f3136')
                        .setTitle(`${iduser.tag} account info:`)
                        .setDescription(`<@${iduser.id}>`)
                        .setAuthor(`${iduser.tag}`, iduser.displayAvatarURL() || '')
                        .addFields({ name: `User ID`, inline: true, value: `${iduser.id}` })
                        .addFields({ name: 'Nickname', value: `${idmember.nickname || 'false'}`, inline: true, })
                        .addFields({ name: `Avatar`, inline: true, value: `<:Reply:897020646226268190>[Link](${iduser.displayAvatarURL({ size: 4096, dynamic: true }) || ''})` })
                        .addFields({ name: 'Joined server', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(idmember.joinedAt / 1000)}:R>` })
                        .addFields({ name: 'Joined Discord', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(iduser.createdAt / 1000)}:R>` })
                        .addFields({ name: `Roles [${idmember.roles.cache.size - 1 || '0'}]`, value: `\u200B${`${idmember.roles.cache.sort((a, b) => b.position - a.position).map((r) => r).slice(0, -1)}`.slice(0, 1000)}`})
                        .setImage(`${banner.bannerURL({ size: 4096, dynamic: true }) || ''}`)
                        .setThumbnail(`${iduser.displayAvatarURL({ size: 4096, dynamic: true }) || ''}`)
                        .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        .setTimestamp();
                    await message.reply({ embeds: [embed] });
                } catch (error) {
                    await message.reply({ content: 'Unable to find user, please check the provided ID' });
                }
            } else {
                const banner = await message.author.fetch();
                const embed = new MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle('Your account info:')
                    .setDescription(`<@${message.member.id}>`)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL() || '')
                    .addFields({ name: `User ID`, inline: true, value: `${message.author.id}` })
                    .addFields({ name: 'Nickname', value: `${message.member.nickname || 'false'}`, inline: true, })
                    .addFields({ name: `Avatar`, inline: true, value: `<:Reply:897020646226268190>[Link](${message.author.displayAvatarURL({ size: 4096, dynamic: true }) || ''})` })
                    .addFields({ name: 'Joined server', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(message.member.joinedAt / 1000)}:R>` })
                    .addFields({ name: 'Joined Discord', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(message.author.createdAt / 1000)}:R>` })
                    .addFields({ name: `Roles [${message.member.roles.cache.size - 1}]`, value: `\u200B${`${message.member.roles.cache.sort((a, b) => b.position - a.position).map((r) => r).slice(0, -1)}`.slice(0, 1000)}`})
                    .setImage(`${banner.bannerURL({ size: 4096, dynamic: true }) || ''}`)
                    .setThumbnail(`${message.author.displayAvatarURL({ size: 4096, dynamic: true }) || ''}`)
                    .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true }) || ''}`)
                    .setTimestamp();
                await message.reply({ embeds: [embed] });
            }
        } catch (error) {
            message.reply('There was an error while executing this command!')
            console.error(error);
        }
    }
}