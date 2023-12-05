const logged = localStorage.getItem('logged');
if(!logged){
  window.location.href = '/';
} 