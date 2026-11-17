
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



// ログインモーダル
// ログイン・先生生徒切り替えモーダル共通処理
(function () {
  const loginOpenButton = document.getElementById("ac");
  const changeOpenButton = document.getElementById("change");
  
  // 指定した名前のモーダルとマスクを取得
  
  function getModalElements(modalName) {
    const targetMask = document.querySelector(
      `.mask[data-modal-name="${modalName}"]`
    );

    const targetModal = document.querySelector(
      `.modal[data-modal-name="${modalName}"]`
    );

    return {
      targetMask: targetMask,
      targetModal: targetModal
    };
  }

  
  // モーダルを開く
  function openModal(modalName) {
    const modalElements = getModalElements(modalName);

    if (
      !modalElements.targetMask ||
      !modalElements.targetModal
    ) {
      return;
    }

    modalElements.targetMask.classList.add("appear");
    modalElements.targetModal.classList.add("appear");
  }

  
  // モーダルを閉じる
  function closeModal(modalName) {
    const modalElements = getModalElements(modalName);

    if (
      !modalElements.targetMask ||
      !modalElements.targetModal
    ) {
      return;
    }

    modalElements.targetMask.classList.remove("appear");
    modalElements.targetModal.classList.remove("appear");
  }

  // ログインモーダルを開く
  if (loginOpenButton) {
    loginOpenButton.addEventListener("click", function () {
      openModal("loginModal");
    });
  }

  // 先生・生徒切り替えモーダルを開く
  if (changeOpenButton) {
    changeOpenButton.addEventListener("click", function () {
      openModal("changeModal");
    });
  }

  // ×ボタンと「いいえ」ボタンで閉じる
  const closeButtons = document.querySelectorAll(
    ".modal .close-btn, #changeNoBtn"
  );

  closeButtons.forEach(function (closeButton) {
    closeButton.addEventListener("click", function () {
      const parentModal = closeButton.closest(".modal");

      if (!parentModal) {
        return;
      }

      const modalName = parentModal.dataset.modalName;

      closeModal(modalName);
    });
  });

  // 背景マスクをクリックしたら閉じる
  const modalMasks = document.querySelectorAll(".mask");

  modalMasks.forEach(function (modalMask) {
    modalMask.addEventListener("click", function () {
      const modalName = modalMask.dataset.modalName;

      closeModal(modalName);
    });
  });

  // Escキーで開いているモーダルを閉じる
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    const openedModal = document.querySelector(
      ".modal.appear"
    );

    if (!openedModal) {
      return;
    }

    const modalName = openedModal.dataset.modalName;

    closeModal(modalName);
  });

  /*
   * 切り替えモーダルの「はい」
   */
  const changeYesButton = document.getElementById(
    "changeYesButton"
  );

  if (changeYesButton) {
    changeYesButton.addEventListener("click", function () {
      /*
       * ここに先生・生徒を切り替える処理を書く
       */

      closeModal("changeModal");
    });
  }
})();



// 画像モーダル
// モーダルウィンドウ全体を指す要素
const modal = document.getElementById('imgModal');
// モーダル内で拡大表示される画像を指す要素
const modalImg = document.getElementById('modalImage');
// .popupクラスを持つ画像のリストです。これらの画像をクリックすると、モーダルが表示されます
const imgs = document.querySelectorAll('.popup');

// モーダルを閉じるためのボタン
const closeSpan = document.getElementById('close');

// 画像クリックでモーダルを表示するイベント
imgs.forEach(img => {
  img.addEventListener("click", (e) => {
    e.preventDefault();        // <a> に入っている場合の保険

    modalImg.src = img.src;
    modal.classList.add('open');

    // optional: フォーカスを閉じるボタンへ移す
    const closeBtn = document.getElementById('close');
    if (closeBtn) closeBtn.focus();
  });
});

// 閉じるボタン（存在するなら）
const closeBtn = document.getElementById('close');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
  });
}

// 背景クリックで閉じる
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});

// Escape キーで閉じる（アクセシビリティ）
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.classList.remove('open');
});



// 続きを読む
document.addEventListener("DOMContentLoaded", () => {

  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {

    const toggle = post.querySelector(".readMoreToggle");
    const postText = post.querySelector(".postText");
    const postImg = post.querySelector(".postImg")

    if (!toggle || !postText) return;

    toggle.addEventListener("change", () => {

      // 本文を全部表示
      postText.classList.toggle("open", toggle.checked);

      // 画像を表示
      if (postImg) {
        postImg.style.display = toggle.checked ? "flex" : "none";
      }

      // 全ての bidList を表示・非表示
      document.querySelectorAll(".bidList").forEach(list => {
        list.style.display = toggle.checked ? "flex" : "none";
      });

    });

  });

});

// 生徒側：落札者決定、確認モーダル
const decisionButton = document.querySelector(".bidRight button");
const decisionModal = document.getElementById("decisionModal");
const decisionNoButton = document.getElementById("decisionNoButton");

/* .bidRight内の決定ボタンを押したらモーダルを表示 */
decisionButton.addEventListener("click", function () {
  decisionModal.style.display = "flex";
});

/* 「いいえ」を押した場合のみモーダルを閉じる */
decisionNoButton.addEventListener("click", function () {
  decisionModal.style.display = "none";
});





// 以下仮、AIに書かせたやつ

