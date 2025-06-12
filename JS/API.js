

const Api = "https://retoolapi.dev/Cnm9gT/Employees_SSO";

async function GetEmployees(){
    const Respuesta = await fetch(Api)

    const data = await Respuesta.json();

    MostrarDatosEmpleados(data);
}

//DATOS REPRESENTARA AL JSON DONDE VIENEN LA INFORMACION
function MostrarDatosEmpleados(datos) {
  const tabla = document.querySelector("#table tbody");


  //para inyectar codigo HTML usmos "innerHTML"
  tabla.innerHTML = "";

  datos.forEach(Employee => {
    tabla.innerHTML += `
        <tr>
          <td>${Employee.id}</td>
          <td>${Employee.FirstName}</td>
          <td>${Employee.LastName}</td>
          <td>${Employee.Email}</td>
          <td>
           <button onclick="OpenModal('${Employee.id}', '${Employee.FirstName}', '${Employee.LastName}', '${Employee.Email}')"> Editar </button>
           <button onclick="DeleteEmployee(${Employee.id})"> Eliminar </button>
         </td>
        </tr>
        `;
  });
}


GetEmployees();

const modal = document.getElementById("mdAgregar")
const btnClose =  document.getElementById("btnCerrar");
const btnAdd = document.getElementById("BtnAddUser");

const BtnUpdate = document.getElementById("Edit");
const modalEditar = document.getElementById("mdEditar");
const BtnCerrarEditar = document.getElementById("btnCerrarEditar")

function OpenModal(id, newFirstName, newLastName, newEmail){

  document.getElementById("txtID").value = id;
  document.getElementById("txtNewNombre").value = newFirstName;
  document.getElementById("txtNewApellido").value = newLastName;
  document.getElementById("txtNewEmail").value = newEmail;

  modalEditar.showModal();

}


BtnCerrarEditar.addEventListener("click", ()=>{
  modalEditar.close();
})

btnAdd.addEventListener("click", ()=>{
  modal.showModal();
});

btnClose.addEventListener("click", ()=>{
  modal.close()
})


document.getElementById("frmAgregar").addEventListener("submit", async e  => {
  e.preventDefault();
  const FirstName = document.getElementById("txtNombre").value.trim();
  const LastName =  document.getElementById("txtApellido").value.trim();
  const Email =     document.getElementById("txtEmail").value.trim();
  const datos = [FirstName, LastName, Email];
  if(!FirstName || !LastName || !Email){
    alert("Ingrese los valores correctamente")
    return;
  }


  // Llamar a la api para insertar 
  const Answr = await fetch(Api, {
     method: "POST",
     headers: {'Content-Type' : 'application/json'},
     body: JSON.stringify({FirstName, LastName, Email})
  });

  //Verificar respuesta de la Api
  if(Answr.ok){
    Swal.fire({
      title: "Good job!",
      text: "El Empleado a sido registrado Exitosamente",
      icon: "success"
    });
    
    document.getElementById("frmAgregar").reset();
    modal.close();
    GetEmployees();

  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se puedo realizar el registro del empleado!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });

  }
});

document.getElementById("frmEditar").addEventListener("submit", async e  => {
  e.preventDefault();
  const newID = document.getElementById("txtID").value.trim();
  const NewFirstName = document.getElementById("txtNewNombre").value.trim();
  const NewLastName =  document.getElementById("txtNewApellido").value.trim();
  const NewEmail =     document.getElementById("txtNewEmail").value.trim();
  if(!newID || !NewFirstName || !NewLastName|| !NewEmail){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se puedo Actualizar el registro del empleado! faltan campos por rellenar",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
    return;
  }

  // Llamar a la api para insertar 
  const Answr = await fetch(`${Api}/${newID}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      FirstName: NewFirstName,
      LastName: NewLastName,
      Email: NewEmail
    })
  });

  //Verificar respuesta de la Api
  if(Answr.ok){
    Swal.fire({
      title: "Good job!",
      text: "El Empleado a sido Actualizado Exitosamente",
      icon: "success"
    });
    
    modalEditar.close();
    GetEmployees();

  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se puedo Actualizar el registro del empleado!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });

  }
  
});



async function DeleteEmployee(ID_Employee) {
  // Muestra el Swal con la confirmación
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  // Solo elimina si el usuario confirma
  if (result.isConfirmed) {
    // Realiza la solicitud DELETE
    await fetch(`${Api}/${ID_Employee}`, {
      method: "DELETE"
    });

    // Muestra el mensaje de éxito
    await Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });

    // Llama a la función para actualizar los empleados
    GetEmployees();
  } else {
    // Si no confirmaron, muestra un mensaje opcional o realiza otra acción si es necesario.
    console.log("Employee deletion was canceled.");
  }
}