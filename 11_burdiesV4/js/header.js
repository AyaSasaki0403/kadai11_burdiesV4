fetch("header.html")
.then((response) => response.text())
.then((data) => {
    document.querySelector("head").insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/header.css">');
    document.querySelector("body").insertAdjacentHTML('afterbegin', data);

document.addEventListener('DOMContentLoaded', function() {
    const errorMessage = sessionStorage.getItem('error');
    if (errorMessage) {
        document.getElementById('error-message').textContent = errorMessage;
        sessionStorage.removeItem('error');
    }

// Logoのクリックでトップに戻る
document.getElementById("logo-link").addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ナビゲーションリンクのスムーススクロール
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

       // セッションスタートを確認
       fetch("login_act.php")
       .then((response) => response.json())
       .then((sessionData) => {
           if (sessionData.loggedIn) {
               // ログイン状態なら「Burdyになる」を「ログアウト」に変更
               const registerLink = document.getElementById("register_link");
               if (registerLink) {
                   registerLink.textContent = "ログアウト";
                   registerLink.href = "logout.php"; // ログアウト処理へのリンク
               }
               // ログインボタンを非表示にする
               const loginLink = document.getElementById("login_link");
               if (loginLink) {
                   loginLink.style.display = 'none';
               }
           }
       });
   });
});
