const fs = require('fs');
const ruta = './db/data.json';

const saveDB = (data) => {
    fs.writeFileSync(ruta, JSON.stringify(data));
}

const loadDb = () => {
    if (!fs.existsSync(ruta)) {
        return null;
    }
    const info = fs.readFileSync(ruta, { encoding: 'utf-8' });
    if (!info) {
        return null;
    }
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    saveDB,
    loadDb
}