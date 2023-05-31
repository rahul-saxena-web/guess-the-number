import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  hide: boolean = true;
  guessHide: boolean = false;
  playerNameForm!: FormGroup;
  valueForm!: FormGroup;
  player: string = "";
  displayName: boolean = false;
  randomNumber!: number;
  guessedHigh: boolean = false;
  guessedLow: boolean = false;
  guessedRight: boolean = false;
  attempts: number = 0;
  autofocus: string = "on";

  nameSubmit(){
    this.hide=false;
    this.guessHide = true;
    this.player = this.playerNameForm.value.playerName;
    this.displayName = true;
    this.randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(this.randomNumber);
    this.playerNameForm.reset();
  }

  checkData(event : any){
    console.log(event);
    if(event.keyCode==101){
      event.preventDefault();
    }
  }

  checkNumber(){
    this.attempts+=1;
    this.displayName = false;
    if(this.valueForm.value.guessedNumber > this.randomNumber){
      this.guessedLow = false;
      this.guessedHigh = false;
      setTimeout(()=>{
      this.guessedHigh = true;
      },100)
    }
    else if(this.valueForm.value.guessedNumber < this.randomNumber){
      this.guessedHigh = false;
      this.guessedLow = false;
      setTimeout(()=>{
      this.guessedLow = true;
      },100)
    }
    else{
      this.guessedHigh = false;
      this.guessedLow = false;
      this.guessHide = false;
      this.guessedRight = true;
    }
    this.valueForm.reset();
  }

  playAgain(){
    this.hide = true;
    this.guessedRight =false;
    this.attempts = 0;
  }

  ngOnInit() {
      this.playerNameForm = new FormGroup({
        "playerName": new FormControl("", [Validators.required])
      })
      this.valueForm = new FormGroup({
        "guessedNumber": new FormControl("", [Validators.required])
      })
  }
}
