$(document).ready(function() {
  /* ======= Scrollspy ======= */
  $('body').scrollspy({ target: '#page-nav-wrapper', offset: 100 });

  /* ======= ScrollTo ======= */
  $('.scrollto').on('click', function(e) {
    //store hash
    var target = this.hash;

    e.preventDefault();

    $('body').scrollTo(target, 800, { offset: -60, axis: 'y' });
  });

  /* ======= Fixed page nav when scrolled ======= */

  $(window).on('scroll resize load', function() {
    $('#page-nav-wrapper').removeClass('fixed');

    var scrollTop = $(this).scrollTop();
    var topDistance = $('#page-nav-wrapper').offset().top;

    if (topDistance > scrollTop) {
      $('#page-nav-wrapper').removeClass('fixed');
      $('body').removeClass('sticky-page-nav');
    } else {
      $('#page-nav-wrapper').addClass('fixed');
      $('body').addClass('sticky-page-nav');
    }
  });
});

function togglePublication(btn) {
  var list2 = $('#list2');
  if (list2.css('display') == 'none') {
    list2.fadeIn();
    $(btn).html(
      '<i class="fa fa-chevron-circle-up"></i>&nbsp;Top publications'
    );
  } else {
    list2.fadeOut();
    $('html, body').animate(
      { scrollTop: $('#publications-section').offset().top - 60 },
      500
    );
    $(btn).html(
      '<i class="fa fa-chevron-circle-down"></i>&nbsp;More publications'
    );
  }
}
