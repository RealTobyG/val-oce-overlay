if (typeof require !== 'undefined') {
    var customSelect = require("custom-select").default;
    require("./custom-select.css");
  }
  
  let mySelects = customSelect("select");
  
  console.log(mySelects);


  function remakeAllSelects() {
    
    for (select of mySelects) {
        select.destroy()
    }

    mySelects = customSelect("select");
}