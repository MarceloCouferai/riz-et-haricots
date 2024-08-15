const login = {
    "user": "admin",
    "senha": "m$102030@"
}

function Login() {

    const user = document.getElementById("user").value;
    const password = document.getElementById("senha").value;


    if(user == login.user && password == login.senha){
        location.href = "../admin/admin.html";
    } else{
        alert('Senha incorreta!')
    }
}
