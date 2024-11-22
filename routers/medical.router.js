const { Router } = require("express");
const router = Router();

const {
    getUser,
    getUserId,
    postUser,
    updateUser,
    deleteUser
} = require("../controllers/medical.controller");

/**
 * @swagger
 * /user:
 *   get:
 *     description: Barcha foydalanuvchilarni olish
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati muvaffaqiyatli qaytarildi
 */
router.get("/user", getUser);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     description: ID orqali foydalanuvchini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Foydalanuvchining ID raqami
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli qaytarildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 */
router.get("/user/:id", getUserId);

/**
 * @swagger
 * /create:
 *   post:
 *     description: Yangi foydalanuvchi yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Foydalanuvchining ismi
 *               age:
 *                 type: integer
 *                 description: Foydalanuvchining yoshi
 *               medical_history:
 *                 type: string
 *                 description: Foydalanuvchining tibbiy tarixi
 *               contact_info:
 *                 type: string
 *                 description: Foydalanuvchining aloqa ma'lumotlari
 *     responses:
 *       201:
 *         description: Yangi foydalanuvchi yaratildi
 *       400:
 *         description: Yaroqsiz ma'lumot kiritilgan
 */
router.post("/create", postUser);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     description: Foydalanuvchining ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan foydalanuvchining ID raqami
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Foydalanuvchining ismi
 *               age:
 *                 type: integer
 *                 description: Foydalanuvchining yoshi
 *               medical_history:
 *                 type: string
 *                 description: Foydalanuvchining tibbiy tarixi
 *               contact_info:
 *                 type: string
 *                 description: Foydalanuvchining aloqa ma'lumotlari
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli yangilandi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       400:
 *         description: Yaroqsiz ma'lumot kiritilgan
 */
router.put("/update/:id", updateUser);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     description: Foydalanuvchini o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan foydalanuvchining ID raqami
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o'chirildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 */
router.delete("/delete/:id", deleteUser);

module.exports = router;