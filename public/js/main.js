$(document).ready(function() {
  $(function($, undefined) {
    $(".delivery__table .show-more a").click(function() {
      $(this)
        .parent()
        .prev();
      $(".table-responsive").toggleClass("active");
      if ($(".table-responsive").hasClass("active")) {
        $(".delivery__table .show-more a").text("Свернуть");
      } else {
        $(".delivery__table .show-more a").text("Смотреть все цены");
      }
    });
  });

  $("[data-scroll]").click(function() {
    $("body, html").animate({
      scrollTop: $($(this).data("scroll")).offset().top
    });
    return false;
  });

  $("[data-togglesel]").click(function() {
    $($(this).data("togglesel")).toggleClass("active");
    $(this).toggleClass("active");
    return false;
  });

  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $(function($, undefined) {
    $(
      " .process-pokupki__tab, .homepage__last-products-tab, .contacts__tab, .ask__tabs-item"
    ).on("click", function(event) {
      var id = $(this).attr("data-id");
      $(
        " .process-pokupki__tabs, .contacts__tabs-block, .partners__tabs-block, .homepage__last-products, .ask__right"
      )
        .find(" .tabs-content, .homepage__last-products-tabs-content, .ask__right-content")
        .removeClass("active-tab")
        .hide();
      $(
        " .process-pokupki__tabs-row, .contacts__tabs-row, .homepage__last-products-tabs, .ask__tabs "
      )
        .find(
          ".process-pokupki__tab, .contacts__tab, .homepage__last-products-tab, .ask__tabs-item"
        )
        .removeClass("active");
      $(this).addClass("active");
      $("#" + id)
        .addClass("active-tab")
        .fadeIn();
      return false;
    });
  });



  $(
    ".main-menu-item.with-submenu > a, .main-submenu-item.with-submenu > a"
  ).click(function() {
    if (
      $("body").width() < 1024 &&
      !$(this)
        .parent()
        .hasClass("show")
    ) {
      $(this)
        .parent()
        .parent()
        .children()
        .removeClass("show");
      $(this)
        .parent()
        .addClass("show");
      return false;
    }
  });

  $(function($, undefined) {
    $("#menu-toggle").on("click", function() {
      $(".header__mobile-box").slideToggle();
    });
  });

  $(".with-submenu > a").click(function() {
    if (
      $("body").width() < 768 &&
      !$(this)
        .parent()
        .hasClass("show")
    ) {
      $(this)
        .parent()
        .parent()
        .children()
        .removeClass("show");
      $(this)
        .parent()
        .addClass("show");
      return false;
    }
  });

  //carousel

  $(function($, undefined) {
    $(".carousel__items").slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      prevArrow:
        '<img class="slider__arrows slider__arrows-left" src="images/icons/carousel-arrow-left.png" alt="">',
      nextArrow:
        '<img class="slider__arrows slider__arrows-right" src="images/icons/carousel-arrow-right.png" alt="">',
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 901,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 681,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 561,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });

  //carousel__big

  $(function($, undefined) {
    $(".carousel__big-items").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow:
        '<img class="slider__arrows slider__arrows-left" src="images/icons/carousel-arrow-left.png" alt="">',
      nextArrow:
        '<img class="slider__arrows slider__arrows-right" src="images/icons/carousel-arrow-right.png" alt="">',
      dots: true
    });
  });
  //carousel__reviews
  $(function($, undefined) {
    $(".reviews__carousel-items, .homepage__news-carousel-items").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow:
        '<img class="slider__arrows slider__arrows-left" src="images/icons/carousel-arrow-left.png" alt="">',
      nextArrow:
        '<img class="slider__arrows slider__arrows-right" src="images/icons/carousel-arrow-right.png" alt="">',
      dots: true
    });
  });

  //main__slider
  $(function($, undefined) {
    $(".homepage__slider-items").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow:
        '<img class="slider__arrows slider__arrows-left" src="images/icons/arrow-left-white.png" alt="">',
      nextArrow:
        '<img class="slider__arrows slider__arrows-right" src="images/icons/arrow-right-white.png" alt="">',
      dots: true,
      fade: true
    });
  });

  //landing__carousel landing__carousel-items
  $(function($, undefined) {
    $(".landing__carousel-items").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow:
        '<img class="slider__arrows slider__arrows-left" src="images/icons/carousel-arrow-left.png" alt="">',
      nextArrow:
        '<img class="slider__arrows slider__arrows-right" src="images/icons/carousel-arrow-right.png" alt="">'
    });
  });

  //reviews-page carousel
  $(function($, undefined) {
    $(".reviews-page__item-carousel").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow:
        '<img class="slider__arrows slider__arrows-left" src="images/icons/arrow-left-white.png" alt="">',
      nextArrow:
        '<img class="slider__arrows slider__arrows-right" src="images/icons/arrow-right-white.png" alt="">',
      dots: true
    });
  });

  $(function($, undefined) {
    $(".language-select, .header__search").click(function() {
      $(".languages-list, .header__search").removeClass("active");
      $(this).toggleClass("active");
    });
  });

  $(function($, undefined) {
    $(document).mouseup(function(e) {
      var div = $(".language-select, .header__search");
      if (!div.is(e.target) && div.has(e.target).length === 0) {
        div.removeClass("active");
      }
    });
  });

  $(function($, undefined) {
    $(".tuning__kinds-item").click(function() {
      $(".tuning__kinds-item span").removeClass("active");
      $(this).toggleClass("active");
    });
  });

  $(".menu-toggle, .menu-cover").click(function() {
    $("body").toggleClass("menu-opened");
    $("body").removeClass("categories-opened");
    return false;
  });
  $(".categories-toggle, .categories-cover").click(function() {
    $("body").toggleClass("categories-opened");
    $("body").removeClass("menu-opened");
    return false;
  });

  $("input, select").each(function() {
    var text = $(this).data("placeholder");
    $(this).styler({
      filePlaceholder: text
    });
  });

  $(".to-search").click(function() {
    $($(this).data("block"))
      .stop(true)
      .slideToggle();
    var text = $(this).text();
    $(this).text($(this).data("text"));
    $(this).data("text", text);
    return false;
  });

  var $fotoramaDiv = jQuery('.fotorama').fotorama({
    click:false,
    allowfullscreen:true,
  });
  var fotorama = $fotoramaDiv.data('fotorama');
  $('.prod-image .show-all-photos').click(function(){
    fotorama.requestFullScreen();    
});

});
