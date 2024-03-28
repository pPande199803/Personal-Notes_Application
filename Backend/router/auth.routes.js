const router = require("express").Router();
const { notesRegisterData, notesLoginData } = require('../controller/auth.controller')

router.post('/registerData', notesRegisterData);

router.post('/loginData', notesLoginData)

module.exports = router