module.exports = {
    name: "MessageCreate",
    once: true,
    execute(client, message) {
        console.log(message);
    }
}