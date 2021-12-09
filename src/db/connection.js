const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Kuldev@123',
    port: 5432,
});

const connectDB = async () => {
    try {
        client.connect();
        console.log("DB Connected...");
    } catch (err) {
        console.log("DB Error...", err);
        process.exit(1);
    }
};

const queryInstance = async (QUERY) => {
    try{
        const result = await client.query(QUERY);
        return result.rows;
    }catch(err){
        return err;
    }
}

module.exports = { connectDB, queryInstance };