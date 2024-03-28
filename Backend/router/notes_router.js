const express = require("express");
const router = express.Router();

const { postNotesData , getAllNotesById, deleteNotes, updateNotesData, getAllNotesData} = require("../controller/controller")

router.get('/', getAllNotesData)
router.post('/postNotesData', postNotesData);
router.get('/getAllNotesById/:_id', getAllNotesById);
router.delete('/deleteNotes/:id',deleteNotes),
router.put('/updateNotesData/:id', updateNotesData)


module.exports = router