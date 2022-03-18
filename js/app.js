
document.addEventListener('DOMContentLoaded',()=>{
    cargarProductos();
    
})


botonHamburgesa();
copyright();
const btnComprar = document.querySelector('button.btn-comprar');
function mostrarMensaje(mensaje,titulo){  
    const div = document.createElement('div');
    div.classList.add('modal_wrap');
    const divMensajeModal = document.createElement('div');
    divMensajeModal.classList.add('mensaje_modal');    
    divMensajeModal.innerHTML = `
    <h2 style="color:green;background:white;">${titulo}</h2>
    <h3>${mensaje}</h3>     
    <span id="btnClose">Cerrar</span> 
    `;
    div.appendChild(divMensajeModal);
    document.body.appendChild(div);

document.querySelector('#btnClose').addEventListener('click',()=>{
 document.querySelector('.modal_wrap').remove();
});
}
function enviarFormulario(url){      
    const formData = new FormData(form);
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value
    });
    var json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {    
                btnMercadoPago(url);
            } else {               
                
                btnMercadoPago(url);
            }
        })
        .catch(error => {
            console.log(error);           
            
            btnMercadoPago(url);
                })
        
    }
function btnMercadoPago(url){
        const modal = document.querySelector('.modal_wrap .descripcion');
        document.querySelector('.modal_wrap form#form').remove();
       const h2 = document.querySelector('.modal_wrap h2');
       h2.textContent = 'PASO 2 DE 2';

       const btn = document.createElement('a');
       btn.href = url;
       btn.target = '__blank';
       btn.rel = 'noopener';
       btn.classList.add('btnMP');
       btn.textContent = 'Pagar';
        modal.appendChild(btn)
        document.querySelector('.btnMP').addEventListener('click',()=>{
            document.querySelector('.modal_wrap').remove();
            mostrarMensaje('Ni bien registremos el pago nos contactaremos con usted,en caso de haber pagado y no obtener respuesta en 24hs contactarse por instagram,facebook, whatsapp, email o telefono','Muchas gracias por su compra!!');
        });
  
    }
function cargarProductos(){
        
        fetch('../productos.json')
        .then(respuesta =>respuesta.json())
        .then(productos=>mostrarProductos(productos))    
        .catch(err => console.log(err)) 
    }
