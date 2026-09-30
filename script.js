const passwordInput = document.querySelector('#password');
const encodeButton = document.querySelector('#encode-button');
const output = document.querySelector('#encoded-output');
const count = document.querySelector('#char-count');
const hint = document.querySelector('#empty-hint');
const status = document.querySelector('#status-pill');
const toggle = document.querySelector('#toggle-password');
const copy = document.querySelector('#copy-button');

const fields = {
  original: document.querySelector('#step-original'),
  bytes: document.querySelector('#step-bytes'),
  xor: document.querySelector('#step-xor'),
  hex: document.querySelector('#step-hex'),
  base64: document.querySelector('#step-base64')
};
const steps = [...document.querySelectorAll('.step')];

function bytesOf(text) { return [...new TextEncoder().encode(text)]; }
function toBase64(bytes) { let binary = ''; bytes.forEach(byte => binary += String.fromCharCode(byte)); return btoa(binary); }
function preview(text) { return text.length > 26 ? `${text.slice(0, 10)}••••${text.slice(-6)}` : text; }
function escapeHtml(text) { return text.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char])); }
function setStep(index, done) { steps[index].classList.toggle('active', done); steps[index].classList.toggle('complete', done); }

function encode() {
  const value = passwordInput.value;
  count.textContent = `${value.length} ${value.length === 1 ? 'caractere' : 'caracteres'}`;
  if (!value) {
    output.textContent = '—'; status.textContent = 'aguardando'; status.classList.remove('ready'); hint.textContent = 'Comece digitando uma senha para liberar o laboratório.';
    fields.original.textContent = 'aguardando entrada'; fields.original.classList.add('muted');
    ['bytes','xor','hex','base64'].forEach(key => fields[key].textContent = '—'); steps.forEach((_, index) => setStep(index, index === 0)); return;
  }
  const bytes = bytesOf(value);
  const masked = bytes.map(byte => byte ^ 42);
  const hex = masked.map(byte => byte.toString(16).padStart(2, '0')).join(' ');
  const encoded = toBase64(masked);
  fields.original.textContent = preview(value); fields.original.classList.remove('muted');
  fields.bytes.textContent = bytes.join(' · ');
  fields.xor.textContent = masked.join(' · ');
  fields.hex.textContent = hex;
  fields.base64.textContent = encoded;
  output.textContent = encoded; status.textContent = 'codificado'; status.classList.add('ready'); hint.textContent = 'Transformação concluída — experimente editar a senha.';
  steps.forEach((_, index) => setStep(index, true));
}

passwordInput.addEventListener('input', encode);
encodeButton.addEventListener('click', encode);
toggle.addEventListener('click', () => { const hidden = passwordInput.type === 'password'; passwordInput.type = hidden ? 'text' : 'password'; toggle.textContent = hidden ? '◌' : '◉'; toggle.setAttribute('aria-label', hidden ? 'Esconder senha' : 'Mostrar senha'); });
copy.addEventListener('click', async () => { if (output.textContent === '—') return; await navigator.clipboard.writeText(output.textContent); const old = copy.textContent; copy.textContent = '✓'; setTimeout(() => copy.textContent = old, 1200); });
