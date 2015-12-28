if (window.location.protocol != "https:") {
//    window.location.protocol = "https:";
}

$(window).on("load", function() {
    $.backstretch("https://placekitten.com/g/1920/1080");

    $(window).on("backstretch.after", function() {
        $("#overlay").fadeOut("slow");
    });
});

(function() {
  if (window.__twitterIntentHandler) return;
  var intentRegex = /twitter\.com\/intent\/(\w+)/,
      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
      width = 550,
      height = 420,
      winHeight = screen.height,
      winWidth = screen.width;
 
  function handleIntent(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        m, left, top;
 
    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }
 
    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(intentRegex);
      if (m) {
        left = Math.round((winWidth / 2) - (width / 2));
        top = 0;
 
        if (winHeight > height) {
          top = Math.round((winHeight / 2) - (height / 2));
        }
 
        window.open(target.href, 'intent', windowOptions + ',width=' + width +
                                           ',height=' + height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  }
 
  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
  window.__twitterIntentHandler = true;
}());

function openModal(selector) {
   if ($(selector).hasClass("modal")) {
      $(selector).fadeIn();
      $("#modal-background").fadeIn();
   } else {
      console.warn("attempted to open modal that wasn't actually a modal!");
   }
}

function closeModal() {
   $(".modal").fadeOut();
   $("#modal-background").fadeOut();
}

$("#pk-link").click(function() {
   openModal("#public-key");
});

$("#modal-background").click(function() {
   closeModal();
});

$.ajax("publickey.txt", {success:function(d1) {
    $.ajax("https://keybase.io/zudomc/key.asc", {success:function(d2) {
        key1 = btoa(d1);
        key2 = btoa(d2);
        console.log(key1);
        console.log(key2);
        if (key1 == key2) {
            $("#pk-match").removeClass("neutral").addClass("positive").text("Keys appear to be OK!");
        } else {
            $("#pk-match").removeClass("neutral").addClass("negative").text("Keys don't match up.");
        }
    },error:function(){
        $("#pk-match").removeClass("neutral").addClass("negative").text("There was an error loading Keybase's key.");
    }});
},error:function(){
    $("#pk-match").removeClass("neutral").addClass("negative").text("There was an error loading the local key.");
}});