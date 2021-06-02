const socket = io();

const tableBody = document.getElementById("table-body");

socket.on("listUsers", (users) => {
    cleanTable();
    users.forEach((user) => appendUser(user));
});

socket.on("updatedUser", user => updateUserReceive(user));

socket.on("deletedUser", id => {
   const tr = document.getElementById(id);
   if(tr) {
       tr.outerHTML = "";
   }
});

function cleanTable() {
    tableBody.innerHTML = "";
}

function appendUser(user) {
    const tr = document.createElement("tr");
    tr.id = user._id;
    const nameTd = getNameTd(user);

    tr.appendChild(nameTd);
    const usernameTd = getUsernameTd(user);

    tr.appendChild(usernameTd);
    const statusTd = getActiveTd(user);

    tr.appendChild(statusTd);
    tr.appendChild(getCrudButtons(user._id));

    tableBody.appendChild(tr);
}

function getNameTd(user) {
    const nameTd = document.createElement("td");
    const inputFirstName = document.createElement("input");
    inputFirstName.type = "text";
    inputFirstName.name = "firstName";
    inputFirstName.value = user.firstName;
    const inputLastName = document.createElement("input");

    inputLastName.type = "text";
    inputLastName.name = "lastName";
    inputLastName.value = user.lastName;
    nameTd.appendChild(inputFirstName);

    nameTd.appendChild(inputLastName);
    return nameTd;

}

function getUsernameTd(user) {
    const usernameTd = document.createElement("td")
    const inputUsername = document.createElement("input");

    inputUsername.type = "text";
    inputUsername.name = "username";
    inputUsername.disabled = true;
    inputUsername.value = user.username;
    usernameTd.appendChild(inputUsername);

    const inputPassword = document.createElement("input");

    inputPassword.type = "text";
    inputPassword.name = "password";
    inputPassword.value = user.password;
    usernameTd.appendChild(inputPassword);

    return usernameTd;
}

function getActiveTd(user) {
    const statusTd = document.createElement("td");
    const inputStatus = document.createElement("input");

    inputStatus.type = "checkbox";
    inputStatus.name = "active";
    inputStatus.checked = user.active;
    inputStatus.value = user.active;
    inputStatus.disabled = true;
    statusTd.appendChild(inputStatus);

    return statusTd;
}

function getCrudButtons(id) {
    const crudButtonsStr = "<td style=\"width: 20%;\" class=\"crud-buttons\">" +
        "<a class=\"table-link\" onclick='activateDeactivateUserEmit(\"" + id + "\")'><span class=\"fa-stack\">" +
        "<i class=\"fa fa-square fa-stack-2x\"></i>" +
        "<i class=\"fa fa-search-plus fa-stack-1x fa-inverse\"></i>" +
        "</span></a>" +
        "<a class=\"table-link\" onclick='updateUser(\"" + id + "\")'><span class=\"fa-stack\">" +
        "<i class=\"fa fa-square fa-stack-2x\"></i>" +
        "<i class=\"fa fa-pencil fa-stack-1x fa-inverse\"></i>" +
        "</span></a>" +
        "<a class=\"table-link danger\" onclick='deleteUser(\"" + id + "\")'><span class=\"fa-stack\">" +
        "<i class=\"fa fa-square fa-stack-2x\"></i>" +
        "<i class=\"fa fa-trash-o fa-stack-1x fa-inverse\"></i>" +
        "</span></a>" +
        "</td>";

    const crudButtonsTd = document.createElement("td");
    crudButtonsTd.innerHTML = crudButtonsStr;

    return crudButtonsTd;
}

function activateDeactivateUserEmit(id) {
    socket.emit("activateDeactivateUser", id);
}

function updateUserReceive(user) {
    document.getElementById(user._id).outerHTML = "";
    appendUser(user);
}

function deleteUser(id) {
    socket.emit("deleteUser", id);
}

function updateUser(id) {
    const td = document.getElementById(id);
    const inputs = Array.from(td.querySelectorAll("input"));

    const user = inputs.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
    }, {});

    user._id = id;

    user.active = user.active === "true";

    socket.emit("updateUser", user);
}
