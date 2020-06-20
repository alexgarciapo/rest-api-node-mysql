const { Router } = require('express');
const router = Router();

const mysqlConnection = require('../database');
/*Comentario gggg*/
router.get('/employees/', (req, res) =>{
    /*const data = {
      'name':'Alex',
      'website': 'Alex.com'
    };*/
    mysqlConnection.query('SELECT *FROM employees', (err, rows, fileds) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    //res.json(data);
});

router.get('/employees/:id', (req, res) =>{
    const { id } = req.params;
    mysqlConnection.query('SELECT *FROM employees WHERE id=?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/employees/', (req, res) =>{
    const { id, name, salary } = req.body;
    /*const query = `
           SET @id = ?;
           SET @name = ?;
           SET @salary = ?;
           CALL employeeAddOrEdit(@id, @name, @salary);
    `;*/
    const query = `
    CALL employeeAddOrEdit(?, ?, ?);
    `;

    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Employeed saved'});
        }else{
            console.log(err);
        }
    });
});

router.put('/employees/:id', (req, res) =>{
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = `
    CALL employeeAddOrEdit(?, ?, ?);
    `;

    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Employeed updated'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/employees/:id', (req, res) =>{    
    const { id } = req.params;
    const query = `DELETE FROM employees WHERE id = ?`;

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Employeed deleted'});
        }else{
            console.log(err);
        }
    });
});

module.exports = router;