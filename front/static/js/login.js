function createRipple() {

    const container = document.getElementById("ripple-container");

    const positions = [
        { left: "15%", top: "20%" },
        { left: "85%", top: "75%" },
        { left: "15%", top: "20%" }
    ];

    // 波紋を生成
    positions.forEach((pos, index) => {
        setTimeout(() => {
            // div生成
            const ripple = document.createElement("div");
            // rippleクラス付与
            ripple.classList.add("ripple");
            // 表示位置設定
            ripple.style.left = pos.left;
            ripple.style.top = pos.top;
            // 画面へ追加
            container.appendChild(ripple);
            // 5秒後に削除
            setTimeout(() => {
                ripple.remove();
            }, 5000);
        // 時間をずらして表示
        }, index * 700);
    });
}

// 実行
createRipple();

// 7秒ごとに繰り返し実行
setInterval(createRipple, 7000);