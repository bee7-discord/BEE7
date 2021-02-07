import { model, Schema } from "mongoose";

const guildConfigSchema = new Schema({
    guildId: String,
    settings: Object,
});

const guildConfigModel = model("Config", guildConfigSchema);
export default guildConfigModel;
