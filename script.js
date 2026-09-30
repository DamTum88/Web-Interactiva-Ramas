const copyButtons = document.querySelectorAll('.copy-btn');
const toast = document.getElementById('toast');

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Comando copiado');
    } catch {
      showToast('No se pudo copiar automáticamente');
    }
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1500);
}

const resetBtn = document.getElementById('resetBtn');
const branchBtn = document.getElementById('branchBtn');
const commitBtn = document.getElementById('commitBtn');
const mergeBtn = document.getElementById('mergeBtn');
const featureRow = document.getElementById('featureRow');
const featureCommitPath = document.getElementById('featureCommitPath');
const featureCommitNode = document.getElementById('featureCommitNode');
const mergePath = document.getElementById('mergePath');
const mergeNode = document.getElementById('mergeNode');
const simStatus = document.getElementById('simStatus');

let state = 0;

function renderSimulation() {
  featureRow.classList.toggle('hidden', state < 1);
  featureCommitPath.classList.toggle('hidden', state < 2);
  featureCommitNode.classList.toggle('hidden', state < 2);
  mergePath.classList.toggle('hidden', state < 3);
  mergeNode.classList.toggle('hidden', state < 3);

  branchBtn.disabled = state !== 0;
  commitBtn.disabled = state !== 1;
  mergeBtn.disabled = state !== 2;

  if (state === 0) {
    simStatus.textContent = 'Estás en main. Todavía no hay una rama de trabajo.';
  } else if (state === 1) {
    simStatus.textContent = 'Creaste feature/login. Ahora podés trabajar sin modificar main.';
  } else if (state === 2) {
    simStatus.textContent = 'Tu rama ya tiene cambios propios. Está lista para revisarse y hacer merge.';
  } else {
    simStatus.textContent = 'Merge completado: los cambios de feature/login ya forman parte de main.';
  }
}

branchBtn.addEventListener('click', () => {
  state = 1;
  renderSimulation();
});

commitBtn.addEventListener('click', () => {
  state = 2;
  renderSimulation();
});

mergeBtn.addEventListener('click', () => {
  state = 3;
  renderSimulation();
});

resetBtn.addEventListener('click', () => {
  state = 0;
  renderSimulation();
});

renderSimulation();
