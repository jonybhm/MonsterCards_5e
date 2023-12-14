const URL = "http://localhost:3000/monstruos";


export function postMonstruo(new_Monstruo)
{
       
    const xhr = new XMLHttpRequest();
    
    document.getElementById("spinner").style.display = "flex";
 

    xhr.onreadystatechange = ()=>
    {
        if(xhr.readyState == 4)
        {
            document.getElementById("spinner").style.display = "none";

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
        }
    }    
    
    xhr.open("POST", URL, true);
    

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    try
    {
        xhr.send(JSON.stringify(new_Monstruo));
    }
    catch(error)
    {
        console.log(error);
    }
}


export async function getMonstruos()
{

    document.getElementById("spinner").style.display = "flex";

    try 
    {
        const res = await fetch(URL);
        if(!res.ok)
        {
            throw new Error(`Error ${res.status}: ${res.statusText}`);;
        }
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(res)
    {        
        console.error(`Error ${res.status}: ${res.statusText}`);
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



export function getPersona(id)
{
    const xhr = new XMLHttpRequest();

     document.getElementById("spinner").style.display = "flex";

    xhr.onreadystatechange = ()=>
    {
        if(xhr.readyState == 4)
        {
            document.getElementById("spinner").style.display = "none";
            
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            
        }
    }
    
    xhr.open("GET", URL + `/${id}`, true);

    try
    {
        xhr.send();
    }
    catch(error)
    {
        console.log(error);
    }
}

