import { Injectable } from "@angular/core"
import { NotificationService } from "app/shared/messages/notification.service"
import { MenuItem } from "../menu-item/menu-item.model"
import { CartItem } from "./cart-item.model"

@Injectable()
export class ShoppingCartService{
    
    items: CartItem[] =[]
    
    constructor(private notificationService: NotificationService){}

    clear():void{
        this.items=[]
    }

    addItem(item:MenuItem):void{
        let foundItem = this.items.find((mItem => mItem.menuItem.id == item.id)) //acha um item no array
        if(foundItem){ //se tiver achado 
            this.increaseQty(foundItem)
        }
        else{
            this.items.push(new CartItem(item))
        }
        this.notificationService.notify("Você adicionou o item "+item.name )
    }

    removeItem(item: CartItem):void{
        this.items.splice(this.items.indexOf(item),1)
        this.notificationService.notify("Você removeu o item "+item.menuItem.name )

    }
    total():number{
        return this.items.map(item => item.value()).reduce((prev,value) =>prev+ value,0)
    }
    increaseQty(item: CartItem) {
        item.quantity++
    }

    decreaseQty(item: CartItem) {
        item.quantity--
        if(item.quantity === 0){
            this.removeItem(item)
        }
    }
}