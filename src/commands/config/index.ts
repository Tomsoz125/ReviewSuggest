import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { CommandObject } from "typings";

export = {
	data: new SlashCommandBuilder()
		.setName("config")
		.setDescription("Commands to configure the bot")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("suggest")
				.setDescription("Edit the suggestion channel")
				.addChannelOption((o) =>
					o
						.setName("channel")
						.setDescription(
							"The channel to post all new suggestions in"
						)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("review")
				.setDescription("Edit the review channel")
				.addChannelOption((o) =>
					o
						.setName("channel")
						.setDescription(
							"The channel to post all new reviews in"
						)
				)
		),

	botPermissions: [],
	enabled: true,
	deleted: false
} as CommandObject;
