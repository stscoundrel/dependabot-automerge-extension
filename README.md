# Dependabot Automerge Extension

Add "merge all" button to Github for Dependabot PRs. Chrome extension.

# Status

Not in extension store, but you can clone, build & install it to Chrome in development mode.

I used this extension actively for a year-or-so, but nowadays Dependabot has [grouped updates](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#groups) option, which much reduces need for this extension.

`yarn build`

## Motivation

Every month Dependabot opens hundreds of pull requests to dozens of my repositories. Most of the time CI just passes for them all and they are safe to merge. However, I still need to add the "dependabot merge" comment to each of them, or merge them myself. While dependabot has some strategies for working with automatic Github merge, I'd rather not go through all the repos and set up automerge the way Github & Dependabot want it.

Essentially, this is just automation script to replace the manual work. Hopefully in the future Dependabot config will support option to automerge PRs once CI passes.

## How it works

- Inserts new "Merge all" button to pull requests page in Github
- Only appears if there are open Dependabot PRs
- The button hijacks the browser for a bit. It will open all Dependabot PRs in their own tabs and add the magic automerge comment. Extension will close tabs once commented.
- Dependabot handles the rest. If CI has passed, dependabot will merge the comment. If conflicts arise, dependabot will rebase them.

## Caveats

_It is only as safe as your CI is._

If you trust your tests and other checks, feel free to use this. If you dont feel confident automerging anything that passes the CI, this may not be for you.
