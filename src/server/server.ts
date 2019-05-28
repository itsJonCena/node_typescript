import express = require('express');
import path = require('path')

export default class Server {
    public app: express.Application;
    public puerto: number;

    constructor(puerto: number) {
        this.puerto = puerto;
        this.app = express();
    }

    static init(puerto:number) {
        return new Server(puerto)
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname,'../public');
        this.app.use(express.static(publicPath));
    }

    start (callback: Function) {
        this.app.listen(this.puerto, callback());
        this.publicFolder();
    }
}