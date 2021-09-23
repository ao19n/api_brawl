window.onload = function() {
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
}

var btn = document.getElementById('send')
btn.addEventListener('click',function(){
  const spinner = document.getElementById('loading');
  spinner.classList.remove('loaded');
});

