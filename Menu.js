class Menus{
    constructor(id,menu,categoria,precio){
        this.id= id
        this.manu=menu
        this.categoria=categoria
        this.precio=precio
    }
    etiquetaMenu(){
        return this.id + '- ' + this.menu + ' -------- $ ' + this.precio
    }
}