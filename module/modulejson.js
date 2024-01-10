const sailboatUrl = "http://localhost:8080/sailboat"

function fetchAnyUrl(url)
{
    console.log("inside fetch url = " + url)
    return fetch(url).then(response => response.json())
}

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }

    const response = await fetch(url, fetchOptions)
    return response;

}

async function restDelete(url)
{
    const fetchOptions =
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""
        }
    const response = await fetch(url, fetchOptions)
    return response
}

async function crudSailboat(sailboat, httpVerbum)
{
    let url = sailboatUrl + "/" + sailboat.id;
    console.log(url)
    if(httpVerbum == "POST")
    {
        url = "http://localhost:8080/newsailboat"
    }
    const res = await postObjectAsJson(url, sailboat, httpVerbum)
    if (res.ok)
    {
        if(httpVerbum == 'DELETE') {
            alert('Sailboat has been deleted')
        }
        if(httpVerbum == 'PUT') {
            alert('Sailboat has been updated')
        }
        if(httpVerbum == 'POST') {
            alert('Sailboat has been created and saved')
        }
    }
}


export {fetchAnyUrl, restDelete, crudSailboat, postObjectAsJson}