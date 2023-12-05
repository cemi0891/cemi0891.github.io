function validar (){

    var c="usuario";
    var u="2023"; 
    var user=document.getElementById('login').value
    var pass=document.getElementById('password').value

    console.log(user);
    if(user==c && pass==u){     
        localStorage.setItem('logged', true);
        window.location="home.html";
    }else{
    alert("Ingresa usuario y contraseña correcta");
    }
}