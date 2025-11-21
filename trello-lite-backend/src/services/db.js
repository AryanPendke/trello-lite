const db = {
    users: [],
    boards: [],
    tasks: [],
};
module.exports = {
    getDB: () => {db},
    resetDB: () => {db.users.length = 0; db.boards.length = 0; db.tasks.length = 0;}
};