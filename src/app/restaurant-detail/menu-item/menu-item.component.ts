import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({ opacity:1})),
      transition('void => ready', [
        style({opacity:0 ,transform: 'translateY(-20px)'}),
        animate('500ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState ='ready'

  @Input() menuItem : MenuItem
  @Output() add= new EventEmitter()

  constructor() { }

  ngOnInit() {

  }
  emitAddEvent(){
    this.add.emit(this.menuItem)
  }
}
