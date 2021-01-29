import { model, Schema } from "mongoose";

const warnSchema = new Schema({
    guildId: String,
    warns: Array
});

const warnModel = model("Warns", warnSchema);
export default warnModel;
