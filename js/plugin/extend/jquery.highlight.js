/**
 * @class   jQuery.Plugin
 */

/**
 * @method     文本高亮方法
 * @param      {string}      pat     要高亮的文本
 */
$.fn.highlight = function(pat) {
  'use strict';
  function innerHighlight(node, pat) {
    var skip = 0;
    if (node.nodeType == 3) {
      var pos = node.data.toUpperCase().indexOf(pat);
      if (pos >= 0) {
        var spannode = document.createElement('span');
        spannode.className = 'highlight';
        var middlebit = node.splitText(pos);
        var endbit = middlebit.splitText(pat.length);
        var middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spannode, middlebit);
        skip = 1;
      }
    } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
      for (var i = 0; i < node.childNodes.length; ++i) {
        i += innerHighlight(node.childNodes[i], pat);
      }
    }
    return skip;
  }
  $.fn.removeHighlight();
  return this.length && pat && pat.length ? this.each(function() {
    innerHighlight(this, pat.toUpperCase());
  }) : this;
};

/**
 * @method     移除高亮代码
 */
$.fn.removeHighlight = function() {
  return this.find("span.highlight").each(function() {
    this.parentNode.firstChild.nodeName;
    with(this.parentNode) {
      replaceChild(this.firstChild, this);
      normalize();
    }
  }).end();
};