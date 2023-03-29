{
  "name": "@tetratelabs/pulumi-checkmate",
  "version": "${VERSION}",
  "description": ". Based on terraform-provider-checkmate: version v${PROVIDER_VERSION}",
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build",
    "install": "node sdk/scripts/install-pulumi-plugin.js resource checkmate ${VERSION} --server github://api.github.com/tetratelabs"
  },
  "dependencies": {
    "@pulumi/pulumi": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^10.0.0",
    "typescript": "^4.3.5"
  },
  "pulumi": {
    "resource": true,
    "name": "checkmate"
  }
}
