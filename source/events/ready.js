const locale = require('../locale');
module.exports = {
    name: 'ClientReady',
    once: true,
    execute(client) {
        console.log(locale('reaady', client.user.tag));
    }
}