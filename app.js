require('colors');
const { inquirerMenu, pause, loadInput, loadChoresDelete, confirm, loadChoresEarring } = require('./helpers/inquirer');
const { saveDB, loadDb } = require('./helpers/SaveFile');
const Chores = require('./models/chores');


const main = async() => {
    let opt = '';
    const chores = new Chores();
    const data = loadDb();
    if (data) {
        chores.loadChores(data);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await loadInput('Descripción');
                chores.createHomework(desc);
                break;
            case '2':
                chores.listComplete();
                break;
            case '3':
                chores.listHomeworkCompletePendient(true);
                break;
            case '4':
                chores.listHomeworkCompletePendient(false);
                break;
            case '5':
                const ids = await loadChoresEarring(chores.listArr);
                chores.toggleComplete(ids);
                break;
            case '6':
                const id = await loadChoresDelete(chores.listArr);
                if (id !== '0') {
                    const ok = await confirm('¿Estás seguro?');
                    if (ok) {
                        chores.deleteHomework(id);
                    }
                }
                break;
        }
        saveDB(chores.listArr);
        console.log('\n');
        await pause();
    } while (opt !== '0');


}

main();