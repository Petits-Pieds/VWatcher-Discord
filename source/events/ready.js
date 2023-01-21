const locale = require("../locale");
module.exports = {
    name: "ClientReady",
    once: true,
    execute(client) {
        console.log("Logged in as %s", client.user.tag);
        client.user.setPresence({ status: "dnd", activities: [{ name: "We keep our eyes open ;)" }]});
    }
}