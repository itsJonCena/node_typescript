import { Router, Request, Response, response } from "express";
import MySQL from '../mysql/mysql';
const router = Router();

router.get('/heroes',(req: Request, res:Response) => {
    const query = `SELECT * FROM Heroes;`;

    MySQL.ejecutarQuery(query, (err:any, heroes: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                heroes
            })
        }
    });
})

router.get('/heroes/:id',(req: Request, res:Response) => {
    const id = req.params.id;

    const escapeId = MySQL.instance.cnn.escape(id);

    const query = `SELECT * FROM Heroes WHERE id=${escapeId};`;

    MySQL.ejecutarQuery(query, (err:any, heroes: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                heroes
            })
        }
    });
})

export default router;