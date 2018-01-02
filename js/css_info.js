(function ($, Drupal, drupalSettings) {

  Drupal.behaviors.cssInfoToolbar = {
    attach: function (context) {

      var $themeName = drupalSettings.css_info.theme_name;
      var $themeFile = '/themes/'+$themeName+'/docs/theme.html';
      var $body = $('body');
      var $toolbarCssIcon = $('#toolbar-icon-css', context);

      $toolbarCssIcon.prepend('<span class="toolbar-icon-css"></span>');

      $.ajax({
        url: $themeFile,
        type:'HEAD',
        error: function() {
          alert('Theme file does not exist')
        },
        success: function() {
          $body.append('<iframe id="toolbar-css-frame" name="toolbar-css-frame" src="'+$themeFile+'" class="toolbar-css-frame fixed allt" frameborder="0" width="400px" height="100%"></iframe>');
          var $toolbarCssFrame = $('#toolbar-css-frame', context);

          var $extraCss = '' +
            '<style type="text/css">' +
            '* {max-width: 400px !important;}' +
            '.overflow-scroll > .list-reset {overflow: hidden;}' +
            '</style>';

          $toolbarCssIcon.on('click', function(e) {
            var $head = $toolbarCssFrame.contents().find('head');

            $head.append($($extraCss));
            $(this).find('.toolbar-icon-css').toggleClass('active');
            $toolbarCssFrame.toggleClass('open');
            $toolbarCssFrame.contents().find('.input').focus();

            return false;
          });

          $body.on('click', function(e) {
            var target = $(e.target);
            if(!target.is($toolbarCssIcon) && !target.is($toolbarCssFrame)) {
              $toolbarCssIcon.find('.toolbar-icon-css').removeClass('active');
              $toolbarCssFrame.removeClass('open');
            }
          });
        }
      });

    }
  };

})(jQuery, Drupal, drupalSettings);
