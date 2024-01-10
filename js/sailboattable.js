import {fetchAnyUrl, restDelete} from "../module/modulejson.js";

const sailboatsListUrl = 'http://localhost:8080/allboats'
const deleteSailboatUrl = 'http://localhost:8080/sailboat'
const tableSailboats = document.getElementById("tableSailboats");


function createRow(sailboat)
{
    let cellCount = 0
    let rowCount = tableSailboats.rows.length;

    let row = tableSailboats.insertRow(rowCount);
    row.id = sailboat.id;

    let cell = row.insertCell(cellCount++);
    cell.innerHTML = sailboat.id;

    cell = row.insertCell(cellCount++);
    cell.innerHTML = sailboat.boatType;

    cell = row.insertCell(cellCount++);
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Delete sailboat");
    pbDelete.className = "deletebtn"

    pbDelete.onclick = function()
    {
        document.getElementById(sailboat.id).remove();
        deleteSailboat(sailboat);
    }
    cell.appendChild(pbDelete)

}

async function deleteSailboat(sailboat)
{
    try{
        const urlDelete = deleteSailboatUrl + "/" + sailboat.id
        const resp = await restDelete(urlDelete)

        //Får fejlbeskeder fra backend fra deleteMappingen, altså ResponseEnitity
        const body = await resp.text();
        alert(body)
    } catch (error)
    {
        alert(error.message);
        console.log(error)
    }
}

let sailboatArr = []
async function fetchSailboats()
{
    const colhead = document.getElementById("colhead");
    tableSailboats.innerHTML = "";
    tableSailboats.appendChild(colhead);
    sailboatArr = await fetchAnyUrl(sailboatsListUrl);
    sailboatArr.forEach(createRow);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchSailboats();
});