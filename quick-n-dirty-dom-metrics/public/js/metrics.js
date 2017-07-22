(function() {

  var root = this;

  // Private functions

  var getXMLHttpRequestObject = function() {
    var ref = null;
    if (window.XMLHttpRequest) {  // Newer browsers
      ref = new XMLHttpRequest();
    } else if(window.ActiveXObject) {  // IE 6
      ref = new ActiveXObject('MSXML2.XMLHTTP.3.0')
    }
    return ref;
  }

  // Public functions

  root.metrics = function(obj) {
    return obj;
  }

  metrics.countChildTagsOf = function(pa){
    pa = pa || document;
    var O = {},
    A = [], tag, D = pa.getElementsByTagName('*');
    D = A.slice.apply(D, [0, D.length]);
    while(D.length){
      tag = D.shift().tagName.toLowerCase();
      if(!O[tag]) O[tag]= 0;
      O[tag]+= 1;
    }
    for(var p in O){
      A[A.length] = p+': '+O[p];
    }
    A.sort(function(a, b){
      a = a.split(':')[1]*1;
      b = b.split(':')[1]*1;
      return b-a;
    });
    return A.join(', ');
  }

  metrics.cssOf = function(element) {
    return getComputedStyle(element);
  }

}).call(this);
