import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Console } from 'console';
import { copyFileSync } from 'fs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  input: any;
  allInput: any;

  ngOnInit(): void {
    this.input = new FormGroup({
      text : new FormControl()
    });
    this.allInput ="";
  }


  checkLastElement():boolean {
    var last ="" + this.input.controls.text.value;
    last = last.substring(last.length-1, last.length);
    if(last == "+" || last == "-"  || last == "/" || last == "*" || last == "") return false;
    return true;
  }


  setOperator(operator: any){
    var last = "" + this.input.controls.text.value;
    if(last == null){}
    else if(this.checkLastElement()){
      this.input.controls.text.setValue(
        this.input.controls.text.value + operator.textContent
      );
    }
    else{
      this.input.controls.text.setValue(
        this.input.controls.text.value.substring(0,this.input.controls.text.value.length-1) + operator.textContent
      );
    }
    
  }

  findLeftNumber(leftSide: any): any{
    let num = "";
    for (let index = leftSide.length-1; index >= 0 ; index--) {
      if(leftSide[index] != "+" && leftSide[index] != "-" && leftSide[index] != "/"  && leftSide[index] != "*"  ){
        num = leftSide[index] + num;
      }
      else{
        break
      } 
    }
    return num;
  }

  findRightNumber(RightSide: any): any{
    let num = "";
    for (let index = 0; index < RightSide.length ; index++) {
      if(RightSide[index] != "+" && RightSide[index] != "-" && RightSide[index] != "/"  && RightSide[index] != "*"  ){
        num += RightSide[index];
      }
      else{
        break
      } 
    }
    return num;
  }


  add(a: number,b: number):number{
    return a + b;
  }

  sub(a: number,b: number):number{
    return a - b;
  }

  mult(a: number,b: number):number{
    return a * b;
  }

  div(a: number,b: number):number{
    return a / b;
  }

  Operator(leftNumber: number,rightNumber: number,operator: string): number{
    let res = 0;
    if(operator == "*"){
      res = this.mult(leftNumber,rightNumber);
    }
    else if(operator == "/"){
      res = this.div(leftNumber,rightNumber);
    }
    else if(operator == "+"){
      res = this.add(leftNumber,rightNumber);
    }
    else if(operator == "-"){
      res = this.sub(leftNumber,rightNumber);
    }
    return res;
  }

  calculateForOperator(input: any,operator: string){
    let index = input.indexOf(operator);
    let leftNumber = this.findLeftNumber(input.substring(0,index));
    let rightNumber = this.findRightNumber(input.substring(index+1,input.length));
    let LeftNumberSize = leftNumber.toString().length;
    let RightNumberSize = rightNumber.toString().length;
    let result = this.Operator(Number(leftNumber), Number(rightNumber),operator);
    this.allInput = input.substring(0, index-LeftNumberSize) + result + input.substring(index+RightNumberSize+1,input.length);
  }


  checkForOperator(operator: string){
    while(this.allInput.indexOf(operator) != -1){
      this.calculateForOperator(this.allInput,operator);
      console.log(this.allInput);
    }
  }

  calculate(){
    this.allInput = this.input.controls.text.value
    this.checkForOperator("*");
    this.checkForOperator("/");
    this.checkForOperator("+");
    this.checkForOperator("-");
    this.input.controls.text.setValue(Number(this.allInput));
  }

  clear(){
    this.input.controls.text.setValue("");
  }

  putPoint(){
    if(this.input.controls.text.value != null){
      var input = "" + this.input.controls.text.value;
      let number = "";
      for (let index = input.length-1; index >= 0; index--) {
        if(input[index] == "+" || input[index] == "*" ||input[index] == "-" || input[index] == "/"){
          break;
        }
        else{
          number = input[index] + number;
        }
      }
      if(number.indexOf(".") == -1){
        this.input.controls.text.setValue(input + ".");
      }
    }
  }

  buttonClick(buttonElement: any){
    let inputText =  buttonElement.textContent
    if( this.input.controls.text.value != null){
        this.input.controls.text.setValue(
          this.input.controls.text.value + inputText
        );
    }
    else{
      this.input.controls.text.setValue(inputText);
    }
  }

}
