import * as axiosModulo from './axios.js';


function crearElemento(tag,contenido,icono = {})
{
    const elemento = document.createElement(tag);
    elemento.textContent = contenido;

    if (icono.imagenSrc) 
    {
        const imagen = document.createElement('img');
        imagen.src = icono.imagenSrc;
        elemento.appendChild(imagen);
    }

    return elemento;
}

export function limpiarForm()
{
    console.log("limpiando el form");
              
    document.getElementById('nombre').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('alias').value = '';
    document.getElementById("spinner").style.display = "none";
        
   
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
        limpiarForm();

    }
    catch(error)
    {
        console.error("Debe seleccionar un mosntruo para eliminar",error.message);
        alert("Debe seleccionar una fila antes de eliminar!!");

    }
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

                tarjeta.appendChild(crearElemento('p', "Nombre", {imagenSrc:'./assets/nombre.png'}));
                const nombre = crearElemento('label', monstruo.nombre);
                tarjeta.appendChild(nombre);

                tarjeta.appendChild(crearElemento('p', "Tipo", {imagenSrc:'./assets/tipo.png'}));
                const tipo = crearElemento('label', monstruo.tipo);
                tarjeta.appendChild(tipo);

                tarjeta.appendChild(crearElemento('p', "Alias", {imagenSrc:'./assets/alias.png'}));
                const alias = crearElemento('label', monstruo.alias);
                tarjeta.appendChild(alias);

                tarjeta.appendChild(crearElemento('p', "Alineamiento", {imagenSrc:'./assets/alineamiento.png'}));
                const alineamiento = crearElemento('label', monstruo.alineamiento);
                tarjeta.appendChild(alineamiento);

                tarjeta.appendChild(crearElemento('p', "Experiencia", {imagenSrc:'./assets/experiencia.png'}));
                const xp = crearElemento('label', monstruo.xp);
                tarjeta.appendChild(xp);

                    
                contenedorTarjetas.append(tarjeta);

            }
        );
    }
    else
    {
        console.log('No hay monstruos guardados')
    }    
}


renderizarTarjeta();