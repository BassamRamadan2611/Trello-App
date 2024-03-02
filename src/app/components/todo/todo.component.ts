import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { Task } from '../Models/task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,
    ReactiveFormsModule,
    CdkDropList, CdkDrag
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent  implements OnInit{

  todoForm!:FormGroup
updatedIndex:any
  tasks:Task[]=[]
  inprogress :Task[]= []
  done:Task[] = []
isEnabled:boolean = false
  constructor(private fb:FormBuilder){

  }
  ngOnInit(): void {
      this.todoForm = this.fb.group({
        item:['',Validators.required]
      })
  }

  addTask(){
this.tasks.push({
  Title:this.todoForm.value.item,
  Complated:false
})
this.todoForm.reset()
  }
  updateTask(){
    this.tasks[this.updatedIndex].Title = this.todoForm.value.item
    this.tasks[this.updatedIndex].Complated = false
    this.todoForm.reset()
    this.updatedIndex = undefined
    this.isEnabled =false

  }
  OnEditTask(task:Task,taskId:number){
this.todoForm.controls['item'].setValue(task.Title)
this.updatedIndex = taskId
this.isEnabled = true
  }
  deleteTask(taskId:number){
this.tasks.splice(taskId,1)
  }
  deleteInprogressTask(taskId:number){
    this.inprogress.splice(taskId,1)
  }
  deleteDoneTask(taskId:number){
    this.done.splice(taskId,1)
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
