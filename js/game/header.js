const drawHeart = (full) => {
  return `<span class="heart__${full ? `full` : `empty`}">${full ? `&#9829;` : `&#9825;`}</span>`;
};

const range = (from = 0, to) => {
  return (callback) => {
    const array = [];
    for (let i = from; i < to; i++) {
      array.push(callback(i));
    }
    return array;
  }
};

const drawHearts = (lives) => {
  return range(0, 3)((i) => drawHeart(i < lives)).reverse().join('');
};

const header = document.createElement(`div`);

export default (data) => {
  header.innerHTML = `
<header class="header">
  <div>Мир: ${data.level}</div>
  <div>Жизни: ${drawHearts(data.lives)}</div>
  <div>Время: ${data.time}</div>
</header>`;

  return header;
};
