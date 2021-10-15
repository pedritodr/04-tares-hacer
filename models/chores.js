const Homework = require('./homework')

class Chores {
    constructor() {
        this.list = {}
    }

    get listArr() {
        const listArray = [];
        Object.keys(this.list).forEach(key => {
            listArray.push(this.list[key]);
        })
        return listArray;
    }

    loadChores(data = []) {
        data.forEach(item => {
            this.list[item.id] = item;
        });
    }

    createHomework(desc = '') {
        const homework = new Homework(desc);
        this.list[homework.id] = homework;
    }

    deleteHomework(id = '') {
        if (this.list[id]) {
            delete this.list[id];
        }
    }

    listComplete() {
        console.log('\n');
        this.listArr.forEach((item, i) => {
            const indice = `${i+1}`.green;
            const { desc, complete } = item;
            const status = (complete) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${indice} ${desc} :: ${status}`);

        })
    }
    listHomeworkCompletePendient(completes = true) {
        console.log('\n');
        let count = 0;
        this.listArr.forEach((item) => {
            const { desc, complete } = item;
            const status = (complete) ? 'Completada'.green : 'Pendiente'.red;
            if (completes) {
                if (complete) {
                    count++;
                    const completeStatus = `${complete}`.green;
                    const indice = `${count}`.green + ' .';
                    console.log(`${indice} ${desc} :: ${completeStatus}`);
                }
            } else {
                if (!complete) {
                    count++;
                    const indice = `${count}`.green + ' .';
                    console.log(`${indice} ${desc} :: ${status}`);
                }
            }
        })
    }
    toggleComplete(ids = []) {

        ids.forEach(id => {
            const homework = this.list[id];
            if (!homework.complete) {
                homework.complete = new Date().toISOString();
            }
        })

        this.listArr.forEach(homework => {
            if (!ids.includes(homework.id)) {
                this.list[homework.id].complete = null;
            }
        })

    }
}

module.exports = Chores;