(function() {
  const inputDOM = document.querySelector('.input-select input[type=text]');
  const dropdownDOM = document.querySelector('.input-select .dropdown');
  const currentGameDOM = document.querySelector('.input-select > span');
  
  const gameList = [
    '遊戲A1',
    '遊戲A2',
    '遊戲B1',
    '遊戲B2',
    '遊戲C1',
    '遊戲C2',
  ];
  
  function removeAll() {
    // remove all li
    const liGameDOMList = [...document.querySelectorAll('.input-select ul li:not(:first-of-type)')];
    liGameDOMList.forEach(DOM => DOM.remove());
  }
  
  function chooseGame(e) {
    inputDOM.value = '';
    currentGameDOM.innerHTML = e.target.innerHTML;
    removeAll();
  }
  document.querySelector('.input-select input[type=text]').addEventListener('keyup', (e) => {
  
    removeAll();
  
    // if input is null, return;
    if(!e.target.value.trim()) return;
  
    const filterGameList = gameList.filter(game =>
      game.toLowerCase().includes(e.target.value.toLowerCase())
    ).map(game => {
      const liDOM = document.createElement('li');
      liDOM.innerHTML = game;
      liDOM.addEventListener('click', chooseGame);
      return liDOM;
    });
  
    // re-assign liDOM to dropdownDOM
    filterGameList.forEach(gameDOM => {
      dropdownDOM.appendChild(gameDOM);
    });
  });
})();