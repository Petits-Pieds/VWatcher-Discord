const config = require('../config.json');
const util = require('util');
const fs = require('fs');
const path = require('path');
const locales = {}

const localesPath = path.join(__dirname, 'locales');
const localeFiles = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));
for (const file of localeFiles) {
    const localeName = file.replace('.json', '');
    const filePath = path.join(localesPath, file);
    const locale = require(filePath);
    if (localeName && Object.keys(locale).length > 0) {
        locales[localeName] = locale;
    }
}

function translate(locale, translation, ...args) {
    locale = locale ? locale: config.locale;
    if (locales[locale]) {
        if (locales[locale][translation]) {
            return util.format(locales[locale][translation], ...args);
        } else {
            return `Translation "${translation}" does not exist`;
        }
    } else if (locale !== "en-US" && locales["en-US"]) {
        if (locales["en-US"][translation]) {
            return util.format(locales["en-US"][translation], ...args);
        } else {
            return `Translation "${translation}" does not exist`
        }
    } else {
        return `Locale "${locale}" does not exist`;
    }
}

module.exports = translate;