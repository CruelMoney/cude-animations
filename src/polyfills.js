if(typeof(window) !== 'undefined'){
  (function () {
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
  })();
}