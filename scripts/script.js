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
            const id = Math.floor(Math.random()*1000000);
            const nombre = formulario.querySelector('#nombre').value;
            const alias = formulario.querySelector('#alias').value;
            
            let alineamiento;

            const opcionesRadio = document.querySelectorAll('input[name="alineamiento"]');

            opcionesRadio.forEach
            (
                function(radio)
                {
                    if(radio.checked)
                    {
                        alineamiento = radio.value;
                    }
                }
            )
            
            const tipo = formulario.querySelector('#tipo').value;
            const xp = formulario.querySelector('#xp').value;
            
            const idMonstruo = idMonstruoEnviado;
            console.log("ID Monstruo:",idMonstruo);

            if(idMonstruo != null)
            {
                const updatedMonstruo = new monstruoModulo.Monstruo (idMonstruo,nombre,tipo,alias,alineamiento,xp);

                await axiosModulo.updMonstruo(updatedMonstruo)     
                idMonstruoEnviado = null;

            }
            else
            {
                const nuevoMonstruo = new monstruoModulo.Monstruo (id,nombre,tipo,alias,alineamiento,xp);
                console.log("Antes postMonstruo");
                await axiosModulo.postMonstruo(nuevoMonstruo)
                console.log("Despues postMonstruo");    
                monstruosGuardados = await axiosModulo.getMonstruos();


            }
            principalModulo.limpiarForm();

            if(columnasSeleccionadasLocal)
                {            

                    guardarColumnasSeleccionadasLocalStorage();
                                        
                    actualizarCabecera(columnasSeleccionadasLocal);
                    renderizarTablaConMonstruos(columnasSeleccionadasLocal);   
                }
                else
                {
                    
                    guardarColumnasSeleccionadasLocalStorage();
                                    
                    actualizarCabecera(columnasSeleccionadas);
                    renderizarTablaConMonstruos(columnasSeleccionadas);
                }

            
                  
        }
        catch(error)
        {
            console.error(error.message)
        }
        

    }    
);

const botonEliminar = document.getElementById('btnDelMonstruo');
    
botonEliminar.addEventListener
(
    'click',async function(event)
    {
        event.preventDefault();
        try
        {

            await principalModulo.borrarMonstruo(idMonstruoEnviado,monstruosGuardados);
            

            if(columnasSeleccionadasLocal)
                {            
                                       
                    actualizarCabecera(columnasSeleccionadasLocal);
                    renderizarTablaConMonstruos(columnasSeleccionadasLocal);   
                }
                else
                {                   
                                    
                    actualizarCabecera(columnasSeleccionadas);
                    renderizarTablaConMonstruos(columnasSeleccionadas);
                }
        }
        catch(error)
        {
            console.error(error.message);

        }
    }
);

const botonCancelar = document.getElementById('btnCancelMonstruo');
    
botonCancelar.addEventListener
(
    'click',async function(event)
    {
        event.preventDefault();
        try
        {
            idMonstruoEnviado = null;
            principalModulo.limpiarForm();
        }
        catch(error)
        {
            console.error(error.message);

        }
    }
);



let checkboxes = document.querySelectorAll('input[type="checkbox"]');

function seleccionarColumnas()
{    
    return Array.from(checkboxes).map
    (
        function(checkbox)
        {
            return checkbox.dataset.column;
        }
    );
}

let columnasSeleccionadas = seleccionarColumnas();

let columnasSeleccionadasLocal = JSON.parse(localStorage.getItem('columnasSeleccionadas'));

checkboxes.forEach
(
    function (checkbox) 
    {
        checkbox.addEventListener
        (
            'change', function () 
            {
                checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
                

                if(columnasSeleccionadasLocal)
                {            

                    guardarColumnasSeleccionadasLocalStorage();
                                        
                    actualizarCabecera(columnasSeleccionadasLocal);
                    renderizarTablaConMonstruos(columnasSeleccionadasLocal);   
                }
                else
                {
                    
                    guardarColumnasSeleccionadasLocalStorage();
                                    
                    actualizarCabecera(columnasSeleccionadas);
                    renderizarTablaConMonstruos(columnasSeleccionadas);
                }
            }
        );            
    }
);

