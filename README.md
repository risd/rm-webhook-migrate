# rm-webhook-migrate

A configuration wrapper around [webhook-migrate](https://github.com/risd/webhook-migrate), for the self-hosted WebHook system.

### Usage

`rm-wh-migrate <wh-site-backup-file> <migrated-file> --from=<wh-site.webhook.org>`

`wh-site-backup-file` is the result of `wh preset-data-all`, within the site that is moving from webhook to self hosted. For ease, it can be moved into the self hosted site directory.

`migrated-file` is the file that includes `webhook-uploads` & images that refer to the self hosted webhook.

`wh-site.webhook.org` is the name of the webhook.org website.
