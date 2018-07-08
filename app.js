// модуль для структуры данных
var budgetController = (function() {
  
  // конструктор для расходов
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // конструктор для доходов
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // структура данных
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  // Budget Controller API
  return {
    // добавление элемента
    addItem: function(type, desc, val) {
      var newItem, ID;

      // создание нового ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // создание элемента в зависимости от типа
      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }

      // добавляем в структуру данных
      data.allItems[type].push(newItem);
      return newItem;
    }
  };
})();

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
    // получение значений
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
      // which для старых браузеров
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  
  // добавление нового элемента
  var ctrlAddItem = function() {
    var input, newItem;

    input = UICtrl.getInput();

    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
  };

  // Controller API
  return {
    // функция инициализации
    init: function() {
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();