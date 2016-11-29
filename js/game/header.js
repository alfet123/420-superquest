const drawHeart = (full) => {
  return `<span class="heart__${full ? `full` : `empty`}">${full ? `&#9829;` : `&#9825;`}</span>`;
};


const drawHearts = (lives) => {
  return new Array(3).fill(0).map((it, i) => drawHeart(i + 1 >= lives)).join('');
};


export default (data) => {
  return `
<header class="header">
  <div>Мир: ${data.level}</div>
  <div>Жизни: ${drawHearts(data.lives)}</div>
  <div>Время: ${data.time}</div>
</header>`;
};
