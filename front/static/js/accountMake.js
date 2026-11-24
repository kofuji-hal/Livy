// 必須入力・文字数チェック
function chkHissu(target) {
    const input = document.getElementById(target);
    const errorMsg = document.getElementById(target + "ErrorMsg");

    // 未入力チェック
    if (input.value === "") {
        input.className = "errorBg";
        errorMsg.textContent = "必須入力です";
        return true;
    }

    // ニックネームの文字数チェック
    if (target === "nickname") {
        if (input.value.length < 3 || input.value.length > 20) {
            input.className = "errorBg";
            errorMsg.textContent = "3～20文字で入力してください";
            return true;
        }
    }

    input.className = "";
    errorMsg.textContent = "";
    return false;
}


// メールアドレスのエラーチェック
function chkmailHissu(target) {
    const input = document.getElementById(target);
    const errorMsg = document.getElementById(target + "ErrorMsg");

    if (input.value === "") {
        input.className = "errorBg";
        errorMsg.textContent = "必須入力です";
        return true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.className = "errorBg";
        errorMsg.textContent = "正しいメールアドレスを入力してください";
        return true;
    }

    input.className = "";
    errorMsg.textContent = "";
    return false;
}


// 電話番号のエラーチェック
function chksuuchiHissu() {
    const telErrorMsg = document.getElementById("denwabangouErrorMsg");
    const den1 = document.getElementById("denwabangou1");
    const den2 = document.getElementById("denwabangou2");
    const den3 = document.getElementById("denwabangou3");

    // 未入力チェック
    if (den1.value === "" || den2.value === "" || den3.value === "") {
        telErrorMsg.textContent = "必須入力です";

        den1.classList.toggle("errorBg", den1.value === "");
        den2.classList.toggle("errorBg", den2.value === "");
        den3.classList.toggle("errorBg", den3.value === "");

        return true;
    }

    // 数字・桁数チェック
    const e1 = chkTel("denwabangou1", 2, 4);
    const e2 = chkTel("denwabangou2", 2, 4);
    const e3 = chkTel("denwabangou3", 4, 4);

    if (e1 || e2 || e3) {
        telErrorMsg.textContent = "正しい形式で入力してください";
        return true;
    }

    telErrorMsg.textContent = "";
    return false;
}


// 電話番号の数字・桁数チェック
function chkTel(id, minLen, maxLen) {
    const input = document.getElementById(id);
    const value = input.value;

    // 数字のみかチェック
    if (!/^\d+$/.test(value)) {
        input.classList.add("errorBg");
        return true;
    }

    // 桁数チェック
    if (value.length < minLen || value.length > maxLen) {
        input.classList.add("errorBg");
        return true;
    }

    input.classList.remove("errorBg");
    return false;
}


// パスワードのエラーチェック
function chkPassword() {
    const input = document.getElementById("password");
    const errorMsg = document.getElementById("passwordErrorMsg");

    // 未入力チェック
    if (input.value === "") {
        input.className = "errorBg";
        errorMsg.textContent = "必須入力です";
        return true;
    }

    // 8～16文字チェック
    if (input.value.length < 8 || input.value.length > 16) {
        input.className = "errorBg";
        errorMsg.textContent = "8～16文字で入力してください";
        return true;
    }

    input.className = "";
    errorMsg.textContent = "";

    // パスワード確認にも値が入っていれば一致チェック
    const passcheck = document.getElementById("passcheck");

    if (passcheck.value !== "") {
        chkPasswordCheck();
    }

    return false;
}


// パスワード確認のエラーチェック
function chkPasswordCheck() {
    const password = document.getElementById("password");
    const passcheck = document.getElementById("passcheck");
    const errorMsg = document.getElementById("passcheckErrorMsg");

    // 未入力チェック
    if (passcheck.value === "") {
        passcheck.className = "errorBg";
        errorMsg.textContent = "必須入力です";
        return true;
    }

    // パスワードが一致しているかチェック
    if (password.value !== passcheck.value) {
        passcheck.className = "errorBg";
        errorMsg.textContent = "パスワードが一致しません";
        return true;
    }

    passcheck.className = "";
    errorMsg.textContent = "";
    return false;
}

// モーダルテスト用
// function chkAll() {
    // document.getElementById("confirmModal").style.display = "flex";
    // return false;
// }


// 全項目のエラーチェック
function chkAll() {
    let errorFlag = false;

    // ニックネーム
    if (chkHissu("nickname")) {
        errorFlag = true;
    }

    // メールアドレス
    if (chkmailHissu("mail")) {
        errorFlag = true;
    }

    // 電話番号
    if (chksuuchiHissu()) {
        errorFlag = true;
    }

    // パスワード
    if (chkPassword()) {
        errorFlag = true;
    }

    // パスワード確認
    if (chkPasswordCheck()) {
        errorFlag = true;
    }

    // エラーがある場合は送信しない
    if (errorFlag) {
        return false;
    }

    // 入力された内容を取得
    const nickname = document.getElementById("nickname").value;
    const mail = document.getElementById("mail").value;

    const tel1 = document.getElementById("denwabangou1").value;
    const tel2 = document.getElementById("denwabangou2").value;
    const tel3 = document.getElementById("denwabangou3").value;

    // モーダルに入力内容を表示
    document.getElementById("confirmNickname").textContent = nickname;
    document.getElementById("confirmMail").textContent = mail;
    document.getElementById("confirmTel").textContent =
        tel1 + "-" + tel2 + "-" + tel3;

    // モーダル表示
    document.getElementById("confirmModal").style.display = "flex";

    // この時点ではformを送信しない
    return false;
}

// 変更するボタン
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("changeButton").addEventListener("click", function() {
        document.getElementById("confirmModal").style.display = "none";
    });

    // 登録するボタン
    document.getElementById("registerButton").addEventListener("click", function() {
        alert("登録処理はバックエンド実装後に接続します");
    });

});