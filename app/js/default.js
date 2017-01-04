/**
  * @status contain of ["success","error","warning","info"];
  */
function showAlert(msg,status){
  var alert = $(".alert");
  alert.removeClass("alert-warning");
  alert.removeClass("alert-sucess");
  alert.removeClass("alert-danger");
  alert.removeClass("alert-info");

  alert.addClass("alert-"+status);
  alert.find(".alert-message").html(msg);
  alert.show();
}
function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, '-');
  str = str.toLowerCase();

  var from = "ÃÃ¡Ã¤Ã¢Ã¨Ã©Ã«ÃªÃ¬Ã­Ã¯Ã®Ã²Ã³Ã¶Ã´Ã¹ÃºÃ¼Ã»Ã±Ã§Â·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '-')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

  return str;
}
(function($) {
    $.fn.extend({
        donetyping: function(callback, timeout) {
            timeout = timeout || 1e3;
            var timeoutReference,
            doneTyping = function(el) {
                if (!timeoutReference) return;
                timeoutReference = null;
                callback.call(el);
            };
            return this.each(function(i, el) {
                var $el = $(el);
                $el.is(':input') && $el.on('keyup keypress paste', function(e) {
                    if (e.type == 'keyup' && e.keyCode != 8) return;

                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function() {
                        doneTyping(el);
                    }, timeout);
                }).on('blur', function() {
                    doneTyping(el);
                });
            });
        }
    });
})(jQuery);

  var baseurl = window.location.protocol+ "//" + window.location.host;
  var url = baseurl+window.location.pathname;

$(function(){
  /*
  ** Setup Numeral JS
  ** load a language
  */
  numeral.language('id', {
      delimiters: {
        thousands: '.',
        decimal: ','
      },
      abbreviations: {
        thousand: 'Rb',
        million: 'Jt',
        billion: 'M',
        trillion: 'T'
      },
      currency: {
        symbol: 'Rp'
      }
  });
  numeral.language('id');

  if($(".nav-cart").length > 0){
    $.get("/api/cart", function(o){
      $(".nav-cart .notif-label").html(o.result.length);
    });
  }
  
  $('[data-toggle="tooltip"]').tooltip();
  $(".sidebar-toggle").unbind().on('click', function(){
    $('.nav-sidebar').toggleClass('collapsed');
    var title = $(this).attr('data-original-title');
    if(title.indexOf('Sembunyikan') != -1){
      $(this).attr('data-original-title', 'Tampilkan menu');
    }else{
      $(this).attr('data-original-title', 'Sembunyikan menu');
    }
  });
});
