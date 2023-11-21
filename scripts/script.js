import * as monstruoModulo from './monstruo.js';
import * as axiosModulo from './axios.js';
import * as principalModulo from './pagina_principal.js';


const tiposDeMonstruos = JSON.parse(localStorage.getItem('tiposDeMonstruos'));



function crearOpcionesSelect(selectTipo)
{
    tiposDeMonstruos.forEach
    (
        function(tipo) 
        {
        const option = document.createElement('option');
        option.value = tipo;
        option.text = tipo;
        selectTipo.appendChild(option);
        }
    );
}
const selectTipo = document.getElementById('tipo');
crearOpcionesSelect(selectTipo);

    
const formulario = document.forms[0];

formulario.addEventListener
(
    'submit', async function(event)
    {
        try
        {
            event.preventDefault();
            const id = Math.random();
            const nombre = formulario.querySelector('#nombre').value;
            const alias = formulario.querySelector('#alias').value;
            const alineamiento = formulario.querySelector('#alineamiento').value;
            const tipo = formulario.querySelector('#tipo').value;
            const xp = formulario.querySelector('#xp').value;
            
            const nuevoMonstruo = new monstruoModulo.Monstruo (id,nombre,tipo,alias,alineamiento,xp);
            
            await axiosModulo.postMonstruo(nuevoMonstruo)        
        
           

        }
        catch(error)
        {
            console.error(error.message)
        }
    }    
);

function crearBoton(nombreIcono,fila,numeroCelda,funcionBoton,idMonstruo,listaMonstruosGuardados)
{
    const imagen = document.createElement('img');
    imagen.src = `./assets/${nombreIcono}.png`;
    imagen.style.width = "30px";
    const boton = document.createElement('button');
    boton.appendChild(imagen);
    fila.insertCell(numeroCelda).appendChild(boton);
    
    boton.addEventListener
    (
        'click',async function(event)
        {
            event.preventDefault();
            try
            {
                await funcionBoton(idMonstruo,listaMonstruosGuardados);
            }
            catch(error)
            {
                console.error(error.message);
            }
        }
    );
}

function obtenerColumnasSeleccionadas()
{
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map
    (
        function(checkbox)
        {
            return checkbox.dataset.column;
        }
    );
}

function calcularPromedio(monstruosGuardados)
{
    const valoresXP = monstruosGuardados.map
    (
        function(monstruo)
        {
            return monstruo.xp;
        }
    )
    
    const sumaXP = valoresXP.reduce
    (
        function(anterior,actual)
        {
            return parseInt(anterior) + parseInt(actual);
        }
    )
    
    const promedioXP = parseInt(sumaXP)/parseInt(valoresXP.length);
    
    console.log(promedioXP);
    return promedioXP;
}


async function renderizarTablaConMonstruos()
{
    let monstruosGuardados = await axiosModulo.getMonstruos();
    const tablaMonstruos = document.getElementById('tablaMonstruos');
 
    const criterio = document.getElementById('filtrarTipo').value;
    
    while (tablaMonstruos.rows.length > 1) 
    {
        tablaMonstruos.deleteRow(1);
    }

    if(criterio != "Todos")
    {        
        monstruosGuardados = monstruosGuardados.filter 
        (
            function(monstruo)
            {    
                return monstruo.tipo == criterio;
            }
        )
    }

    if(monstruosGuardados !== null)
    {

        const promedioExperiencia = calcularPromedio(monstruosGuardados);
        document.querySelector("#promedioExperiencia").value = promedioExperiencia;

        const columnasSeleccionadas = obtenerColumnasSeleccionadas();

        monstruosGuardados.sort
        (
            function(a,b)
            {
                return b.xp - a.xp
            }
        )


        monstruosGuardados.forEach
        (
            function(monstruo)
            {
                const fila = tablaMonstruos.insertRow();


                columnasSeleccionadas.forEach
                (
                    function(columna)
                    {
                        fila.insertCell().textContent = monstruo[columna];
                    }
                );

                crearBoton("editar",fila,columnasSeleccionadas.lenght,principalModulo.editarMonstruo,monstruo.id,monstruosGuardados)
                
                crearBoton("borrar",fila,columnasSeleccionadas.lenght,principalModulo.borrarMonstruo,monstruo.id,monstruosGuardados)
            }
        );       

        
           
    }
    else
    {
        console.log('No hay monstruos guardados')
    }    
}



const seleccionTipo = document.getElementById('filtrarTipo');
crearOpcionesSelect(seleccionTipo);
seleccionTipo.addEventListener('change', renderizarTablaConMonstruos);

document.querySelectorAll(".checkbox-columna").forEach
(
    function(checkbox)
    {
        checkbox.addEventListener('change', renderizarTablaConMonstruos)
    }
);

renderizarTablaConMonstruos();

