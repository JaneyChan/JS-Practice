/*
  Code by Gabriel Nunes
*/

function inIframe() { 
  try { 
    return window.self !== window.top; 
  } catch (e) {
    return true;
  }
}

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = '', currentAuthor = '';

function openURL(url)  {
  window.openURL(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1, location=0, statusbar=9, menubar=0, resizable=0');
}

function getQuote() {
  $.ajax({

    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },

    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',

    success: function(response) { 
      // response 返回格式： {"quote":"I'm king of the world!","author":"Titanic","category":"Movies"}

      // 将一个 JSON 字符串解析成为一个对象
      var r = JSON.parse(response);

      currentQuote = r.quote;
      currentAuthor = r.author;

      if (inIframe()) {
        // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
      }

      $(".quote-text").animate({
        opacity:0
        }, 500, 
        function(){
            
          $(this).animate({
            opacity: 1
          }, 500);

          $('text').text(r.quote);
        
      });

      $(".quote-author").animate({
        opacity: 0
        }, 500, 

        function(){
          $(this).animate({
            opacity: 1
          }, 500);

          $("#author").html(r.author);
      });


      var colorIndex = Math.floor(Math.random() * colors.length);
      $("html body").animate({
        backgroundColor: colors[colorIndex],
        color: colors[colorIndex]
      }, 1000);

      $(".button").animate({
        backgroundColor: colors[colorIndex]
      }, 1000);
    }

  });
}

$(document).ready(function() {
  getQuote();
  $("#new-quote").on('click', getQuote);
  $("tweet-quote").on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });

  $('#tumblr-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
    }
  });

});