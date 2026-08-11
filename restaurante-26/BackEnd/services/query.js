const connection = require('../config/db');

const executeQuery = async (query, params = []) => {
    try {
        const [result] = await connection.query(query, params);
        return result;
    } catch (erro) {
        throw erro;
    }
};

module.exports = executeQuery;