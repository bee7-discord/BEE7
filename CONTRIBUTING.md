Firstly, thank you for being interested in contributing to BEE7! Please read the following fully in order to understand how to contribute.

# Are you fixing a bug or submitting a pull request?

Before doing so, submit a issue describing the changes/bug you want to add/fix before making a pull request. This is to prevent you spending a week on a feature, then having your pull request denied (If this does happen, sorry ♥!).

After getting approved to make a pull request, do the following:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

# How do I make new commands?
Use this template:
```ts
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class CmdNameCommand extends CustomCommand {
    public constructor() {
        super("cmdname", {
            // THE FIRST ELEMENT MUST BE THE EXACT COMMAND NAME OTHERWISE IT WILL BREAK
            aliases: ["cmdname"],
            category: "category",
            description: {
                content: "Description",
                usage: "usage",
                examples: ["example"]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
         // Some amazing code here
    }
}
```

# What should I include in the pull request?

I have made a template for pull requests, please fill that out before submitting it. If there is anything else you think that is important, please add it.
