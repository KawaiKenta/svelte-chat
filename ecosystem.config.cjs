module.exports = {
    apps: [{
        name: "index",
        script: "ORIGIN=http://bbs.kk-rschain.com node -r dotenv/config build"
    }]
}
  // -r dotenv/config