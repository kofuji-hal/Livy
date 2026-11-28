// ハンバーガーメニュー
const menuToggle = document.getElementById("menu_toggle");
const hamburgerMenu = document.getElementById("hamburger_menu");

menuToggle.addEventListener("change", function () {
    if (menuToggle.checked) {
        hamburgerMenu.classList.add("active");
    } else {
        hamburgerMenu.classList.remove("active");
    }
});

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

// ポートフォリオURLの表示・非表示
const portfolio = document.getElementById("portfolio");

// プロフィール編集で設定されたポートフォリオURL
const portfolioUrl = "https://example.com";

if (portfolioUrl !== "") {
    portfolio.href = portfolioUrl;
    portfolio.style.display = "inline-block";
}


// 依頼・解決タブの切り替え
const post_tabs = document.querySelectorAll(".post_tab");
const post_contents = document.querySelectorAll(".post_content");

post_tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        const target = this.dataset.tab;

        post_tabs.forEach(function (item) {
            item.classList.remove("active");
        });

        post_contents.forEach(function (content) {
            content.classList.remove("active");
        });

        this.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});


// 投稿メニューの表示・非表示
const menu_buttons = document.querySelectorAll(".post_menu_button");

menu_buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.stopPropagation();

        const menu = this.nextElementSibling;

        document.querySelectorAll(".post_menu").forEach(function (item) {
            if (item !== menu) {
                item.classList.remove("active");
            }
        });

        menu.classList.toggle("active");
    });
});


// 投稿の編集
document.querySelectorAll(".edit_post_button").forEach(function (button) {
    button.addEventListener("click", function () {
        alert("投稿編集画面へ移動します。");
    });
});


// 投稿の削除
document.querySelectorAll(".delete_post_button").forEach(function (button) {
    button.addEventListener("click", function () {
        const result = confirm("この投稿を削除しますか？");

        if (result) {
            this.closest(".post_card").remove();
        }
    });
});


// 画面の別の場所をクリックしたときにメニューを閉じる
document.addEventListener("click", function () {
    document.querySelectorAll(".post_menu").forEach(function (menu) {
        menu.classList.remove("active");
    });
});
