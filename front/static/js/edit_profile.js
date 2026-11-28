// プロフィール画像の変更
const profile_image_input = document.getElementById("profile_image_input");
const profile_image = document.getElementById("profile_image");

profile_image_input.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            profile_image.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});

// ニックネーム入力チェック
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

    // エラーなし
    input.className = "";
    errorMsg.textContent = "";
    return false;
}

// 全項目のエラーチェック
function chkAll() {
    let errorFlag = false;

    // ニックネーム
    if (chkHissu("nickname")) {
        errorFlag = true;
    }

    // エラーがある場合は送信しない
    if (errorFlag) {
        return false;
    }

    // エラーがなければ送信する
    return true;
}