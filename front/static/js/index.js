
// bookMark
document.addEventListener('DOMContentLoaded', () => {
  const bookmarkBtns = document.querySelectorAll('.markBtn');

  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');

      if (btn.classList.contains('active')) {
        btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
      } else {
        btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
      }
    });
  });
});

// モーダル
(function () {
  // open
  var btn = document.querySelector('#ac');
  var mask = document.querySelector('.mask');
  // modal
  var modal = document.querySelector('.modal');
  // close
  var closeBtns = document.querySelectorAll('.close-btn');

  if (!btn || !mask || !modal) return;

  function openModal() {
    mask.classList.add('appear');
    modal.classList.add('appear');
  }

  function closeModal() {
    mask.classList.remove('appear');
    modal.classList.remove('appear');
  }

  btn.addEventListener('click', openModal);
  mask.addEventListener('click', closeModal);
  closeBtns.forEach(function(b) { b.addEventListener('click', closeModal); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('appear')) {
      closeModal();
    }
  });
})();