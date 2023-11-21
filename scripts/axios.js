const URL = "http://localhost:3000/personas";

export function postMonstruo(new_Monstruo)
{
    document.getElementById("spinner").style.display = "flex";
    axios.post(URL,new_Monstruo)
    .then
    (
        ({data})=>
        {
            console.log(data);
        }
    )
    .catch
    (
        ({message})=>
        {console.error(message)
        }
    )
    .finally
    (
        ()=>
        {
            document.getElementById("spinner").style.display = "none";
        }
    )
}

export async function getMonstruos()
{
    document.getElementById("spinner").style.display = "flex";
    try
    {
        const respuesta = await axios.get(URL);
        //console.log(respuesta.data);
        return respuesta.data;
    
    }
    catch (error)
    {

        console.error(error.message);
    }

    finally
    {
            document.getElementById("spinner").style.display = "none";
    }
    
}

export async function delMonstruo(id)
{
    document.getElementById("spinner").style.display = "flex";
    try
    {
    await axios.delete(URL + "/" + id);
    }
    catch(error)
    {
        onsole.error(error.message);
    }
    finally
    {
        document.getElementById("spinner").style.display = "none";
    }
}

export async function updMonstruo(updated_Monstruo)
{
    document.getElementById("spinner").style.display = "flex";
    try
    {
        const response = await axios.put(URL + "/" + updated_Monstruo.id, updated_Monstruo)
        console.log(response.data)
    }
    catch(error)
    {
        console.error(error.message)
    }
    finally
    {
        document.getElementById("spinner").style.display = "none";
    }

}

// export function getMonstruo(id)
// {
//     document.getElementById("spinner").style.display = "flex";
//     axios.get(URL + "/" + id)
//     .then(({data})=>{console.log(data);})
//     .catch(({message})=>{console.error(message)})
//     .finally(()=>{    document.getElementById("spinner").style.display = "none";
// })
// }


