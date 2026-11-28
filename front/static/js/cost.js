
document.addEventListener("DOMContentLoaded", () => {
  const paymentButton = document.getElementById("paymentButton");
  const errorDialog = document.getElementById("dialog-10");
  const errorMessage = errorDialog?.querySelector(".glass-body p");
  const errorCloseButton = errorDialog?.querySelector(".glass-btn");

  if (!paymentButton) return;

  paymentButton.addEventListener("click", () => {
    const selectedPayment = document.querySelector(
      'input[name="paymentMethod"]:checked'
    );

    if (!selectedPayment) {
      if (errorMessage) {
        errorMessage.textContent =
          "決済方法を選択してください。";
      }

      if (errorDialog) {
        errorDialog.classList.add("show");
      }

      return;
    }

    console.log("選択された決済方法：", selectedPayment.value);

    /* 問題がなければ次の処理をここに書く */
  });

  if (errorCloseButton) {
    errorCloseButton.addEventListener("click", () => {
      errorDialog?.classList.remove("show");
    });
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const decisionButtons = document.querySelectorAll(".paymentButton");
  const decisionModal = document.getElementById("decisionModal");
  const decisionModalTitle = document.getElementById("decisionModalTitle");
  const decisionYesButton = document.getElementById("decisionYesButton");
  const decisionNoButton = document.getElementById("decisionNoButton");

  const paymentSection = document.querySelector(".paymentSection");
  const costTitle = document.getElementById("costh2");
  const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
  const paymentInputs = document.querySelectorAll(".paymentPanel input, .paymentPanel select");
  const expirationDate = document.getElementById("expirationDate");

  let modalStep = "purchase";

  /* 入力欄のエラーを表示 */
  function showPaymentError(input, message) {
    const formGroup = input.closest(".paymentFormGroup");

    if (!formGroup) return;

    const oldError = formGroup.querySelector(".paymentError");

    if (oldError) {
      oldError.remove();
    }

    const errorMessage = document.createElement("p");

    errorMessage.classList.add("paymentError");
    errorMessage.textContent = message;

    input.before(errorMessage);
    input.classList.add("paymentInputError");
    input.setAttribute("aria-invalid", "true");
  }

  /* 指定した入力欄のエラーを削除 */
  function clearPaymentError(input) {
    const formGroup = input.closest(".paymentFormGroup");

    if (!formGroup) return;

    const errorMessage = formGroup.querySelector(".paymentError");

    if (errorMessage) {
      errorMessage.remove();
    }

    input.classList.remove("paymentInputError");
    input.removeAttribute("aria-invalid");
  }

  /* 入力欄のエラーをすべて削除 */
  function clearAllPaymentErrors() {
    document.querySelectorAll(".paymentError").forEach(function (error) {
      error.remove();
    });

    document.querySelectorAll(".paymentInputError").forEach(function (input) {
      input.classList.remove("paymentInputError");
      input.removeAttribute("aria-invalid");
    });
  }

  /* 決済方法未選択エラーを表示 */
  function showPaymentSelectError() {
    if (paymentSection) {
      paymentSection.classList.add("paymentSelectError");
    }

    const oldError = document.querySelector(".paymentSelectErrorMessage");

    if (oldError || !costTitle) return;

    const errorMessage = document.createElement("p");

    errorMessage.classList.add("paymentSelectErrorMessage");
    errorMessage.textContent = "いずれかを選択してください。";

    costTitle.after(errorMessage);
  }

  /* 決済方法未選択エラーを削除 */
  function clearPaymentSelectError() {
    if (paymentSection) {
      paymentSection.classList.remove("paymentSelectError");
    }

    const errorMessage = document.querySelector(".paymentSelectErrorMessage");

    if (errorMessage) {
      errorMessage.remove();
    }
  }

  /* 購入確認モーダルを表示 */
  function showPurchaseConfirmModal() {
    if (!decisionModal || !decisionModalTitle) return;

    modalStep = "purchase";
    decisionModalTitle.textContent = "本当に購入を確定しますか？";
    decisionYesButton.textContent = "はい";
    decisionNoButton.textContent = "いいえ";
    decisionModal.style.display = "flex";
  }

  /* モーダルを閉じる */
  function closeDecisionModal() {
    if (!decisionModal) return;

    decisionModal.style.display = "none";
    modalStep = "purchase";
  }

  /* 決済方法を変更したとき */
  paymentRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      clearPaymentSelectError();
      clearAllPaymentErrors();
    });
  });

  /* 有効期限のスラッシュを自動入力 */
  if (expirationDate) {
    expirationDate.addEventListener("input", function () {
      const originalValue = expirationDate.value;
      const halfWidthValue = originalValue.replace(/\//g, "");

      if (!/^[0-9]{0,4}$/.test(halfWidthValue)) {
        clearPaymentError(expirationDate);
        return;
      }

      let formattedValue = halfWidthValue;

      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.slice(0, 2) +
          "/" +
          formattedValue.slice(2, 4);
      }

      expirationDate.value = formattedValue;
      clearPaymentError(expirationDate);
    });
  }

  /* 入力し直した項目のエラーを削除 */
  paymentInputs.forEach(function (input) {
    if (input !== expirationDate) {
      input.addEventListener("input", function () {
        clearPaymentError(input);
      });
    }

    input.addEventListener("change", function () {
      clearPaymentError(input);
    });
  });

  /* 決済内容を確認するボタン */
  decisionButtons.forEach(function (decisionButton) {
    decisionButton.addEventListener("click", function () {
      clearAllPaymentErrors();
      clearPaymentSelectError();

      const selectedPayment = document.querySelector(
        'input[name="paymentMethod"]:checked'
      );

      /* 決済方法が選択されていない場合 */
      if (!selectedPayment) {
        showPaymentSelectError();

        if (paymentSection) {
          paymentSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }

        return;
      }

      const paymentItem = selectedPayment.closest(".paymentItem");

      if (!paymentItem) return;

      const inputs = paymentItem.querySelectorAll(
        ".paymentPanel input, .paymentPanel select"
      );

      let hasError = false;
      let firstErrorInput = null;

      /* 選択中の決済方法だけ入力確認 */
      inputs.forEach(function (input) {
        const value = input.value.trim();
        let message = "";

        /* 未入力確認 */
        if (value === "") {
          if (input.id === "cardNumber") {
            message = "カード番号を入力してください。";
          } else if (input.id === "expirationDate") {
            message = "有効期限を入力してください。";
          } else if (input.id === "securityCode") {
            message = "セキュリティコードを入力してください。";
          } else if (input.id === "convenienceStore") {
            message = "コンビニを選択してください。";
          } else if (input.id === "bankName") {
            message = "銀行名を入力してください。";
          } else if (input.id === "branchName") {
            message = "支店名を入力してください。";
          } else if (input.id === "accountType") {
            message = "口座種別を選択してください。";
          } else if (input.id === "accountNumber") {
            message = "口座番号を入力してください。";
          } else if (input.id === "accountHolder") {
            message = "口座名義を入力してください。";
          } else {
            message = "入力してください。";
          }
        }

        /* カード番号の形式確認 */
        else if (input.id === "cardNumber") {
          const cardNumber = value.replace(/\s/g, "");

          if (!/^[0-9]+$/.test(cardNumber)) {
            message = "カード番号は半角数字で入力してください。";
          }
        }

        /* 有効期限の形式確認 */
        else if (input.id === "expirationDate") {
          const expirationPattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;

          if (!expirationPattern.test(value)) {
            message = "有効期限はMM/YYの形式で入力してください。";
          }
        }

        /* セキュリティコードの形式確認 */
        else if (input.id === "securityCode") {
          if (!/^[0-9]+$/.test(value)) {
            message = "セキュリティコードは半角数字で入力してください。";
          }
        }

        /* 口座番号の形式確認 */
        else if (input.id === "accountNumber") {
          if (!/^[0-9]+$/.test(value)) {
            message = "口座番号は半角数字で入力してください。";
          }
        }

        /* エラーを表示 */
        if (message !== "") {
          showPaymentError(input, message);

          if (!firstErrorInput) {
            firstErrorInput = input;
          }

          hasError = true;
        }
      });

      /* 入力エラーがある場合 */
      if (hasError) {
        if (firstErrorInput) {
          firstErrorInput.focus();
          firstErrorInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }

        return;
      }

      /* エラーがなければ購入確認モーダルを表示 */
      showPurchaseConfirmModal();
    });
  });

  /* モーダルの「はい」 */
  if (decisionModal && decisionYesButton) {
    decisionYesButton.addEventListener("click", function () {
      if (modalStep === "purchase") {
        modalStep = "chat";
        decisionModalTitle.textContent = "取引チャットへ遷移しますか？";
        return;
      }

      if (modalStep === "chat") {
        window.location.href = "chat.html";
      }
    });
  }

  /* モーダルの「いいえ」 */
  if (decisionModal && decisionNoButton) {
    decisionNoButton.addEventListener("click", function () {
      if (modalStep === "purchase") {
        closeDecisionModal();
        return;
      }

      if (modalStep === "chat") {
        window.location.href = "myPage.html";
      }
    });
  }

  /* モーダルの背景を押したとき */
  if (decisionModal) {
    decisionModal.addEventListener("click", function (event) {
      if (
        event.target === decisionModal &&
        modalStep === "purchase"
      ) {
        closeDecisionModal();
      }
    });
  }

  /* Escapeキーを押したとき */
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      decisionModal &&
      decisionModal.style.display === "flex" &&
      modalStep === "purchase"
    ) {
      closeDecisionModal();
    }
  });
});