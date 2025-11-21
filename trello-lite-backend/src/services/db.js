const db = {
    users: [],
    boards: [],
    tasks: [],
};
module.exports = {
    getDB: () => db,  // <-- FIXED (no curly braces)
    resetDB: () => {
        db.users.length = 0;
        db.boards.length = 0;
        db.tasks.length = 0;
    }
};
