// 汎用エラー
(function () {
      var btn = document.getElementById('dialog-btn-10');
      var dialog = document.getElementById('dialog-10');
      var closeBtns = dialog ? dialog.querySelectorAll('button') : [];

      if (!btn || !dialog) return;

      function openDialog() {
        dialog.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }

      function closeDialog() {
        dialog.style.display = 'none';
        document.body.style.overflow = 'auto';
      }

      btn.addEventListener('click', openDialog);
      
      closeBtns.forEach(function(b) { b.addEventListener('click', closeDialog); });

      dialog.addEventListener('click', function (e) {
        if (e.target === dialog) {
          closeDialog();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && dialog.style.display === 'block') {
          closeDialog();
        }
      });
    })();
