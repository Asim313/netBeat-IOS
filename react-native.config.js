module.exports = {
    project: {
        ios: {},
        android: {},
    },
    dependencies: {
        "react-native-dbb-rtmp": {
          platforms: {
            ios: null // disable Android platform, other platforms will still autolink if provided
          }
        }
      },
    assets: ['./assets/fonts/']
};