import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor( private http : HttpClient) { }

  getAllNotesData(){
    return this.http.get('http://localhost:4500/api/notes')
  }

  postNotesData(data:any){
    return this.http.post('http://localhost:4500/api/notes/postNotesData',data)
  }

  loginUserData(data:any){
    return this.http.post('http://localhost:4500/api/notes/loginData', data)
  }
  registerUserData(data:any){
    return this.http.post('http://localhost:4500/api/notes/registerData', data)
  }

  getAllNotesById(id:any){
    return this.http.get('http://localhost:4500/api/notes/getAllNotesById/'+ id)
  }

  deleteNotesData(notesId:any){
    return this.http.delete('http://localhost:4500/api/notes/deleteNotes/'+ notesId)
  }

  updateNotesData(id:any, data:any){
    return this.http.put('http://localhost:4500/api/notes/updateNotesData/'+ id, data)
  }
}
