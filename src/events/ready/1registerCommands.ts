import { Client, REST, Routes } from "discord.js";
import fetchAllCmds from "../../utils/commands/fetchAllCmds";

export = async (client: Client) => {
	for (const g of await client.guilds.fetch()) {
		(async () => {
			const rest = new REST().setToken(process.env.BOT_TOKEN!);

			try {
				console.log(
					`Started refreshing application (/) commands for guild ${g[0]}.`
				);
				let cmds = [];
				const commands = await fetchAllCmds();

				for (const cmd of commands) {
					const enabled = cmd.enabled;
					if (enabled) cmds.push(cmd.data.toJSON());
				}

				const data: any = await rest.put(
					Routes.applicationGuildCommands(client.user!.id, g[0]),
					{
						body: cmds
					}
				);

				console.log(
					`Successfully reloaded ${data.length} application (/) commands for guild ${g[0]}.`
				);
			} catch (error) {
				// And of course, make sure you catch and log any errors!
				console.error(error);
			}
		})();
	}
};
