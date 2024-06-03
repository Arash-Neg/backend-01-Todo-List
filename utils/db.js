const { MongoClient } = require('mongodb');

module.exports = class Database {
  #DB_URL = 'mongodb://localhost:27017/todos-app';
  #db = null;

  async #connect() {
    try {
      let client = new MongoClient(this.#DB_URL);
      let DB = client.db();
      return DB;
    } catch (err) {
      console.error('Database connection not established...! ', err.message);
    }
  }

  async GetDb() {
    try {
      if (this.#db) {
        console.log('Database connection established...');
        return this.#db;
      }
      this.#db = await this.#connect();
      return this.#db;
    } catch (error) {
      console.error(error.message);
    }
  }
};
