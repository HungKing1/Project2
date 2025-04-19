// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://26e68f054b7866e9dbfbba295c5d0dce@o4509178537639936.ingest.us.sentry.io/4509178543013888",
  integrations: [Sentry.mongoIntegration()]
});