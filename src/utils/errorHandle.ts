import { config } from "../../config";
import { db } from "../../db";

export = async (
	error: any,
	notifyUser: boolean,
	save: boolean,
	guildId: string
): Promise<string> => {
	console.error(error);

	let savedError;
	if (save) {
		try {
			savedError = await db.error.create({
				data: {
					guildId,
					message: `${error}`
				}
			});
		} catch (e) {
			return "";
		}
	}

	if (notifyUser) {
		return `An unexpected error has occurred, if this persists please contact the bot's support [here](${
			config.support.invite
		})${
			savedError ? ` and give them the error code ${savedError.id}` : "!"
		}`;
	}
	return savedError ? savedError.id : "";
};
