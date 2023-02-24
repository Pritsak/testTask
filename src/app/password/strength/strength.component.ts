import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-strength',
  templateUrl: './strength.component.html',
  styleUrls: ['./strength.component.scss']
})
export class StrengthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() first!: string
  @Input() second!: string 
  @Input() third!: string 

}
