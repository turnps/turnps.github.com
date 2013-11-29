$(function() {
    function traverse($node, len, maxCount) {
      var reachMaxCount = len > maxCount;
      if (reachMaxCount) {
        $node.hide();
      }
      var $contents = $node.contents();
      for (var i = 0; i < $contents.length; ++i) {
        if (reachMaxCount) {
          $contents.eq(i).hide();
          continue;
        }
        if ($contents[i].nodeType == 3) { // TextNode
          var tmp = len;
          var s = $contents[i].nodeValue;
          len += s.length;
          reachMaxCount = len > maxCount;
          if (reachMaxCount) {
            $contents[i].nodeValue = s.substring(0, maxCount - tmp);
          }
        }
        else if ($contents[i].nodeType == 1) { // Element
          len = traverse($contents.eq(i), len, maxCount);
        }
      }
      return len;
    }
    $('.post_at_index').each(function() {
      traverse($(this), 0, 120);
      /*var thisUrl = $(this).siblings().first().children().attr('href');
      $(this).after('\n<a href="' + thisUrl + '" rel="nofollow">' + 'Read More ...</a>');
      */
    });
});
