

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
           <button> Editar </button>
           <button> Eliminar </button>
         </td>
        </tr>
        `;
  });
}


GetEmployees();

const modal = document.getElementById("mdAgregar")
const btnClose =  document.getElementById("btnCerrar");
const btnAdd = document.getElementById("BtnAddUser");


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