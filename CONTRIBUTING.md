Firstly, thank you for being interested in contributing to BEE7! Please read the following fully in order to understand how to contribute.

# Are you fixing a bug or submitting a pull request?

Do the following:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Make sure to add credit to yourself in the command!

I want everyone to get the credit they deserve. If you don't, I will literally not merge the pull request until you add credit somewhere.

# Is there a specific commit style I should use?

Yes, we use `commit-lint` to verify commit messages. Example for adding a feature: `feat(NickCommand): add nickname command`. **The capitilization matters, it will not commit if you do not follow it**

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
                examples: ["example"],
            },
            ratelimit: 3,
        });
    }

    public exec(message: Message): Promise<Message> {
        // Some amazing code here
    }
}
```

# What should I include in the pull request?

I have made a template for pull requests, please fill that out before submitting it. If there is anything else you think that is important, please add it.
