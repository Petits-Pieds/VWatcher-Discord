const config = require("../config.json");
const util = require("util");
const fs = require("fs");
const path = require("path");
const Locales = {}

const directory = path.join(__dirname, 'locales');
fs.readdirSync(directory).filter(file => file.endsWith(".json")).forEach(file => {
    const iso = file.replace(".json", "");
    const data = require(path.join(directory, file));
    if (iso && data.name && data.translations) {
        Locales[iso] = data;
    }
});

class Translations {
    constructor(locale, category) {
        console.log(locale);
        this.locale = locale;
        this.category = category;
    }

    get(translation, ...args) {
        const locale = Locales[this.locale ? this.locale: "en-US"];
        if (locale) {
            const value = locale.translations[this.category ? this.category: "general"][translation];
            if (value && typeof(value) === "string") {
                return util.format(value, ...args);
            } else {
                return `Translation '${translation}' does not exist`;
            }
        } else {
            return `Locale '${locale}' does not exist`;
        }
    }
}

module.exports = { Locales, Translations };