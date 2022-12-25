const config = require('../config.json');
const util = require('util');
const fs = require('fs');
const path = require('path');
const locales = {}

const localesPath = path.join(__dirname, 'locales');
const localesFiles = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));
for (const file of localesFiles) {
    const localeName = file.replace('.json', '');
    const localePath = path.join(localesPath, file);
    const translations = require(localePath);
    if (Object.keys(translations).length > 0) {
        locales[localeName] = translations;
    }
}

function translate(string, ...args) {
    if (locales[config.locale]) {
        if (locales[config.locale][string]) {
            return util.format(locales[config.locale][string], ...args);
        } else {
            return `Translation '${string}' does not exist`;
        }
    } else if (config.locale !== 'en-US' && locales['en-US'] && locales['en-US'][string]) {
        return util.format(locales['en-US'][string], ...args);
    } else {
        return `Locale '${config.locale}' does not exist`;
    }
}

module.exports = translate;