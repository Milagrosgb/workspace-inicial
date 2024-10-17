function logout() {
    console.log('Función de cerrar sesión llamada'); 
    localStorage.removeItem('userSession');
    console.log('Sesión cerrada y datos eliminados de localStorage.');
    window.location.href = 'index.html';
}