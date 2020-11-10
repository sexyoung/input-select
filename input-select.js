class InputSelect {
  constructor(DOM, options = {
    noValueText: 'choose a value'
  }) {
    if(!DOM) return console.log('not found DOM');
    this.data = {}
    this.observable = {}
    this.value = null;
    if(options.noValueText) {
      this.noValueText = options.noValueText;
    }
    this.initial(DOM);
  }

  newDOM(domName, props) {
    const DOM = document.createElement(domName);
    for (const attr in props) {
      DOM[attr] = props[attr];
    }
    return DOM;
  }

  removeAll() {
    while(this.firstLiDOM.nextSibling) {
      this.firstLiDOM.nextSibling.remove();
    }
  }

  hideAllObservable(observable) {
    Object.keys(observable).forEach(value => {
      observable[value].currentGameDOM.innerHTML = observable[value].noValueText;
      observable[value].rootDOM.value = null;
      observable[value].rootDOM.style.display = 'none';
      if(Object.keys(observable).length) {
        this.hideAllObservable(observable[value].observable);
      }
    });
  }

  chooseGame(e) {
    this.inputDOM.value = '';
    this.value = e.target.dataset.code;
    this.currentGameDOM.innerHTML = e.target.innerHTML;

    /** hide all observable DOM */
    if(Object.keys(this.observable).length) {
      this.hideAllObservable(this.observable);
      if(this.observable[e.target.dataset.code]) {
        this.observable[e.target.dataset.code].rootDOM.removeAttribute('style');
      }
    }

    this.removeAll();
    this.addList(this.data);
  }

  addList(listObj) {
    for (const key in listObj) {
      const liDOM = this.newDOM('li', {
        innerText: listObj[key],
      });
      liDOM.dataset.code = key;
      liDOM.addEventListener('click', this.chooseGame.bind(this));
      this.ulDOM.appendChild(liDOM);
    }
  }

  handleFilter(e) {
    this.removeAll();
    let filterKeyObj = {};
    for (const key in this.data) {
      if(this.data[key].toLowerCase().includes(e.target.value.toLowerCase())) {
        filterKeyObj[key] = this.data[key];
      }
    }
    this.addList(filterKeyObj);
  }

  initial(DOM) {
    /** 建立 rootDOM */
    const rootDOM = this.newDOM('label', {className: 'input-select'});
    this.rootDOM = rootDOM;

    /** 插入 checkbox */
    rootDOM.appendChild(this.newDOM('input', {type: 'checkbox'}));

    /** 插入 span */
    const currentGameDOM = this.newDOM('span', {innerHTML: this.noValueText});
    rootDOM.appendChild(currentGameDOM);
    this.currentGameDOM = currentGameDOM;

    /** 建立 ul */
    const ulDOM = this.newDOM('ul', {className: 'dropdown'});
    this.ulDOM = ulDOM;


    /** 建立第一個輸入框 li */
    const firstLiDOM = this.newDOM('li');
    this.firstLiDOM = firstLiDOM;

    /** 建立 first li */
    const inputDOM = this.newDOM('input', {
      type: 'text',
      placeholder: '搜尋...'
    });

    inputDOM.addEventListener('keyup', this.handleFilter.bind(this));
    this.inputDOM = inputDOM;

    /** 輸入框先插入 li */
    firstLiDOM.appendChild(inputDOM);

    /** li 插入 ul */
    ulDOM.appendChild(firstLiDOM);

    const parentNode = DOM.parentNode;

    for (const optionDOM of DOM.children) {
      this.data[optionDOM.value] = optionDOM.innerText;
    }

    this.addList([...DOM.children].reduce((obj, DOM) => ({
      ...obj,
      [DOM.value]: DOM.innerText,
    }), {}));

    /** 插入 ul 到 rootDOM */
    rootDOM.appendChild(ulDOM);

    /** 插入到原select前 */
    parentNode.insertBefore(rootDOM, DOM);

    /** 刪除select */
    DOM.remove();
  }

  observe(valueAt, ISObj) {
    ISObj.rootDOM.style.display = 'none';
    if(!this.data[valueAt]) return;
    this.observable[valueAt] = ISObj;
  }
}