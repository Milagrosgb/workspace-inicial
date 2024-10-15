const image = document.getElementById("profile-picture");
const imagePreview = "img/user-icon-generic.png";

// al cargar la página, chequea si hay alguna imagen cargada en local storage, de no ser así, carga la imagen genérica.
document.addEventListener("DOMContentLoaded", function() {
    const imageSource = localStorage.getItem("profilePicture");
    image.src = imageSource ? imageSource : imagePreview;
});

// función que permite que al hacer click en el botón de modificar imagen, se cargue desde la pc local una imagen, que se guardará el local storage en formato base64.
document.getElementById('change-picture-icon').addEventListener('click', function() {
    document.getElementById('fileInput').click(); 
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    console.log(file);
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let base64img = e.target.result;
            localStorage.setItem("profilePicture", base64img);
            image.src = base64img; 
        }
        reader.readAsDataURL(file); 

    }
});