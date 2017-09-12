# rm-webhook-migrate

A configuration wrapper around [webhook-migrate](https://github.com/risd/webhook-migrate), for the self-hosted WebHook system.

### Usage

`rm-wh-migrate <wh-site-backup-file> <migrated-file> --from=<wh-site.webhook.org>`

`wh-site-backup-file` is the result of `wh preset-data-all`, within the site that is moving from webhook to self hosted. For ease, it can be moved into the self hosted site directory.

`migrated-file` is the file that includes `webhook-uploads` & images that refer to the self hosted webhook. This is generated as a result of `rm-wh-migrate`.

`wh-site.webhook.org` is the name of the webhook.org website to migrate from.


### Migrating from webhook.org to risd.systems

Migrating from webhook.org to risd.systems will update your repo's webhook files. To enable rolling back, ensure there is a commit that captures the site in that state.

1. Backup webhook site

```
cd {webhook-hosted-site}
wh preset-build-all
```

The backup is named `.preset-data.json`, so give it a more description name.

`mv .preset-data.json webhook-hosted-backup.json`

The other key part of having your webhook backup, is having a copy of your `.firebase.conf`. Feel free to make a backup now, since this process will overwrite it.

`cp .firebase.conf .firebase.conf.webhook.org` will make a copy of the existing `.firebase.conf` file.

2. Create risd.systems site

Since you already have a repo that you'll want to keep using, you can just create the site within the same directory, and delete the generated site folder. this will be useful for being able to `rm-wh init` the old web hook site, with your new risd.systems configuration.

`rm-wh create {systems-site-name}` creates the site
`rm -rf {systems-site-directory}` will delete it

3. Update files based on [risd/webhook-generate](http://github.com/risd/webhook-generate)

This will update the `.firebase.conf` template, along with other core site generation files to allow for future `rm-wh` commands to work with risd.systems configuration.

`rm-wh update`

4. Reinitialize webhook.org site with risd.systems configuration

`rm-wh init {systems-site-name}` will write a new `.firebase.conf` with settings for deploying to risd.systems, and set your `pages/cms.html`.

5. Run this migration tool to migrate the `/webhook-uploads/` directory

`rm-wh-migrate webhook-hosted-backup.json systems-restore-point.json --from={webhook-site-name.webhook.org}`

6. Restore from migrated backup

`rm-wh restore systems-restore-point.json`

7. Configure deploys via `rm-wh deploys`

`rm-wh deploys:set {bucket}` will set the current git branch to deploy to the `{bucket}`. override the git branch configured for the bucket with the `--branch` flag.
`rm-wh deploys:set {branch} --branch={branch}`

`rm-wh deploys:remove {bucket}` will remove the `{bucket}` configuration.


8. Deploy the site

`rm-wh deploy`
