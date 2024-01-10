import {fetchAnyUrl, crudSailboat, postObjectAsJson} from "../module/modulejson.js";

const sailboatsListUrl = 'http://localhost:8080/allboats'
const tableSailboats = document.getElementById("tableSailboats");

const url = "http://localhost:8080/sailboat"


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

    cell = row.insertCell(cellCount++);
    const pbEdit = document.createElement("input");
    pbEdit.type = "button";
    pbEdit.setAttribute("value", "Edit sailboat");
    pbEdit.className = "editbtn";

    pbEdit.onclick = function () {
        const newBoatType = window.prompt("Enter new boat type:", sailboat.boatType);

        if (newBoatType !== null) {
            sailboat.boatType = newBoatType;
            cell = row.cells[1];
            cell.innerHTML = newBoatType;

            const putUrl = url + "/" + sailboat.id

            postObjectAsJson(putUrl, sailboat, "PUT")
        }
    };

    cell.appendChild(pbEdit);

}

async function deleteSailboat(sailboat)
{
    try{
        const urlDelete = url + "/" + sailboat.id
        await postObjectAsJson(urlDelete, sailboat, 'DELETE')

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