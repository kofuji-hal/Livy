
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
// bookMark



// ログイン・先生生徒切り替えモーダル共通処理
(function () {
  const loginOpenButton = document.getElementById("ac");
  const changeOpenButton = document.getElementById("change");
  const changeYesButton = document.getElementById("changeYesBtn");
  const changeNoButton = document.getElementById("changeNoBtn");

  /* モーダルと背景マスクを取得 */
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

  /* 指定したモーダルを開く */
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

  /* 指定したモーダルを閉じる */
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

  /* ログインモーダルを開く */
  if (loginOpenButton) {
    loginOpenButton.addEventListener("click", function () {
      openModal("loginModal");
    });
  }

  /* 先生・生徒切り替えモーダルを開く */
  if (changeOpenButton) {
    changeOpenButton.addEventListener("click", function () {
      openModal("changeModal");
    });
  }

  /* ログインモーダルなどの×ボタン */
  const closeButtons = document.querySelectorAll(
    ".modal .close-btn"
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

  /* 切り替えモーダルの「いいえ」 */
  if (changeNoButton) {
    changeNoButton.addEventListener("click", function () {
      closeModal("changeModal");
    });
  }

  /* 切り替えモーダルの「はい」 */
  if (changeYesButton) {
    changeYesButton.addEventListener("click", function () {
      /*
       * 先生・生徒を切り替える処理をここに追加
       *
       * 処理後にモーダルを閉じる場合は、
       * 下のcloseModalをそのまま残してください。
       */

      closeModal("changeModal");
    });
  }

  /* 背景マスクをクリックした場合 */
  const modalMasks = document.querySelectorAll(".mask");

  modalMasks.forEach(function (modalMask) {
    modalMask.addEventListener("click", function () {
      const modalName = modalMask.dataset.modalName;

      /* 切り替え確認モーダルは背景クリックで閉じない */
      if (modalName === "changeModal") {
        return;
      }

      closeModal(modalName);
    });
  });

  /* Escキーを押した場合 */
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

    /* 切り替え確認モーダルはEscキーで閉じない */
    if (modalName === "changeModal") {
      return;
    }

    closeModal(modalName);
  });
})();
// ログイン・先生生徒切り替えモーダル共通処理



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
// 画像モーダル




// 投稿ごとの「続きを読む」
document.addEventListener("DOMContentLoaded", function () {
  const postItems = document.querySelectorAll(".postItem");

  postItems.forEach(function (postItem) {
    const readMoreToggle =
      postItem.querySelector(".readMoreToggle");

    const postText =
      postItem.querySelector(".postText");

    const postImages =
      postItem.querySelector(".postImg");

    const bidLists =
      postItem.querySelectorAll(".bidList");

    if (!readMoreToggle) {
      return;
    }

    readMoreToggle.addEventListener("change", function () {
      const isOpen = readMoreToggle.checked;

      /* 選択した投稿の本文だけを展開 */
      if (postText) {
        postText.classList.toggle("open", isOpen);
      }

      /* 選択した投稿の画像3枚を表示 */
      if (postImages) {
        postImages.style.display = isOpen
          ? "flex"
          : "none";
      }

      /* 選択した投稿の2つの入札画面を表示 */
      bidLists.forEach(function (bidList) {
        bidList.style.display = isOpen ? "flex" : "none";
      });
    });
  });
});
// 投稿ごとの「続きを読む」




// 生徒側：落札者決定・確認モーダル
document.addEventListener("DOMContentLoaded", function () {
  const decisionButtons =
    document.querySelectorAll(".decisionBtn");

  const decisionModal =
    document.getElementById("decisionModal");

  const decisionNoButton =
    document.getElementById("decisionNoButton");

  /* 決定ボタンと確認モーダルがある場合だけ設定 */
  if (decisionModal && decisionButtons.length > 0) {
    decisionButtons.forEach(function (decisionButton) {
      decisionButton.addEventListener("click", function () {
        decisionModal.style.display = "flex";
      });
    });
  }

  /* 確認モーダルと「いいえ」がある場合だけ設定 */
  if (decisionModal && decisionNoButton) {
    decisionNoButton.addEventListener("click", function () {
      decisionModal.style.display = "none";
    });
  }
});
// 生徒側：落札者決定・確認モーダル




