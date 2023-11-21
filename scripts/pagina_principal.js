import * as axiosModulo from './axios.js';


function crearElemento(tag,contenido)
{
    const elemento = document.createElement(tag);
    elemento.textContent = contenido;
    return elemento;
}

export async function editarMonstruo(id,monstruosGuardados)
{
    let monstruoAEditar = monstruosGuardados.find 
    (
        function(monstruo)
        {
        return monstruo.id == id;
        } 
    );

    monstruoAEditar.nombre = prompt ('Ingrese Nombre Nuevo:', monstruoAEditar.nombre);
    monstruoAEditar.tipo = prompt ('Ingrese Tipo Nuevo:', monstruoAEditar.tipo);
    monstruoAEditar.alias = prompt ('Ingrese Alias Nuevo:', monstruoAEditar.alias);
    monstruoAEditar.alineamiento = prompt ('Ingrese Alineamiento Nuevo:', monstruoAEditar.alineamiento);
    monstruoAEditar.xp = prompt ('Ingrese Experiencia Nueva:', monstruoAEditar.xp);

    try
    {
        await axiosModulo.updMonstruo(monstruoAEditar);
    }
    catch(error)
    {
        console.error(error.message);

    }
    
}


export async function borrarMonstruo(id,monstruosGuardados)
{
    let monstruoABorrar = monstruosGuardados.find 
    (
        function(monstruo)
        {
        return monstruo.id == id;
        } 
    );

    try
    {
        await axiosModulo.delMonstruo(monstruoABorrar.id);
    }
    catch(error)
    {
        console.error(error.message);
    }
}

function limpiarTarjetas(contenedorTarjetas)
{    
    const botonLimpiar = document.getElementById('boton-limpiar');
    
    botonLimpiar.addEventListener
    (
        'click',function()
        {
            localStorage.removeItem('monstruos');
            contenedorTarjetas.innerHTML ='';
        }
    );
}


async function renderizarTarjeta()
{
    const monstruosGuardados = await axiosModulo.getMonstruos();
    console.log("monstruos guardados:",monstruosGuardados);
    
    const contenedorTarjetas = document.getElementById('tarjetas-monstruos');
    
    contenedorTarjetas.innerHTML = '';
    
    if(monstruosGuardados !== null)
    {
        monstruosGuardados.forEach
        (
            function(monstruo)
            {
                const tarjeta = document.createElement('form');

                tarjeta.appendChild(crearElemento('p', "Nombre"));
                const nombre = crearElemento('label', monstruo.nombre);
                tarjeta.appendChild(nombre);

                tarjeta.appendChild(crearElemento('p', "Tipo"));
                const tipo = crearElemento('label', monstruo.tipo);
                tarjeta.appendChild(tipo);

                tarjeta.appendChild(crearElemento('p', "Alias"));
                const alias = crearElemento('label', monstruo.alias);
                tarjeta.appendChild(alias);

                tarjeta.appendChild(crearElemento('p', "Alineamiento"));
                const alineamiento = crearElemento('label', monstruo.alineamiento);
                tarjeta.appendChild(alineamiento);

                tarjeta.appendChild(crearElemento('p', "Experiencia"));
                const xp = crearElemento('label', monstruo.xp);
                tarjeta.appendChild(xp);

                const botonEditar = crearElemento('button', 'Editar');
                tarjeta.appendChild(botonEditar);

                const botonBorrar = crearElemento('button', 'Borrar');
                tarjeta.appendChild(botonBorrar);
    
                botonEditar.addEventListener
                (
                    'click',async function(event)
                    {
                        event.preventDefault();
                        try
                        {
                            await editarMonstruo(monstruo.id,monstruosGuardados);
                        }
                        catch(error)
                        {
                            console.error(error.message);
                        }
                    }
                );
                
                botonBorrar.addEventListener
                (
                    'click',async function(event)
                    {
                        event.preventDefault();
                        try
                        {
                            await borrarMonstruo(monstruo.id,monstruosGuardados);
                        }
                        catch(error)
                        {
                            console.error(error.message);
                        }
                    }
                );
    
                contenedorTarjetas.append(tarjeta);

                limpiarTarjetas(contenedorTarjetas);
            }
        );
    }
    else
    {
        console.log('No hay monstruos guardados')
    }    
}


renderizarTarjeta();