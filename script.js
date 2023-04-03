
let productos=[
    {id:1, menu:'Pizza común', categoria:'comida', precio:200},
    {id:2, menu:'Pizza con muzarella', categoria:'comida', precio:260},
    {id:3, menu:'Pizza con un gusto', categoria:'comida', precio:280},
    {id:4, menu:'Pizza con dos gustos', categoria:'comida', precio:300},
    {id:5, menu:'Papas fritas', categoria:'comida', precio: 100},
    {id:1001, menu:'Cocacola 600 ml', categoria:'bebida', precio: 100},
    {id:1002, menu:'Cocacola 1l', categoria:'bebida', precio:160},
    {id:1003, menu:'Sprite 600 ml', categoria:'bebida', precio:100},
    {id:1004, menu:'Sprite 1l', categoria:'bebida', precio:160},
]

 let inicio='-------------  Pizza Script  ------------\n\n1- Lista de productos \n2- Filtrar productos \n3- Carrito \n4- Agregar productos al carrito \n5- Confirmar compra \n0- Salir\n'
 let opcion
 let carrito=[]

alert('\n           Bienvenidos a Pizza Script         \n\n------------------------------------------------------------\n %15 de DESCUENTO, Compra mayor o igual a $600\n------------------------------------------------------------\n')
 do {
    opcion=Number(prompt(inicio))
    switch (opcion) {
        case 1:
            alert('Lista de productos\n'+ listaProductos(productos))
            break;
        case 2:
            let filtro=Number(prompt('Ingrese una categoria para filtrar los productos:\n1- Categorias\n2- Precio\n0- Volver al inicio'))
            
            if (filtro===1){
                let selecCategoria=Number(prompt('Seleccione su categoria:\n1- Comida\n2- Bebida'))
                
                if(selecCategoria===1){
                    let productosFiltrados = productos.filter(producto=>producto.categoria==='comida')
                    alert(listaProdFiltrados(productosFiltrados))
                    
                }
                if(selecCategoria===2){
                    let productosFiltrados = productos.filter(producto=>producto.categoria==='bebida')
                    alert(listaProdFiltrados(productosFiltrados))
                    
                }
                if ((selecCategoria!=1) && (selecCategoria!=2)) {
                    alert('No existe producto con esa categoria')
                }
            }
            if (filtro===2){
                let min = Number(prompt('Ingrese monto mínimo en $:'))
                let max= Number(prompt('Ingrese monto máximo en $:'))
                let productosFiltrados = productos.filter(producto=>((producto.precio>=min) &&(producto.precio<=max)))
                alert(`Precio filtrado desde $ ${min} hasta $ ${max}:\n`+listaProdFiltrados(productosFiltrados))
            }
                
            break;

        case 3:
            if(carrito.length!=0){
                let totalCarrito=carrito.map(function(producto){
                    return producto.precioTotal
                })
                 let sumaTotalCarrito =  totalCarrito.reduce(function(a,b){
                     return a+b
                 })

                let totalAPagar
                if (sumaTotalCarrito>=600){
                    totalAPagar=sumaTotalCarrito*.85
                }else{totalAPagar=sumaTotalCarrito}
                                
                let descuento= sumaTotalCarrito*Number(.15)
                let etiDescuento=''
                    if (sumaTotalCarrito>=600){
                        etiDescuento= `\n------------------------------------------------------\n   Bonificacion por descuento %15 :      $${descuento}\n------------------------------------------------------`
                    } else{ (sumaTotalCarrito<600)
                        etiDescuento=''
                        }


                alert('Productos del carrito:\n'+listaCarrito(carrito)+etiDescuento+'\n\n----------------   TOTAL:  $'+ totalAPagar+'   ----------------')


            } else(alert('Carrito vacío'))
            break
        
        case 4:
            let idProducto= Number(prompt('Seleccione ID del producto para agregar al carrito:\n'+listaProductos(productos)))

                
                let productoBuscado = productos.find(producto=> producto.id===idProducto)
            
                if(productoBuscado){
            
                    let confirmacion = Number(prompt('Desea agregar al carrito el producto:\n\n   "'+productoBuscado.id+'- '+productoBuscado.menu+'"--- $'+productoBuscado.precio+'\n\n1- Aceptar\n2 - Cancelar'))
                    if (confirmacion===1){

                        const productoExistente=carrito.find(p=>p.id===idProducto)
                                if (productoExistente){
                                    productoExistente.cantidad ++
                                    productoExistente.precioTotal=Number(productoExistente.cantidad)*Number(productoExistente.precioUnit)
                                } else{
                                    
                                    carrito.push({
                                        id: productoBuscado.id,
                                        menu: productoBuscado.menu,
                                        categoria: productoBuscado.categoria,
                                        precioUnit: productoBuscado.precio,
                                        cantidad: Number(1),
                                        precioTotal: productoBuscado.precio
                                    })
                                }
                            

                        
                        alert('Producto agregardo correctamente')
            
                    }
                    if(confirmacion===2){break}
                    if((confirmacion!=1)&&(confirmacion!=2)){
                        alert('Opnción ingresada no es válida, vuelva a intentarlo')
                    }
                }
            
                if(!productoBuscado){
                    alert('ID ingresado incorrecto, o no existe ningun producto asociado ')
                }
                break

        case 5:
            if (carrito.length!=0){
                alert('\nSu compra a sido confirmada\n\n---------- Muchas gracias por su preferencia ----------')
                opcion='ok'
            } else(alert('Carrito vacío'))
                
                break

        default:
            if (opcion!=0) {
                alert('A selecionado una opción incorrecta')
            }
            break;
    }
 } while (opcion!=0 && opcion!='ok');

 function listaProductos(productos){
    return productos.map(producto=>{
        return`ID: ${producto.id}- ${producto.menu} ------ $ ${producto.precio}`
    }).join('\n')
}

function listaProdFiltrados(productosFiltrados){
    return productosFiltrados.map(producto=>{
        return`ID: ${producto.id}- ${producto.menu} ------ $ ${producto.precio}`
        }).join('\n')
        
    }

function listaCarrito(carrito){
    return carrito.map(p=>{
        return`ID: ${p.id}- ${p.menu}------ Unidades: ${p.cantidad}\n              Precio Unit: $${p.precioUnit} ------  Sub Total: $ ${p.precioTotal}`
    }).join('\n\n')
}

