// header drawer
document
  .querySelector("#js-drawer-button")
  .addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector("#js-drawer-button").classList.toggle("is-checked");
    document.querySelector("#js-drawer-content").classList.toggle("is-checked");
  });
// ドロワー内のリンククリックで閉じる
document.querySelectorAll("#js-drawer-content a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector("#js-drawer-button").classList.remove("is-checked");
    document.querySelector("#js-drawer-content").classList.remove("is-checked");
  });
});

// swiper
const swiperLoopSmooth = new Swiper(".js-swiper-loop-smooth", {
  slidesPerView: "auto",
  spaceBetween: 10,
  // // ループ時に何枚のスライドを複製するかを指定。slidesPerView: 'auto'とloopを併用する場合は、このオプションが必要。
  loopSlides: 10,
  loop: true,
  preloadImages: true,
  updateOnImagesReady: true,
  speed: 3000, // スライドの速度

  autoplay: {
    delay: 0,
    disableOnInteraction: false, // スワイプやクリックされても自動再生を停止しない
  },

  breakpoints: {
    768: {
      spaceBetween: 20,
    },
  },
});

// prizes modal
// フワッとモーダルを開く
jQuery(".js-modal-open").on("click", function (e) {
  e.preventDefault();

  // this=クリックされた要素
  // attr("data-modal")=クリックされた要素のdata-modal属性の値を取得
  const targetId = jQuery(this).attr("data-modal");
  // document.getElementById(targetId)で、
  // クリックされた要素のdata-modal属性の値をidに持つdialog要素を取得
  // 複数モーダルに対応するためにdata-modal属性を使用している。
  const dialog = document.getElementById(targetId);

  if (!dialog) return;

  dialog.showModal();
  // モーダルを開いてる間、スクロール禁止
  document.body.classList.add("is-modal-open");

  // フワッと表示させるために、10ミリ秒後にis-visibleクラスを追加
  setTimeout(function () {
    jQuery(dialog).addClass("is-visible");
  }, 10);
});

// フワッとモーダルを閉じる
jQuery(".js-modal-close").on("click", function (e) {
  e.preventDefault();

  // this=クリックされた要素
  // closest("dialog")=クリックされた要素から最も近いdialog要素を取得
  const dialog = this.closest("dialog");

  if (!dialog) return;

  // is-visibleクラスを外す
  jQuery(dialog).removeClass("is-visible");

  // CSSのtransition時間に合わせて閉じる
  setTimeout(function () {
    dialog.close();
    // モーダルを閉じた時、スクロール禁止を解除
    document.body.classList.remove("is-modal-open");
  }, 400); // ← transition時間と合わせる
});

// spotsセクションのループスライド
// 先頭に表示するスライドのインデックス(スライドの位置）を、
// 画面幅に応じて切り替える（画面幅768px以上なら0番目を先頭に、768px未満なら3番目を先頭に表示する）
function getInitialIndex() {
  return window.innerWidth >= 768 ? 0 : 3;
}

const swiperLoop = new Swiper(".js-swiper-spots", {
  slidesPerView: "auto",
  centeredSlides: true,
  loop: true,
  spaceBetween: 16,

  breakpoints: {
    768: {
      centeredSlides: false,
      spaceBetween: 32,
    },
  },

  // 先頭に表示するスライドのインデックスを、
  // 画面幅に応じて切り替える（画面幅768px以上なら0、768px未満なら3を表示する）
  on: {
    init() {
      this.slideToLoop(getInitialIndex(), 0, false);
    },
    breakpoint() {
      this.slideToLoop(getInitialIndex(), 0, false);
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: "#js-swiper-button-next",
    prevEl: "#js-swiper-button-prev",
  },
});

// FAQセクションのアコーディオン
// .js-accordionがクリックされたら処理を実行
jQuery(".js-accordion").on("click", function (e) {
  // ブラウザのデフォルトの動作をキャンセル
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    // クリックされた要素がis-openクラスを持っている場合
    // is-openクラスを削除
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp();
  } else {
    // クリックされた要素がis-openクラスを持っていない場合
    // is-openクラスを追加
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown();
  }
});

// contactセクションの「お問い合わせ内容」がクリックされた時に
// セレクトボックスの矢印を回転させる
// .form-field__item-select を全て取得
document.querySelectorAll(".form-field__item-select").forEach(function (box) {
  // box 内の select を取得
  const select = box.querySelector("select");

  let isOpen = false;

  // セレクトをクリック
  select.addEventListener("mousedown", function () {
    if (isOpen) {
      // 開いている状態でクリック → 閉じる
      box.classList.remove("is-open");
      isOpen = false;
    } else {
      // 閉じている状態でクリック → 開く
      box.classList.add("is-open");
      isOpen = true;
    }
  });

  // 項目を選択
  select.addEventListener("change", function () {
    box.classList.remove("is-open");
    isOpen = false;
  });

  // 外クリックなどでフォーカスが外れた時
  select.addEventListener("blur", function () {
    box.classList.remove("is-open");
    isOpen = false;
  });
});

// form送信が項目未入力エラーで失敗したとき、エラー時SCSSを適用するために、was-validatedクラスを追加する
// (.was-validated + input:invalid この二つの条件でエラー時スタイルを適用している)
// form送信が成功した場合にアラートを表示する。
const contactForm = document.querySelector(".contact__form");

// invalidイベント required属性（入力必須項目）が、
// 未入力エラーとなったときに発火するイベント
contactForm.addEventListener(
  "invalid",
  function () {
    contactForm.classList.add("was-validated");
  },
  true,
);

contactForm.addEventListener("submit", function () {
  // フォーム全体のバリデーション結果をチェック
  if (contactForm.checkValidity()) {
    alert("お問い合わせ内容を送信しました。");
  }
});

// topへ戻るボタンの表示・非表示
// jQueryの場合の記述
jQuery(window).on("scroll", function () {
  // ウィンドウの一番上から300px以上スクロールしたら、#js-pagetopにis-showクラスを付与
  if (300 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop").addClass("is-show");
  } else {
    // スクロールがウィンドウの一番上から300px未満のときは、#js-pagetopからis-showクラスを削除
    jQuery("#js-pagetop").removeClass("is-show");
  }
});

// スムーススクロール
jQuery('a[href^="#"]').on("click", function (e) {
  e.preventDefault();

  const speed = 500;
  const id = jQuery(this).attr("href");
  const target = jQuery(id === "#" ? "html" : id);

  if (!target.length) return;

  const headerHeight = jQuery(".header").outerHeight() || 0;

  let extraOffset = 0;

  // 疑似要素があるセクションだけ
  if (target.hasClass("js-scroll-adjust")) {
    if (window.innerWidth >= 768) {
      extraOffset = 130; // PC
    } else {
      extraOffset = 80; // SP
    }
  }

  const position = target.offset().top - headerHeight - extraOffset;

  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing",
  );
});
