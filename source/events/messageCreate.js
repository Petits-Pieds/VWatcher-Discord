module.exports = {
    name: "MessageCreate",
    execute(client, message) {
        console.log(message.id);
    }
}