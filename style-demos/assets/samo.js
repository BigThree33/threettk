(function () {
  const FACE = [
    '..kk........kk..',
    '.kpwk......kwpk.',
    '.kwwwk....kwwwk.',
    'kwwwwwwwwwwwwwwk',
    'kwwwwwwwwwwwwwwk',
    'kwwkkwwwwwwkkwwk',
    'kwwkkwwwwwwkkwwk',
    'kwwwwwwwwwwwwwwk',
    'kwwwwwwnnwwwwwwk',
    'kwwwwkwwwwkwwwwk',
    'kwwwwkwppwkwwwwk',
    'kwwwwwkwwkwwwwwk',
    '.kwwwwwwwwwwwwk.',
    '..kkwwwwwwwwkk..',
    '....kkkkkkkk....'
  ];
  const SIDE = [
    '.....kk.............kk..',
    '....kpwk..........kwwwk.',
    '....kwwk..........kwwwk.',
    '...kwwwwwwk......kwwwk..',
    'nwkkwwwwwwkkkkkkkkwwwk..',
    'nwkkwwwwwwwwwwwwwwwwwk..',
    'kwwwwwwwwwwwwwwwwwwwwk..',
    '.kwwwwwwwwwwwwwwwwwwwk..',
    '.kwwwwwwwwwwwwwwwwwwwk..',
    '..kwwwwwwwwwwwwwwwwwwk..',
    '...kggggggggggggggggggk..',
    '...kwwkkkkwwkkkkwwkkkwwk',
    '...kwwk..kwwk..kwwk.kwwk',
    '...kwwk..kwwk..kwwk.kwwk',
    '...kwwk..kwwk..kwwk.kwwk',
    '...kkkk..kkkk..kkkk.kkkk'
  ];
  const SIDE2 = [
    '.....kk...........kk....',
    '....kpwk.........kwwwk..',
    '....kwwk........kwwwk...',
    '...kwwwwwwk.....kwwwk...',
    'nwkkwwwwwwkkkkkkkwwwk...',
    'nwkkwwwwwwwwwwwwwwwwwk..',
    'kwwwwwwwwwwwwwwwwwwwwk..',
    '.kwwwwwwwwwwwwwwwwwwwk..',
    '.kwwwwwwwwwwwwwwwwwwwk..',
    '..kwwwwwwwwwwwwwwwwwwk..',
    '...kggggggggggggggggggk..',
    '......kwwkkwwkkwwkkkkwwk',
    '......kwwkkwwkkwwk..kwwk',
    '......kwwkkwwkkwwk..kwwk',
    '......kwwkkwwkkwwk..kwwk',
    '......kkkkkkkkkkkk..kkkk'
  ];
  const PORTRAIT = [
    '................',
    '......kkkk......',
    '....kkhhhhkk....',
    '...khhhhhhhhk...',
    '..khhhhhhhhhhk..',
    '..khhhhhhhhhhk..',
    '..khksssssskhk..',
    '..khsssssssshk..',
    '..khsseesseshk..',
    '..khsseesseshk..',
    '..khsssssssshk..',
    '...kkssmmsskk...',
    '....kkcccckk....',
    '...kcccccccck...',
    '...kcccccccck...',
    '....kkkkkkkk....'
  ];
  const SPRITES = { face: FACE, side: SIDE, side2: SIDE2, portrait: PORTRAIT };
  const PAL = {
    k: '#2b2b3b', w: '#fffdf7', s: '#f7cfae', p: '#f2868f', n: '#1b1b2b',
    h: '#4be1c3', c: '#8b7cff', e: '#1b1b2f', m: '#d95763', g: '#d9dee8'
  };

  function paint(el) {
    const pose = el.dataset.pose || 'face';
    const rows = SPRITES[pose];
    const pal = Object.assign({}, PAL);
    for (const k in el.dataset) if (k.length === 1) pal[k] = el.dataset[k];
    const w = rows[0].length, h = rows.length, px = +(el.dataset.px || 6);
    el.width = w; el.height = h;
    const c = el.getContext('2d');
    rows.forEach((row, y) => {
      for (let x = 0; x < w; x++) {
        const col = pal[row[x]];
        if (col) { c.fillStyle = col; c.fillRect(x, y, 1, 1); }
      }
    });
    el.style.width = w * px + 'px';
    el.style.height = h * px + 'px';
    el.style.imageRendering = 'pixelated';
  }

  const api = { SPRITES, PAL, paint, setPose(el, pose) { el.dataset.pose = pose; paint(el); } };
  window.Samo = api;
  const init = () => document.querySelectorAll('canvas.samo').forEach(paint);
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', init); else init();
})();
