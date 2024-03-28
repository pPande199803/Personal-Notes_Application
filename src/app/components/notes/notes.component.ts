import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  router = inject(Router);
  fb = inject(FormBuilder);
  service = inject(SharedService);
  notesData!: any[];
  userId: any;

  disable: boolean = false;
  saveButton: boolean = false;

  notesForm!: FormGroup;

  ngOnInit(): void {
    this.checkValidOrNot()
    this.userId = localStorage.getItem('userId')
    console.log(this.userId)
    this.notesForm = this.fb.group({
      "userId": this.userId,
      "notesTitle": [''],
      "notesDec": ['']
    })
    this.getNotesByUserId();
  }

  checkValidOrNot() {
    if (localStorage.getItem('token') === '' || null) {
      this.router.navigate([''])
    }
  }
  reset() {
    this.notesForm = this.fb.group({
      "userId": this.userId,
      "notesTitle": [''],
      "notesDec": ['']
    })
    this.disable = true;
    this.saveButton = true
  }

  postNotesData() {
    this.service.postNotesData(this.notesForm.value).subscribe((res: any) => {
      this.notesForm.reset();
      let ref = document.getElementById('close');
      ref?.click();
      this.getNotesByUserId();
    })
  }

  getNotesByUserId() {
    this.service.getAllNotesData().subscribe((res: any) => {
      // console.log(res.notesData)
      this.notesData = res.notesData.filter((x: any) => x.userId === this.userId)
      console.log(this.notesData)
    }, error => {
      console.log("Something Went Worng")
    })
  }

  viewNotes(notes: any) {
    this.disable = false;
    console.log(notes)
    this.notesForm.setValue({
      userId: notes.userId,
      notesTitle: notes.notesTitle,
      notesDec: notes.notesDec
    })
  }
  notesId: any;
  notesDataupdate: any;
  editNoted(notes: any) {
    console.log(notes)
    this.disable = true;
    this.saveButton != true
    console.log(notes)
    this.notesForm.setValue({
      userId: notes.userId,
      notesTitle: notes.notesTitle,
      notesDec: notes.notesDec
    })

    this.notesId = notes._id

  }
  updateNotesData() {
    debugger
    // this.notesForm.setValue({
    //   userId: this.notesDataupdate.userId,
    //   notesTitle: this.notesDataupdate.notesTitle,
    //   notesDec: this.notesDataupdate.notesDec
    // })
    this.service.updateNotesData(this.notesId, this.notesForm.value).subscribe((res: any) => {
      console.log('Update SuccessFully')
      this.getNotesByUserId();
    })

  }

  deleteNotes(notes: any) {
    console.log(notes._id)
    this.service.deleteNotesData(notes._id).subscribe((res: any) => {
      console.log("Notes delete Successfully" + `${notes.userId}`)
      this.getNotesByUserId()
    })
  }

  logOut() {
    localStorage.setItem('token', '')
    this.router.navigate([''])
  }
}
