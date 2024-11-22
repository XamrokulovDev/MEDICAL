const Joi = require("joi");
const db = require("../database/user");

// GET /user
const getUser = (req, res) => {
    const sql = `SELECT * FROM users`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).send("Xatolik bor: " + err.message);
        }
        res.json(rows);
    });
};

// GET /user/:id
const getUserId = (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ?`;

    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).send("Xatolik yuz berdi: " + err.message);
        }
        if (!row) {
            return res.status(404).send(`ID ${req.params.id} bo'lgan foydalanuvchi topilmadi!`);
        }
        res.status(200).json(row);
    });
};

// POST /create
// POST /create
const postUser = (req, res) => {
    const { error } = userValidate(req.body);
    if (error) {
        return res.status(400).send(`Xato: ${error.details[0].message}`);
    }

    const newUser = {
        name: req.body.name,
        age: req.body.age,
        medical_history: req.body.medical_history,
        contact_info: req.body.contact_info,  // contact_info endi obyekt sifatida saqlanadi
        created_at: new Date().toISOString()
    };

    const sql = `INSERT INTO users (name, age, medical_history, contact_info, created_at) 
                 VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [newUser.name, newUser.age, newUser.medical_history, JSON.stringify(newUser.contact_info), newUser.created_at], function(err) {
        if (err) {
            return res.status(500).send("Xatolik yuz berdi: " + err.message);
        }
        newUser.id = this.lastID;
        res.status(201).json(newUser);
    });
};

// PUT /update/:id
const updateUser = (req, res) => {
    const { error } = userValidate(req.body);
    if (error) {
        return res.status(400).send(`Xato: ${error.details[0].message}`);
    }

    const sql = `UPDATE users SET name = ?, age = ?, medical_history = ?, contact_info = ?, created_at = ? WHERE id = ?`;

    const updatedUser = {
        name: req.body.name,
        age: req.body.age,
        medical_history: req.body.medical_history,
        contact_info: JSON.stringify(req.body.contact_info),
        created_at: new Date().toISOString(),
        id: req.params.id
    };

    db.run(sql, [updatedUser.name, updatedUser.age, updatedUser.medical_history, updatedUser.contact_info, updatedUser.created_at, updatedUser.id], function(err) {
        if (err) {
            return res.status(500).send("Xatolik yuz berdi: " + err.message);
        }
        if (this.changes === 0) {
            return res.status(404).send(`ID ${req.params.id} bo'lgan foydalanuvchi topilmadi!`);
        }
        res.status(200).json(updatedUser);
    });
};

// DELETE /delete/:id
const deleteUser = (req, res) => {
    const sql = `DELETE FROM users WHERE id = ?`;

    db.run(sql, [req.params.id], function(err) {
        if (err) {
            return res.status(500).send("Xatolik yuz berdi: " + err.message);
        }
        if (this.changes === 0) {
            return res.status(404).send(`ID ${req.params.id} bo'lgan foydalanuvchi topilmadi!`);
        }
        res.status(200).send(`ID ${req.params.id} bo'lgan foydalanuvchi o'chirildi.`);
    });
};

// validate function
const userValidate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().integer().min(0).required(),
        medical_history: Joi.string().required(),
        contact_info: Joi.object({
            phone: Joi.string().required().min(9),
            email: Joi.string().email().required(),
            address: Joi.string().required(),
        }).required(),
    });

    return schema.validate(user);
};

module.exports = { getUser, getUserId, postUser, updateUser, deleteUser };