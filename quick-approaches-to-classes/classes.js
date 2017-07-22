/**************************************************************************
* Approach 1
**************************************************************************/

var Logger = (function() {
  function Logger(name, level) {
    var self = this;
    this.name = name;
    this.level = level;
  }

  Logger.prototype = new (function() {
    this.log = function() {
      console.log(this.name + ' logger logs on level ' + this.level + '.');
    }
  })();

  return Logger;
})();


/**************************************************************************
* Approach 2
**************************************************************************/

// var Logger = function(name, level) {
//   var self = this;
//   this.name = name;
//   this.level = level;
// }

// Logger.prototype = new (function() {
//   this.log = function() {
//     console.log(this.name + ' logger logs on level ' + this.level + '.');
//   }
// })();


/**************************************************************************
* Approach 3
**************************************************************************/

// var Logger = (function() {
//   function Logger(name, level) {
//     this.name = name;
//     this.level = level;
//   }

//   Logger.prototype.log = function() {
//     console.log(this.name + ' logger logs on level ' + this.level + '.');
//   };

//   return Logger;
// })();


/**************************************************************************
* Approach 4
**************************************************************************/

// var Logger = function(level) {
//   this.level = level;

//   this.log = function() {
//     console.log('Logging');
//   }
// }
