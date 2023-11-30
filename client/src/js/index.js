// client/src/index.js
import { Workbox } from 'workbox-window';
import Editor from './editor';
import { putDb, getDb } from './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

document.addEventListener('blur', async () => {
  const content = /* Get your content from the DOM */;
  await putDb(content);
});

document.addEventListener('DOMContentLoaded', async () => {
  const notes = await getDb();
  // Render your notes in the editor
});

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
