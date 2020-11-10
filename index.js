(function() {
  const option = {
    noValueText: '選取的內容',
  }
  const a = new InputSelect(document.querySelector('.my-select-1'), option);
  const b = new InputSelect(document.querySelector('.my-select-2'));
  const c = new InputSelect(document.querySelector('.my-select-3'));

  a.observe('A1', b);
  b.observe('D1', c);
})();