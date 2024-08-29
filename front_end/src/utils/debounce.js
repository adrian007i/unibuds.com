function debounce(cb, interval, immediate, value) {
    var timeout; 
  
    return function() { 
      
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) cb.apply(context, args);
      };          
  
      var callNow = immediate && !timeout;
  
      clearTimeout(timeout);
      timeout = setTimeout(later, interval);
  
      if (callNow) cb.apply(context, args);
    }; 
  };
  
export default debounce;