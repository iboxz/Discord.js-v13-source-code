/*
User slash command (it's work with slashCommand handler)

            Simple handler code:

npm install @discordjs/rest discord-api-types

client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    if (commandName === 'user') {
        require(`./commands/slashCommandUser.js`).execute(interaction);
    }
});

    Command: user
    Description: Shows account information
    Usage: /user target:<mention user>
    Example: 
        To view your own user account information
            ◟/user 

        To view another user's account information
            ◟/user target:655082737220452352
        or
            ◟/user target:@IBOX#8974

*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('👤 Shows account info')
        .addUserOption(option => option.setName('target').setDescription('Select a user')),
    async execute(interaction) {
        try {
            console.log(`${interaction.user.id} in ${interaction.guild.name} triggered user slash command.`);
            var user = await interaction.options.getUser('target');
            var member = await interaction.options.getMember('target');
            
            await interaction.deferReply();
            if (user) {
                const banner2 = await user.fetch();
                const embed = new MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`${user.username} account info:`)
                    .setDescription(`<@${user.id}>`)
                    .setAuthor(`${user.tag}`, user.displayAvatarURL())
                    .addFields({ name: `User ID`, inline: true, value: `${user.id}` })
                    .addFields({ name: 'Nickname', value: `${member?.nickname || 'false'}`, inline: true, })
                    .addFields({ name: `Avatar`, inline: true, value: `<:Reply:897020646226268190>[Link](${user.displayAvatarURL({ size: 4096, dynamic: true })})` })
                    .addFields({ name: 'Joined server', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(member?.joinedAt / 1000)||'Out of guild'}:R>` })
                    .addFields({ name: 'Joined Discord', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(user.createdAt / 1000)}:R>` })
                    .addFields({ name: `Roles [${member?.roles.cache.size - 1||'0'}]`, value: `\u200B${`${member?.roles.cache.sort((a, b) => b.position - a.position).map((r) => r).slice(0, -1)||'Out of guild'}`.slice(0, 1000)}` })
                    .setImage(`${banner2.bannerURL({ size: 4096, dynamic: true }) || ''}`)
                    .setThumbnail(`${user.displayAvatarURL({ size: 4096, dynamic: true })}`)
                    .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.displayAvatarURL({ dynamic: true })}`)
                    .setTimestamp();
                await interaction.editReply({ embeds: [embed] });
            
            } else {
                const banner = await interaction.user.fetch();
                const embed = new MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle('Your account info:')
                    .setDescription(`<@${interaction.member.id}>`)
                    .setAuthor(`${interaction.user.tag}`, interaction.member.displayAvatarURL() || '')
                    .addFields({ name: `User ID`, inline: true, value: `${interaction.member.id}` })
                    .addFields({ name: 'Nickname', value: `${interaction.member.nickname || 'false'}`, inline: true, })
                    .addFields({ name: `Avatar`, inline: true, value: `<:Reply:897020646226268190>[Link](${interaction.member.displayAvatarURL({ size: 4096, dynamic: true }) || ''})` })
                    .addFields({ name: 'Joined server', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(interaction.member.joinedAt / 1000)}:R>` })
                    .addFields({ name: 'Joined Discord', inline: true, value: `<:Reply:897020646226268190><t:${Math.round(interaction.user.createdAt / 1000)}:R>` })
                    .addFields({ name: `Roles [${interaction.member.roles.cache.size - 1}]`, value: `\u200B${`${interaction.member.roles.cache.sort((a, b) => b.position - a.position).map((r) => r).slice(0, -1)}`.slice(0, 1000)}` })
                    .setImage(`${banner.bannerURL({ size: 4096, dynamic: true }) || ''}`)
                    .setThumbnail(`${interaction.member.displayAvatarURL({ size: 4096, dynamic: true }) || ''}`)
                    .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.member.displayAvatarURL({ dynamic: true }) || ''}`)
                    .setTimestamp();
                await interaction.editReply({ embeds: [embed] });
            }
  
        } catch (error) {
            interaction.editReply('There was an error while executing this command!')
            console.error(error);
        }

    },
};