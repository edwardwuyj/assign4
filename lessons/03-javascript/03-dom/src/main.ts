const title = document.getElementById('title') as HTMLHeadingElement | null;

if (title) {
  title.classList.add('text-green-500', 'text-center');
}

const titles = document.getElementsByTagName('h2') as HTMLCollectionOf<HTMLHeadingElement>;

for (const el of titles) {
  el.classList.add('text-red-500', 'text-center');
  el.textContent = 'Bye';
}

const special = document.getElementsByClassName('special') as HTMLCollectionOf<HTMLElement>;

for (const el of special) {
  el.classList.add('text-blue-500');
}

const section: HTMLDivElement = document.createElement('div');
section.className = 'flex flex-col items-center gap-2 mt-4';

for (let i = 0; i < 5; i++) {
  const p: HTMLParagraphElement = document.createElement('p');
  p.textContent = `${i} Item`;
  p.className = 'text-gray-700 text-center';
  section.appendChild(p);
}

document.body.appendChild(section);

const anchor: HTMLAnchorElement = document.createElement('a');
anchor.textContent = 'Google';
anchor.href = 'https://www.google.ca';
anchor.target = '_blank';
anchor.className = 'text-blue-600 underline mt-4 block text-center';

document.body.appendChild(anchor);

const button: HTMLButtonElement = document.createElement('button');
button.textContent = 'Hide List';
button.className = 'mt-6 px-4 py-2 bg-blue-500 text-white rounded';

let show: boolean = true;

button.addEventListener('click', (): void => {
  show = !show;
  section.classList.toggle('hidden');
  button.textContent = show ? 'Hide List' : 'Show List';
});

document.body.appendChild(button);

const button2: HTMLButtonElement = document.createElement('button');
button2.textContent = 'Enlarge Text';
button2.className = 'mt-2 px-4 py-2 bg-green-500 text-white rounded';

button2.addEventListener('click', (): void => {
  if (title) {
    title.classList.add('text-[100px]', 'transition-all', 'duration-1000', 'rotate-[360deg]');
  }
});

document.body.appendChild(button2);
