$(document).ready(function () {

	$("a[href*=#]").click(function (e) {
		if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
				Core.scrollTo($(this.hash))
		}
		return false
	});

	$(window).scroll(function () {
		var g = "#" + $("body .target:in-viewport").attr("id");
		var f = true;
		switch (g) {
		case "#page-front":
			//Core.position(g);
			break;
		case "#timers":
			//Core.position(g);
			break;
		}
	});

	$('.del-row').click(function(e) {
		e.preventDefault();
		$(this).parents('tr').hide();
	});

	$(".timer-history").hide();
	$('button.history').toggle(function() {
		$(this).addClass("active");
		$(this).html(".");
		$(this).parents(".timer-wrap").find(".timer-history").show();
	}, function() {
		$(this).removeClass("active");
		$(this).html(",");
		$(this).parents(".timer-wrap").find(".timer-history").hide();
	});

	$('button.start').toggle(function() {
		$(this).removeClass("active");
		$(this).html("1");
	}, function() {
		$(this).addClass("active");
		$(this).html("2");
	});


	var visible = false;
	document.onkeydown = console_slide;
	var Tilde = 192, Esc = 27;
	function console_slide(evt){
	  if (!evt) {
	    evt = window.event;
	  }
	  if (evt.keyCode === Esc || evt.keyCode === Tilde) {// Esc
	    if(visible==false){
	        visible = true;
	        $('#console').animate({
	            top: 0
	        });
	    }
	    else if(visible==true){
	        visible = false;
	        $('#console').animate({
	            top: -350
	        });
	    }
	    return false;
	  }
	}


});



//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


(function (a) {
	a.belowthefold = function (c, d) {
			var b = a(window).height() + a(window).scrollTop();
			return b <= a(c).offset().top - d.threshold
	};
	a.abovethetop = function (b, c) {
			var d = a(window).scrollTop();
			return d >= a(b).offset().top + a(b).height() - c.threshold
	};
	a.rightofscreen = function (c, d) {
			var b = a(window).width() + a(window).scrollLeft();
			return b <= a(c).offset().left - d.threshold
	};
	a.leftofscreen = function (b, c) {
			var d = a(window).scrollLeft();
			return d >= a(b).offset().left + a(b).width() - c.threshold
	};
	a.inviewport = function (b, c) {
			return !a.rightofscreen(b, c) && !a.leftofscreen(b, c) && !a.belowthefold(b, c) && !a.abovethetop(b, c)
	};
	a.extend(a.expr[":"], {
			"below-the-fold": function (c, d, b) {
					return a.belowthefold(c, {
							threshold: 0
					})
			},
			"above-the-top": function (c, d, b) {
					return a.abovethetop(c, {
							threshold: 0
					})
			},
			"left-of-screen": function (c, d, b) {
					return a.leftofscreen(c, {
							threshold: 0
					})
			},
			"right-of-screen": function (c, d, b) {
					return a.rightofscreen(c, {
							threshold: 0
					})
			},
			"in-viewport": function (c, d, b) {
					return a.inviewport(c, {
							threshold: 0
					})
			}
	})
})(jQuery);

var Core = {
		positionChecker: null,
		positionChecked: false,
		TOP_AREA: 480,
		scrollTo: function (d, c) {
				var a = $(d);
				c = typeof c !== "undefined" ? parseInt(c, 10) : 0;
				a = a.length && a;
				if (a.length) {
						var b = a.offset().top - c;
						if ($.browser.opera) {
								$("html").animate({
										scrollTop: b
								}, 420)
						} else {
								$("html,body").animate({
										scrollTop: b
								}, 420)
						}
				}
		},
		scrollUp: function () {
				$(window).scrollTop(0)
		},
		doAtTop: function () {
				var a = null;
				if (typeof window.scrollY === "undefined") {
						a = parseInt(document.documentElement.scrollTop, 10)
				} else {
						a = parseInt(window.scrollY, 10)
				}
				if (!Core.positionChecked && a <= Core.TOP_AREA) {
						if (!$("header a").is(":animated")) {
								$("header a").stop().pulse()
						}
						Core.positionChecked = true;
						//Core.position("#")
				} else {
						Core.positionChecked = false
				}
		}
};