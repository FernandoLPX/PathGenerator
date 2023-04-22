const gridSize = document.getElementById("gridSize");
const gridContainer = document.getElementById('grid');
const generateBtn = document.getElementById('generate-btn');
var cellGrid = [];
var caminho = [];
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
  cellGrid = [];

  //Cria todas as células do grid
  for (let i = 0; i < arrSize[0]; i++) {
    for (let j = 0; j < arrSize[1]; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('id', 'cell-' + (i + 1) + '-' + (j + 1));
      gridContainer.appendChild(cell);
      cellGrid.push(cell);
      // console.log(cellGrid[i + j]);
    }
  }

  // Define o tamanho do grid
  gridContainer.style.gridTemplateColumns = `repeat(${arrSize[1]}, 1fr)`;
}

function generatePath() {
  createGrid();
  let linOrigin = 1;
  let colOrigin = 1;
  let linDestin = parseInt(arrSize[0]);
  let colDestin = parseInt(arrSize[1]);
  let destino = [linDestin, colDestin];
  selectOrigin(linOrigin, colOrigin, arrSize[1]);
  selectDestin(linDestin, colDestin, arrSize[1]);

  // console.log(cellGrid[cellGrid.length - 1]);


  caminho[0] = [linOrigin, colOrigin];
  let vizinhos = [];
  let i = 0;
  do {
    vizinhos = verificarVizinhosDisponiveis(caminho[i][0], caminho[i][1]);
    i++;
    caminho[i] = vizinhos[Math.floor(Math.random() * vizinhos.length)];
    console.log(caminho[i]);
    console.log(vizinhos.length);
    // } while (caminho[i] != destino[0] && vizinhos.length > 0)
  } while (i < 20)
  printPath(caminho);

}

function verificarVizinhosDisponiveis(i, j) {

  let vizinhos = [];
  vizinhos[0] = [i, j + 1];
  vizinhos[1] = [i, j - 1];
  vizinhos[2] = [i + 1, j];
  vizinhos[3] = [i - 1, j];

  //Elimina vizinhos fora da borda
  for (let i = 0; i < vizinhos.length; i++)
    for (let j = 0; j < vizinhos[i].length; j++)
      if (vizinhos[i][j] < 1 || vizinhos[i][j] > arrSize[1]) {
        // console.log("fora da borda - " + vizinhos[i][j]);
        vizinhos.splice(i, 1);
        i--;
      }

  //Elimina vizinhos que já estão em um caminho
  for (let i = 0; i < vizinhos.length; i++)
    for (let j = 0; j < caminho.length; j++)
      if (vizinhos[i] === caminho[j]) {
        vizinhos.splice(i, 1);
        i--;
      }

  // for (let i = 0; i < vizinhos.length; i++)
  //   console.log(vizinhos[i][0], vizinhos[i][1]);

  return vizinhos;
}

function selectOrigin(linha, coluna) {
  const cellOrigin = getCellByID(linha, coluna);
  cellOrigin.classList.add('start');
}

function selectDestin(linha, coluna) {
  const cellDestin = getCellByID(linha, coluna);
  cellDestin.classList.add('end');
}

function getCellByID(linha, coluna) {
  // let id = ((linha * colMax) - colMax + coluna) - 1;
  // return document.getElementById('cell-' + id);
  return document.getElementById('cell-' + linha + '-' + coluna);
}

function printPath(path) {
  let caminho2 = [];
  for (let i = 0; i < path.length; i++) {
    caminho2[i] = getCellByID(path[i][0], path[i][1]);
    caminho2[i].classList.add('path');
  }
}

createGrid();

generateBtn.addEventListener('click', generatePath);