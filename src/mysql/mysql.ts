import mysql from "mysql";

export default class MySQL {

    private static _instance: MySQL;
    cnn: mysql.Connection;
    conectado: boolean = false;

    private constructor() {
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: '192.168.0.9',
            user: 'root',
            password: 'pass',
            database: 'node_db',
            port: 3307
        });
        this.conectarDB();
    }

    /**
     * instance
     */
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.error(err);
                return callback(err);
            }

            if (results.length === 0) {
                callback('El recurso solicitado no exite');
            } else {
                callback(null, results);
            }
        });
    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.error(err);
            } else {
                this.conectado = true;
                console.log('Base de datos online ... 🤟');
            }
        });
    }
}