// 仮のログイン入力エラー表示
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".loginForm");
  const loginButton = document.querySelector(".login");

  /* ログインフォームがないページでは処理しない */
  if (!loginForm || !loginButton) {
    return;
  }

  const loginInputs = loginForm.querySelectorAll("input");

  /* 入力欄の上にエラーを表示 */
  function showLoginError(input, message) {
    const previousElement = input.previousElementSibling;

    if (
      previousElement &&
      previousElement.classList.contains(
        "login-error-message"
      )
    ) {
      previousElement.remove();
    }

    const errorMessage = document.createElement("p");

    errorMessage.className = "login-error-message";
    errorMessage.textContent = message;
    errorMessage.setAttribute("role", "alert");

    input.before(errorMessage);

    input.classList.add("login-input-error");
    input.setAttribute("aria-invalid", "true");
  }

  /* 指定した入力欄のエラーを削除 */
  function clearLoginError(input) {
    const previousElement = input.previousElementSibling;

    if (
      previousElement &&
      previousElement.classList.contains(
        "login-error-message"
      )
    ) {
      previousElement.remove();
    }

    input.classList.remove("login-input-error");
    input.removeAttribute("aria-invalid");
  }

  /* すべてのログインエラーを削除 */
  function clearAllLoginErrors() {
    loginForm
      .querySelectorAll(".login-error-message")
      .forEach(function (errorMessage) {
        errorMessage.remove();
      });

    loginInputs.forEach(function (input) {
      input.classList.remove("login-input-error");
      input.removeAttribute("aria-invalid");
    });
  }

  /* ログインボタンを押した場合 */
  loginButton.addEventListener("click", function (event) {
    event.preventDefault();

    clearAllLoginErrors();

    let hasError = false;
    let firstErrorInput = null;

    const userInput = loginInputs[0];
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

    if (hasError) {
      firstErrorInput.focus();
      return;
    }

    console.log("ログイン入力チェック成功");

    /*
     * Flaskとの接続後は、ここにログイン処理を書く
     *
     * 例：
     * loginForm.submit();
     */
  });

  /* 入力し直した欄のエラーを削除 */
  loginInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      clearLoginError(input);
    });
  });
});


// 仮の入札価格入力チェック
// Flask実装後に上限価格と送信処理を接続する
document.addEventListener("DOMContentLoaded", function () {
  const bidPriceInputs =
    document.querySelectorAll(".inputBid");

  /* 入札入力欄がないページでは処理しない */
  if (bidPriceInputs.length === 0) {
    return;
  }

  /* Flask側から受け取るまでの仮の上限価格 */
  const bidUpperLimit = 10000;

  bidPriceInputs.forEach(function (bidPriceInput, index) {
    /* エラー表示用の要素を生成 */
    const bidPriceError = document.createElement("p");

    /*
     * 複数投稿でidが重複しないように、
     * インデックスを付けている
     */
    bidPriceError.id = `bidPriceError${index}`;
    bidPriceError.className = "bidPriceError";
    bidPriceError.setAttribute("role", "alert");
    bidPriceError.setAttribute("aria-live", "polite");
    bidPriceError.style.display = "none";

    /* エラー文を入力欄の上に追加 */
    bidPriceInput.insertAdjacentElement(
      "beforebegin",
      bidPriceError
    );

    /* 赤文字と赤枠でエラーを表示 */
    function showBidPriceError(message) {
      bidPriceError.textContent = message;
      bidPriceError.style.display = "block";

      bidPriceInput.classList.add(
        "bidPriceInputError"
      );

      bidPriceInput.setAttribute(
        "aria-invalid",
        "true"
      );

      bidPriceInput.setAttribute(
        "aria-describedby",
        bidPriceError.id
      );

      bidPriceInput.focus();
    }

    /* エラー表示を消す */
    function clearBidPriceError() {
      bidPriceError.textContent = "";
      bidPriceError.style.display = "none";

      bidPriceInput.classList.remove(
        "bidPriceInputError"
      );

      bidPriceInput.removeAttribute(
        "aria-invalid"
      );

      bidPriceInput.removeAttribute(
        "aria-describedby"
      );
    }

    /* Enterキーを押した場合 */
    bidPriceInput.addEventListener(
      "keydown",
      function (event) {
        if (event.key !== "Enter") {
          return;
        }

        event.preventDefault();

        const bidPriceText =
          bidPriceInput.value.trim();

        clearBidPriceError();

        /* 未入力または半角数字以外 */
        if (!/^[0-9]+$/.test(bidPriceText)) {
          showBidPriceError(
            "入札価格は半角数字で入力してください。"
          );
          return;
        }

        /*
         * 数値へ変換してから、
         * 50円単位や範囲を確認する
         */
        const bidPrice = Number(bidPriceText);

        /* 50円単位ではない場合 */
        if (bidPrice % 50 !== 0) {
          showBidPriceError(
            "入札価格は50円単位で入力してください。"
          );
          return;
        }

        /* 500円未満または上限価格超過 */
        if (
          bidPrice < 500 ||
          bidPrice > bidUpperLimit
        ) {
          showBidPriceError(
            `入札価格は500円以上${bidUpperLimit.toLocaleString()}円以下で入力してください。`
          );
          return;
        }

        /*
         * 入力内容が正常な場合の処理
         * Flaskとの接続後に送信処理を書く
         */
        console.log(
          `入札価格入力チェック成功：${bidPrice}円`
        );
      }
    );

    /* 入力し直したらエラーを消す */
    bidPriceInput.addEventListener(
      "input",
      function () {
        clearBidPriceError();
      }
    );
  });
});