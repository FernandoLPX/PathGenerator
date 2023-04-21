const gridSize = document.getElementById("gridSize");
const gridContainer = document.getElementById('grid');
const generateBtn = document.getElementById('generate-btn');
var cellGrid = [];
//Pega o tamanho do grid do combobox
let arrSize = gridSize.value.split("x");

gridSize.addEventListener("change", updateGrid);
function updateGrid() {

  //atualizar array sempre que mudar o combobox
  arrSize = gridSize.value.split("x");

  // createGrid();

  // const gridContainer = document.querySelector(".grid-container");
  // const gridCols = this.value;

  // gridContainer.style.gridTemplateColumns = `repeat(${gridCols}, 1fr)`;
}

// Cria o grid
function createGrid() {
  // Limpa o grid existente
  gridContainer.innerHTML = '';

  //Cria todas as células do grid
  for (let i = 0; i < arrSize[0] * arrSize[1]; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', 'cell-' + i);
    gridContainer.appendChild(cell);
    cellGrid.push(cell);
  }

  // Define o tamanho do grid
  gridContainer.style.gridTemplateColumns = `repeat(${arrSize[1]}, 1fr)`;
}

function generatePath() {
  createGrid();
  let linOrigin = 1;
  let colOrigin = 1;
  let linDestin = parseInt(arrSize[0]);
  let coldestin = parseInt(arrSize[1]);
  selectOrigin(linOrigin, colOrigin, arrSize[1]);
  selectDestin(linDestin, coldestin, arrSize[1]);

  
}

function selectOrigin(linha, coluna, colMax) {
  const cellOrigin = getCellID(linha, coluna, colMax);
  cellOrigin.classList.add('start');
}

function selectDestin(linha, coluna, colMax) {
  const cellDestin = getCellID(linha, coluna, colMax);
  cellDestin.classList.add('end');
}

function getCellID(linha, coluna, colMax) {
  let id = ((linha * colMax) - colMax + coluna) - 1;
  id = document.getElementById('cell-' + id);
  return id;
}

createGrid();

generateBtn.addEventListener('click', generatePath);