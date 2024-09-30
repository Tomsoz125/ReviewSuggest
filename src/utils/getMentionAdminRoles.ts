import { Guild } from "@prisma/client";
import getGuild from "./guilds/getGuild";

export = async (guildId: string) => {
	const response = await getGuild(guildId);
	if (!response.success) return response;

	const dbGuild: Guild = response.data!;
	if (!dbGuild.adminRoles) return undefined;
	let roles = dbGuild.adminRoles;
	if (!Array.isArray(roles)) roles = [roles];

	return roles.map((r) => `<@&${r}>`).join(", ");
};
