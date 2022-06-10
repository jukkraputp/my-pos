const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("web.ts");
defaultConfig.resolver.assetExts.push("d.ts");
defaultConfig.resolver.assetExts.push("web.d.ts");
defaultConfig.resolver.assetExts.push("cjs");
defaultConfig.resolver.assetExts.push("cjs.js");

module.exports = defaultConfig;
