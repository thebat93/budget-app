// модуль для структуры данных
var budgetController = (function() {})();

// модуль UI
var UIController = (function() {
  // селекторы
  var DOMStrings = {
    inputType: ".add__type",
    inputDecription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };
  // UI Controller API
  return {
    // получение значения
    getInput: function() {
      return {
      // тип: доход/расход
      type: document.querySelector(DOMStrings.inputType).value, // 'inc' / 'exp'
      // описание
      description = document.querySelector(DOMStrings.inputDecription).value,
      // сумма
      value = document.querySelector(DOMStrings.inputValue).value
      };
    },
    // получение селекторов
    getDOMStrings: function() {
        return DOMStrings;
    }
  };
})();

// модуль контроллера приложения
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();
    
    // обработчик нажатия на кнопку
    document.querySelector().addEventListener("click", ctrlAddItem);

    // обработчик нажатия на Enter
    document.addEventListener("keypress", function(event) {
      //   which для старых браузеров
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  
  // добавление нового элемента
  var ctrlAddItem = function() {
    var input = UICtrl.getInput();
  };

  return {
    // функция инициализации
    init: function() {
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();