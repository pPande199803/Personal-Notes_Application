const NotesScheme = require("../models/notes_models");

const getAllNotesData = (req,res)=>{
  NotesScheme.find().then((result)=>{
    res.status(201).send({
      message:"Get All Notes Data..",
      success:true,
      notesData:result
    })
  }).catch((error)=>{
    res.status(500).send({
      message:"Something Went Wornog",
      success:false,
      error
    })
  })
}

const postNotesData = (req, res) => {
  const notesData = new NotesScheme(req.body);
  notesData
    .save()
    .then(() => {
      res.status(201).send({
        message: "Notes Data Added Successfully...",
        success: true,
        data: notesData,
      });
    })
    .catch(() => {
      res.status(500).send({
        message: "Server Side Error",
        success: false,
      });
    });
};

const getAllNotesById = (req, res) => {
  const id = req.params._id;
  console.log(id);

  NotesScheme.findById(id)
    .exec()
    .then((result) => {
      res.status(201).send({
        message: "Get Notes By Id..",
        success: true,
        notesData: result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "something Went Worong",
        success: false,
        error,
      });
    });
};

const deleteNotes = (req, res) => {
  const _id = req.params.id;
  console.log(_id)
  NotesScheme.findByIdAndDelete(_id)
    .exec()
    .then(() => {
      res.status(201).send({
        message: "Delete Notes Successfully...",
        success: true,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "something Went Worong",
        success: false,
        error,
      });
    });
};

const updateNotesData = (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  NotesScheme.findByIdAndUpdate(
    {_id:req.params.id},
    {
      $set: {
        userId: req.body.userId,
        notesTitle: req.body.notesTitle,
        notesDec: req.body.notesDec,
      },
    }
  )
    .then((result) => {
      console.log(result)
      res.status(201).send({
        message:"Notes data Update Successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "not found any relative data",
      });
    });
};

module.exports = {
  postNotesData,
  getAllNotesById,
  deleteNotes,
  updateNotesData,
  getAllNotesData
};
