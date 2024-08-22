document.addEventListener('scroll', function() {
    if(document.documentElement.scrollTop > 100) {
     document.querySelector('.go-top-container').classList.add('show-button');
 
    } else {
     document.querySelector('.go-top-container').classList.remove('show-button');
    }
});

document.querySelector('.go-top-container').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});