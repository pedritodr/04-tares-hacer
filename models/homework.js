const { v4: uuidv4 } = require('uuid');


class Homework {

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.complete = null;
    }

}

module.exports = Homework;