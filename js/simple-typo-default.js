(function ($) {

  // Show typo report window on Ctrl + Enter.
  $(document).keydown(function (event) {
    if (event.ctrlKey && event.keyCode == 13) {
      simple_typo_report_window();
    }
  });

  // Callback for Drupal ajax_command_invoke function.
  $.fn.simple_typo_js_callback = function () {
    setTimeout(function () {
      simple_typo_close();
    }, 2000)
  };

  /**
   * Function shows modal window.
   */
  function simple_typo_report_window() {
    var sel = simple_typo_get_sel_text();

    if (sel.selected_text.length > 30) {
      var massage = Drupal.t('You have to select not more then 30 symbols');
      $('#simple-typo').addClass('open').append('<div class="messages error">' + massage + '</div>');
      $('.simple-typo-body').css('display', 'none');
    }

    else if (sel.selected_text.length == 0) {
    }

    else {
      // Get selection context.
      var text = simple_typo_get_sel_context(sel);

      $('#simple-typo').addClass('open');
      $('#simple-typo-text-div').html(text);
      $('#simple-typo-text').val(text);

    }

    // Close modal by clicking button.
    $('.simple-typo-close').click(function () {
      simple_typo_close();
    });

    // Close modal by Esc press.
    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        simple_typo_close();
      }
    });

    // Close modal by clicking outside the window.
    $('.overlay').click(function () {
      simple_typo_close();
    });
  }

  function simple_typo_close() {
    $('#simple-typo').removeClass('open');
    $('.simple-typo-body').css('display', 'block');
    $('#simple-typo .messages').remove();
  }

  Drupal.ajax.prototype.commands.simple_typo = function (ajax, response, status) {
    $('#simple-typo').append(response.message);
  };

})(jQuery);
