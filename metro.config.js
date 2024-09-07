const { getDefaultConfig } = require("@expo/metro-config");
const { getDefaultConfig: getExpoConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const expoConfig = getExpoConfig(__dirname);

  const { transformer, resolver } = expoConfig;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg", "cjs"],
  };

  config.resolver.assetExts.push("cjs");

  return config;
})();