// ログイン入力エラー表示
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".loginForm");
  const loginButton = document.querySelector(".login");

  if (!loginForm || !loginButton) return;

  const loginInputs = loginForm.querySelectorAll("input");

  // 入力欄の上にエラー文を表示する
  function showLoginError(input, message) {
    // 同じ入力欄の古いエラー文を削除する
    const previousElement = input.previousElementSibling;

    if (
      previousElement &&
      previousElement.classList.contains("login-error-message")
    ) {
      previousElement.remove();
    }

    // エラー文を作成する
    const errorMessage = document.createElement("p");

    errorMessage.className = "login-error-message";
    errorMessage.textContent = message;

    // 入力欄の直前にエラー文を追加する
    input.before(errorMessage);

    // 入力欄を赤枠にする
    input.classList.add("login-input-error");
    input.setAttribute("aria-invalid", "true");
  }

  // 指定した入力欄のエラーを削除する
  function clearLoginError(input) {
    const previousElement = input.previousElementSibling;

    if (
      previousElement &&
      previousElement.classList.contains("login-error-message")
    ) {
      previousElement.remove();
    }

    input.classList.remove("login-input-error");
    input.removeAttribute("aria-invalid");
  }

  // すべてのログインエラーを削除する
  function clearAllLoginErrors() {
    loginForm
      .querySelectorAll(".login-error-message")
      .forEach((errorMessage) => {
        errorMessage.remove();
      });

    loginInputs.forEach((input) => {
      input.classList.remove("login-input-error");
      input.removeAttribute("aria-invalid");
    });
  }

  // ログインボタンを押したとき
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    clearAllLoginErrors();

    let hasError = false;
    let firstErrorInput = null;

    // 1番目の入力欄
    const userInput = loginInputs[0];

    // 2番目の入力欄
    const passwordInput = loginInputs[1];

    if (userInput && userInput.value.trim() === "") {
      showLoginError(
        userInput,
        "ユーザー名、電話番号またはメールアドレスを入力してください。"
      );

      hasError = true;
      firstErrorInput = userInput;
    }

    if (passwordInput && passwordInput.value === "") {
      showLoginError(
        passwordInput,
        "パスワードを入力してください。"
      );

      hasError = true;

      if (!firstErrorInput) {
        firstErrorInput = passwordInput;
      }
    }

    // エラーがある場合はログイン処理を止める
    if (hasError) {
      firstErrorInput.focus();
      return;
    }

    // 入力に問題がない場合
    console.log("ログイン入力チェック成功");

    /*
      Flaskと接続するときは、ここにログイン処理を書く。

      loginForm.submit();

      ただし、現在のloginFormがformタグでない場合や、
      actionが設定されていない場合はfetchなどを使用する。
    */
  });

  // 入力を開始したら、その入力欄のエラーだけ消す
  loginInputs.forEach((input) => {
    input.addEventListener("input", () => {
      clearLoginError(input);
    });
  });
});





// 仮の入札価格入力の奴。flask書いたら消すかコメントアウトお願い
document.addEventListener("DOMContentLoaded", function () {
  const bidPriceInput = document.querySelector(".inputBid");

  /* Flask側から受け取るまでの仮の上限価格 */
  const bidUpperLimit = 10000;

  if (!bidPriceInput) {
    return;
  }

  /* エラー表示用の要素を生成 */
  const bidPriceError = document.createElement("p");

  bidPriceError.id = "bidPriceError";
  bidPriceError.className = "bidPriceError";
  bidPriceError.setAttribute("role", "alert");
  bidPriceError.setAttribute("aria-live", "polite");
  bidPriceError.style.display = "none";

  /* エラー文を入力欄の上に追加 */
  bidPriceInput.insertAdjacentElement(
    "beforebegin",
    bidPriceError
  );

  /* Enterキーを押したときに入力内容を確認 */
  bidPriceInput.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const bidPriceText = bidPriceInput.value.trim();

    clearBidPriceError();

    /* 未入力または半角数字以外 */
    if (!/^[0-9]+$/.test(bidPriceText)) {
      showBidPriceError(
        "入札価格は半角数字で入力してください。"
      );
      return;
    }

    const bidPrice = Number(bidPriceText);

    /* 500円未満または上限価格超過 */
    if (bidPrice < 500 || bidPrice > bidUpperLimit) {
      showBidPriceError(
        `入札価格は500円以上${bidUpperLimit.toLocaleString()}円以下で入力してください。`
      );
      return;
    }

    /*
     * 入力内容が正常な場合の処理をここに記述
     * 例：確認モーダルを表示
     */
  });

  /* 赤文字と赤枠を表示 */
  function showBidPriceError(message) {
    bidPriceError.textContent = message;
    bidPriceError.style.display = "block";

    bidPriceInput.classList.add("bidPriceInputError");
    bidPriceInput.setAttribute("aria-invalid", "true");
    bidPriceInput.setAttribute(
      "aria-describedby",
      "bidPriceError"
    );

    bidPriceInput.focus();
  }

  /* エラー表示を消す */
  function clearBidPriceError() {
    bidPriceError.textContent = "";
    bidPriceError.style.display = "none";

    bidPriceInput.classList.remove("bidPriceInputError");
    bidPriceInput.removeAttribute("aria-invalid");
    bidPriceInput.removeAttribute("aria-describedby");
  }

  /* 入力し直したらエラーを消す */
  bidPriceInput.addEventListener("input", function () {
    clearBidPriceError();
  });
});