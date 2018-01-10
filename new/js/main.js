(function ($) {
    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });
    $.fn._parallax = (skel.vars.browser == 'ie' || skel.vars.mobile) ? function() {
        return $(this)
    } : function(intensity) {
        var $window = $(window),
            $this = $(this);
        if (this.length == 0 || intensity === 0) return $this;
        if (this.length > 1) {
            for (var i = 0; i < this.length; i++) $(this[i])._parallax(intensity);
            return $this;
        }
        if (!intensity) intensity = 0.25;
        $this.each(function() {
            var $t = $(this),
                on, off;
            on = function() {
                $t.css('background-position', 'center 100%, center 100%, center 0px');
                $window.on('scroll._parallax', function() {
                    var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);
                    $t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');
                });
            };
            off = function() {
                $t.css('background-position', '');
                $window.off('scroll._parallax');
            };
            skel.on('change', function() {
                if (skel.breakpoint('medium').active)(off)();
                else(on)();
            });
        });
        $window.off('load._parallax resize._parallax').on('load._parallax resize._parallax', function() {
            $window.trigger('scroll');
        });
        return $(this);
    };

    $(function() {
        var $window = $(window),
            $body = $('body');
        $body.addClass('is-loading');
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 100);
        });
        $('form').placeholder();
        skel.on('+medium -medium', function() {
            $.prioritize('.important\\28 medium\\29', skel.breakpoint('medium').active);
        });
        $body._parallax(-0.7);
        var $menu = $('#menu');
        var $book = $('#book');
        $menu._locked = false;
        $menu._lock = function() {
            if ($menu._locked) return false;
            $menu._locked = true;
            window.setTimeout(function() {
                $menu._locked = false;
            }, 350);
            return true;
        };
        $menu._show = function() {
            if ($menu._lock()) $body.addClass('is-menu-visible');
        };
        $menu._hide = function() {
            if ($menu._lock()) $body.removeClass('is-menu-visible');
        };
        $menu._toggle = function() {
            if ($menu._lock()) $body.toggleClass('is-menu-visible');
        };
        $menu.appendTo($body).on('click', function(event) {
            event.stopPropagation();
            $menu._hide();
        }).find('.inner').on('click', function(event) {
            event.stopPropagation();
        }).on('click', 'a', function(event) {
            var href = $(this).attr('href');
            event.preventDefault();
            event.stopPropagation();
            $menu._hide();
            window.setTimeout(function() {
                window.location.href = href;
            }, 350);
        });
        $body.on('click', 'a[href="#menu"], a[href="#book"]', function(event) {
            event.stopPropagation();
            event.preventDefault();
            $menu._toggle();
        }).on('keydown', function(event) {
            if (event.keyCode == 27) $menu._hide();
        });
    });

    $(function () {
      if (skel.vars.os == 'ios' && window.self !== window.top) {
        var $menu = $('#menu, #book'), $window = $(window.top);
        $window.on('resize orientationchange', function () {
          $menu
            .css('height', $window.height());
        }).trigger('resize');
      }
    });

    $(function () {
        // Select all links with hashes
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
            ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                scrollTop: target.offset().top
                }, 1000, function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                } else {
                    $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                };
                });
            }
            }
        });
    });

    $(document).ready(function(){
        var zindex = 10;
        
        $("div.card").click(function(e){
            e.preventDefault();

            var isShowing = false;

            if ($(this).hasClass("show")) {
            isShowing = true
            }

            if ($("div.cards").hasClass("showing")) {
            // a card is already in view
            $("div.card.show")
                .removeClass("show");

            if (isShowing) {
                // this card was showing - reset the grid
                $("div.cards")
                .removeClass("showing");
            } else {
                // this card isn't showing - get in with it
                $(this)
                .css({zIndex: zindex})
                .addClass("show");

            }

            zindex++;

            } else {
            // no cards in view
            $("div.cards")
                .addClass("showing");
            $(this)
                .css({zIndex:zindex})
                .addClass("show");

            zindex++;
            }
            
        });
    });

    $(document).ready(function(){
        $('.post-module').hover(function() {
          $(this).find('.description').stop().animate({
            height: "toggle",
            opacity: "toggle"
          }, 500);
        });
      });

  })(jQuery);