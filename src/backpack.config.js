module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/main.js'
    return config
  }
}