function guardarColumnasSeleccionadasLocalStorage()
{

    columnasSeleccionadas =  seleccionarColumnas();

    localStorage.setItem('columnasSeleccionadas', JSON.stringify(columnasSeleccionadas));

    columnasSeleccionadasLocal = JSON.parse(localStorage.getItem('columnasSeleccionadas'));
    
}



    



function actualizarCabecera(columnasSeleccionadas)
{
    const tablaMonstruos = document.getElementById('tablaMonstruos');
    const cabecera = tablaMonstruos.querySelector('thead tr');

    while(cabecera.cells.length > 0)
    {
        cabecera.deleteCell(0);
    }
   
    columnasSeleccionadas.forEach
    (
        function(columna)
        {
            const celda = cabecera.insertCell();
            celda.textContent = columna;  
        }
    )
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

    let promedioXP = 0;
    
    if(valoresXP.length > 0)
    {
        const sumaXP = valoresXP.reduce
        (
            function(anterior,actual)
            {
                return parseInt(anterior) + parseInt(actual);
            }
        )
        promedioXP = parseInt(sumaXP)/parseInt(valoresXP.length);
    }
    
    
    return promedioXP;
}

let idMonstruoEnviado;

function cargarDatosEnFormulario(monstruo)
{
    document.getElementById("spinner").style.display = "flex";
    setTimeout
    (
        function()
        {
            idMonstruoEnviado = monstruo.id;
            console.log("Id monstruo enviado:",idMonstruoEnviado)
            document.getElementById('nombre').value = monstruo.nombre;
            document.getElementById('tipo').value = monstruo.tipo;
            document.getElementById('alias').value = monstruo.alias;
            
            const radioInput = monstruo.alineamiento ? document.querySelector(`input[name="alineamiento"][value="${monstruo.alineamiento}"]`) : null;

            if(radioInput)
            {
                radioInput.checked = true;                
            }
            

            document.getElementById('xp').value = monstruo.xp;
            document.getElementById("spinner").style.display = "none";
        }, "1000"
    );
}


//FILTRAR POR TIPO

const miDropdown = document.getElementById('filtroTipos');

tiposDeMonstruos.forEach
(
    function(tipo)
    {
        const opcionElement = document.createElement('li');
        opcionElement.innerHTML = `<a class="dropdown-item" href="#tablaMonstruos">${tipo}</a>`;
        miDropdown.appendChild(opcionElement);
    }
);

let criterio = 'Todos';
console.log('valor seleccionado', criterio)

miDropdown.addEventListener
(
    'click', function(event)
    {
        event.preventDefault();
        
        if(event.target.classList.contains('dropdown-item'))
        {
            criterio = event.target.textContent.trim();
            console.log('valor seleccionado', criterio)
            
            if(columnasSeleccionadasLocal)
            {         
                                
                actualizarCabecera(columnasSeleccionadasLocal);
                renderizarTablaConMonstruos(columnasSeleccionadasLocal);   
            }
            else
            {        
                                
                actualizarCabecera(columnasSeleccionadas);
                renderizarTablaConMonstruos(columnasSeleccionadas);
            }
        }
    }
);


//RENDERIZAR TABLA

let monstruosGuardados;

async function renderizarTablaConMonstruos(columnasSeleccionadas)
{
    console.log("se llamo a renderizar tabla correctamente.")
    monstruosGuardados = await axiosModulo.getMonstruos();
    const tablaMonstruos = document.getElementById('tablaMonstruos');
 

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
    );
}
document.querySelector("#tipoDeFiltro").value = criterio;
        
    if(monstruosGuardados !== null)
    {

        const promedioExperiencia = calcularPromedio(monstruosGuardados);
        document.querySelector("#promedioExperiencia").value = promedioExperiencia;

        
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

                
                fila.addEventListener
                (
                    'click',function()
                    {
                        cargarDatosEnFormulario(monstruo);
                    }
                );
            }
        );      
          
    }
    else
    {
        console.log('No hay monstruos guardados')
    }    
}



if(columnasSeleccionadasLocal)
    {         
                          
        actualizarCabecera(columnasSeleccionadasLocal);
        renderizarTablaConMonstruos(columnasSeleccionadasLocal);   
    }
    else
    {        
                        
        actualizarCabecera(columnasSeleccionadas);
        renderizarTablaConMonstruos(columnasSeleccionadas);
    }
