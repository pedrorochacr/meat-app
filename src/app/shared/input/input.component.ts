import { Component, Input, OnInit, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName} from '@angular/forms';
@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit{

  @Input() label: string
  @Input() errorMessage: string
  
  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName
  input: any


  constructor() { }

  ngAfterContentInit(): void{
      this.input = this.model || this.control //se model nao tiver disponivel, usa o control
      if(this.input === undefined){
        throw new Error("Esse componente precisa ser usado com uma diretiva NgModel ou FormControlName")
      }
  }

  hasSuccess():boolean{
      return (this.input.valid) && (this.input.dirty || this.input.touch)
  }
  hasError():boolean{
    return (!this.input.valid) && (this.input.dirty || this.input.touch)
  }
  
  ngOnInit() {
  }

}
