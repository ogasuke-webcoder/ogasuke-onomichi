// header drawer
document
  .querySelector("#js-drawer-button")
  .addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector("#js-drawer-button").classList.toggle("is-checked");
    document.querySelector("#js-drawer-content").classList.toggle("is-checked");
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

  // // Navigation arrows
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
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