function mostrarProductos(productos){
    productos.forEach(producto => {
        const {nombre,id,imagen,url,Precio,Talles} = producto;
      

        const divPrincipal = document.querySelector('.ropa-grid');
        

        const divRopa = document.createElement('div');
        divRopa.classList.add('scroll','ropa');
        divRopa.dataset.id = id;

        const h2 = document.createElement('h2');
        h2.textContent = nombre;
        divRopa.appendChild(h2);

        const img = document.createElement('img');
        img.src = imagen;
        divRopa.appendChild(img);

        const select = document.createElement('select');
        select.classList.add('select');


        Talles.forEach(talle=>{
            talleSeleccionado = talle;
            const option = document.createElement('option');
            option.textContent = talle.toUpperCase();
            option.value = talle;
            select.appendChild(option);
        })
        divRopa.appendChild(select);

        const pe = document.createElement('p');
        pe.textContent = `$${Precio}`;
        divRopa.appendChild(pe);

        const button = document.createElement('button');
        button.classList.add('btn-comprar');
        button.textContent = 'comprar';
        
        divRopa.appendChild(button);
        
        divPrincipal.appendChild(divRopa);
       
        

        pasoUno(button,nombre,Precio,id,url);
    });

}
function pasoUno(button,nombre,precio,id,url){
    button.addEventListener('click',()=>{
        const talleSeleccionado = document.querySelector(`.ropa[data-id='${id}'] select.select`).value;
        const div = document.createElement('div');
        div.classList.add('modal_wrap');

        const h2 = document.createElement('h2');
        h2.textContent = 'PASO 1 DE 2';
        div.appendChild(h2);

        const divDescripcion = document.createElement('div');
        divDescripcion.classList.add('descripcion');

        const h3 = document.createElement('h3');
        h3.textContent = nombre;
        divDescripcion.appendChild(h3);

        const peTalle = document.createElement('p');
        peTalle.innerHTML = `Talle: <span> ${talleSeleccionado}</span>`;
        divDescripcion.appendChild(peTalle);

        const pePrecio = document.createElement('p');
        pePrecio.innerHTML = `Precio: <span> $${precio}</span>`;
        divDescripcion.appendChild(pePrecio);

        div.appendChild(divDescripcion);


        const form = document.createElement('form');
        form.method = 'POST';
        form.id = 'form';
        div.appendChild(form);
    
        const inputApi = document.createElement('input');
        inputApi.type = 'hidden';
        inputApi.name = 'apikey';
        inputApi.value = 'ac3facb7-0d9e-4cfe-bfe4-c2fc3dabdee7'
        form.appendChild(inputApi);
    
        const inputSubject = document.createElement('input');
        inputSubject.type = 'hidden';
        inputSubject.name = 'subject';
        inputSubject.value = 'Nueva Compra';
        form.appendChild(inputSubject);
    
        const inputCheckBox = document.createElement('input');
        inputCheckBox.type = 'checkbox';
        inputCheckBox.name = 'subject';
        inputCheckBox.style = "display: none;";
        form.appendChild(inputCheckBox);
    
        const divNombre = document.createElement('div');
        form.appendChild(divNombre);
        const labelNombre = document.createElement('label');
        labelNombre.for = 'name';
        labelNombre.textContent = 'Nombre completo:';
        divNombre.appendChild(labelNombre);
        const inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.name = 'name';
        inputNombre.id = 'nombre';
        divNombre.appendChild(inputNombre);    
    
        const divEmail = document.createElement('div');
        form.appendChild(divEmail);
        const labelEmail = document.createElement('label');
        labelEmail.for = 'email';
        labelEmail.textContent = 'Email:';
        divEmail.appendChild(labelEmail);
        const inputEmail = document.createElement('input');
        inputEmail.type = 'email';
        inputEmail.name = 'email';
        inputEmail.id = 'email';
        inputEmail.required;
        divEmail.appendChild(inputEmail);
    
        const divTel = document.createElement('div');
        form.appendChild(divTel);
        const labelTel = document.createElement('label');
        labelTel.for = 'tel';
        labelTel.textContent = 'Teléfono:';
        divTel.appendChild(labelTel);
        const inputTel = document.createElement('input');
        inputTel.type = 'tel';
        inputTel.name = 'phone';
        inputTel.id = 'tel';
        divTel.appendChild(inputTel);
        
      
        const irBtn = document.createElement('button');
        irBtn.type = 'submit';
        irBtn.id = 'irBtn';
        irBtn.textContent = 'Siguiente';
        form.appendChild(irBtn);

    const divError = document.createElement('div');
    divError.id = 'errorForm';
    form.appendChild(divError);
     
    const cerrarBtn = document.createElement('div');
    cerrarBtn.textContent = 'Cerrar';
    cerrarBtn.classList.add('cerrar');
    div.appendChild(cerrarBtn);
      document.body.appendChild(div);
    btnCerrar();
    
      document.querySelector('#irBtn').addEventListener('click', e=>{    
          e.preventDefault();   
          const validar = validarFormulario();
          if (validar){
              
            enviarFormulario(url); 
          }      
          
    });
    })

}
function validarFormulario(){
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const tel = document.querySelector('#tel').value;
    const error = document.querySelector('#errorForm');
    let valido = false;
    if (nombre.trim() == ''){
        error.textContent = 'ERROR: Campo NOMBRE está vacío';
        }else if (email.trim() == ''){
        error.textContent = 'ERROR: Campo EMAIL está vacío';
        } else if (tel.trim() == ''){
        error.textContent = 'ERROR: Campo TELÉFONO está vacío';
        }else if(tel.trim().length < 8){
        error.textContent = 'ERROR: Número de TELÉFONO muy corto';
        }
        else{
        valido = true
    }
    if(!valido){
        error.classList.add('errorForm')
    }
    else{
        error.classList.remove('errorForm');
        error.textContent = '';
    }
    return valido;
}
function btnCerrar(){
    const btnCerrar = document.querySelector('.cerrar');
    btnCerrar.addEventListener('click',()=>{
        document.querySelector('.modal_wrap').remove();
    });
}
function botonHamburgesa(){
    const btnMenu = document.querySelector('div.hamburgesa');
    const menu = document.querySelector('div.menu');
    btnMenu.addEventListener('click',()=>{
        if(btnMenu.classList.contains('cerrado')){
            btnMenu.classList.remove('cerrado');
            btnMenu.classList.add('abierto');
            menu.style.display = 'flex';
        }else{
            btnMenu.classList.remove('abierto');
            btnMenu.classList.add('cerrado');
            menu.style.display = 'none';

        }
    });
}
function copyright(){
    const anio = new Date;
    const copy = document.querySelector('.copyright');
    const codinglabagency = document.createElement('a');
    const pe = document.createElement('p');
    pe.textContent = 'Made by ';    
    codinglabagency.href = 'https://codinglabagency.com';
    codinglabagency.target = '__blank';
    codinglabagency.textContent = ' Coding Lab Agency';
    copy.textContent =  `Todos los derechos reservados © ${anio.getFullYear()}`;
    copy.appendChild(pe);
    pe.appendChild(codinglabagency);
}




function mostrarScroll() {
    let animado = document.querySelectorAll('.scroll');
 let scrollTop = document.documentElement.scrollTop;
  for (var i = 0; i < animado.length; i++ ){
   let alturaAnimado = animado[i].offsetTop;
    if(alturaAnimado - 620 < scrollTop){
        animado[i].style.opacity = 1;
        animado[i].classList.add("mostrarArriba");
    }
}
}
window.addEventListener('scroll', mostrarScroll);

