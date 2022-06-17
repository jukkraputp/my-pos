const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("web.ts");
defaultConfig.resolver.assetExts.push("d.ts");
defaultConfig.resolver.assetExts.push("web.d.ts");
defaultConfig.resolver.assetExts.push("cjs");
defaultConfig.resolver.assetExts.push("cjs.js");
defaultConfig.resolver.assetExts.push("d.ts.map");
defaultConfig.resolver.assetExts.push("js.map");
defaultConfig.resolver.assetExts.push(".d.ts");
defaultConfig.resolver.assetExts.push(".js");

module.exports = defaultConfig;
