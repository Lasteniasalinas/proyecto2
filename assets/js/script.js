import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

function ObjGasto(nombre, valor=0, id){
    this.nombre = nombre;
    this.valor = valor;
    this.id = id;
}




//formato moneda
const moneda = new Intl.NumberFormat('es-CL', {
	style: 'currency',
	currency: 'CLP',
});

let validaEntrada = (cantidadPresup) => {
	if (isNaN(parseInt(cantidadPresup))) {
		alert('El valor ingresado no es válido');
        return false;
	} else if (parseInt(cantidadPresup < 0)) {
		alert('El valor ingresado debe ser mayor a 0');
		return false;
	} else {
		return true;
	}
};


let valor=0;
 itemPresupuesto.addEventListener('submit',(event)=>{
      event.preventDefault();
      if(validaEntrada(ingPresupuesto.value)){
            valor += parseInt(ingPresupuesto.value);
            totalPresupuesto.innerHTML = moneda.format(valor);
            itemPresupuesto.reset();
    }
  
});



let registrogasto= [];
let nomGasto;
let cantGasto=0;
let idGasto;
let valorTotGasto=0;
let totalGastoi=0;
let flag=false;

itemGasto.addEventListener('submit',(event)=>{
        event.preventDefault();
        nomGasto = nombreGasto.value;
        idGasto = uuidv4().slice(0, 5);
      //  console.log(cantidadGasto.value);
            if (isNaN(parseInt(cantidadGasto.value))){
               alert("Ingresa un valor valido para valor del gasto");
               return;

            }else{
                cantGasto =  parseInt(cantidadGasto.value);
                let itemNuevoGasto= new ObjGasto(nomGasto, cantGasto,idGasto);
                
                // validar si saldo es mayor  al nuevo gasto para agregar
        
                   // console.log(valor, cantGasto, valorTotGasto);
                    totalGastoi += parseInt(itemNuevoGasto.valor);
                    valorTotGasto =  valor-( totalGastoi );
                    console.log("gasto ingresado",totalGastoi , "total presupuesto",valor);
                    console.log("saldo",valorTotGasto);
                    if ((totalGastoi)<=valor){
                       // console.log(totalGastoi);
                        totalSaldo.innerHTML = moneda.format(valorTotGasto); 
                        totalGasto.innerHTML = moneda.format( totalGastoi);
                        flag=true;
                     

                        itemGasto.reset();
                    }else{
                       // console.log("no hay presupuesto");
                       flag=false;
                        alert("no posee el suficiente saldo");
                    
                    }
                    
                    if (flag){
                        registrogasto.push(itemNuevoGasto);
                        enviarDatos();
                        console.log(registrogasto);
                    }else{
                       return;
                        
                    }
                        

            }
  });

 /****************************************************/

let enviarDatos =()=> {
    
    tablaGastos.innerHTML= '';
    registrogasto.forEach((reg) =>{
        console.log("registr",reg);
        tablaGastos.innerHTML += `
        <tr> 
            <td  id="nombregasto">${reg.nombre}</td>
            <td>${moneda.format(reg.valor)}</td>
            <td><button id="borrar" class="btn btn-danger btnBorrar">
                <i class="bi bi-trash3-fill" data-id="${
                    reg.id
                }"></button></i></td>
        </tr>
        `;
    
    });
   
    let btnsBorrar = document.getElementsByClassName('btnBorrar');
    let btnBorrar = [...btnsBorrar];
    btnBorrar.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            borrar(event.target.dataset.id);
           
        });
    });

 
}

/***************************************************/
//borrar gasto
let borrar = (id)=>{
    
    let buscarid = gastos.find((registrogasto) => ObjGasto.id == id);
	let indice = registrogasto.indexOf(encontrado);
	gastosTotal -= buscarid.valor;
	displayGastos.innerHTML = formatter.format(gastosTotal);
	registrogasto.splice(indice, 1);
	enviarDatos();
	
}
    

