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
  caminho = [];

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
  gridContainer.style.gridTemplateRows = `repeat(${arrSize[0]}, 1fr)`;
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

  caminho[0] = [linOrigin, colOrigin];
  let vizinhos = [];
  let i = 0;
  let limite = 10;
  do {
    vizinhos = verificarVizinhosDisponiveis(caminho[i][0], caminho[i][1]);
    i++;
    caminho[i] = vizinhos[Math.floor(Math.random() * vizinhos.length)];
    console.log('Caminho escolhido: ' + caminho[i]);
    if (caminho[i][0] == destino[0] && caminho[i][1] == destino[1]) {
      alert('Chegou no destino');
      i = limite;
    } else if (i === limite)
      alert('Não conseguiu chegar no destino');
    // } while (caminho[i] != destino[0] && vizinhos.length > 0)
  } while (i < limite)
  printPath(caminho);

}

function verificarVizinhosDisponiveis(i, j) {

  let vizinhos = [];
  vizinhos[0] = [i - 1, j];//Norte
  vizinhos[1] = [i + 1, j];//Sul
  vizinhos[2] = [i, j + 1];//Leste
  vizinhos[3] = [i, j - 1];//Oeste
  console.log('vizinho[0]: ' + vizinhos[0] + ' Norte');
  console.log('vizinho[1]: ' + vizinhos[1] + ' Sul');
  console.log('vizinho[2]: ' + vizinhos[2] + ' Leste');
  console.log('vizinho[3]: ' + vizinhos[3] + ' Oeste');

  //Elimina vizinhos fora da borda
  for (let i = 0; i < vizinhos.length; i++)
    for (let j = 0; j < vizinhos[i].length; j++)
      if (vizinhos[i][j] < 1 || vizinhos[i][j] > arrSize[1]) {
        console.log('Fora da borda - vizinho[' + vizinhos[i] + ']');
        vizinhos.splice(i, 1);
        if (vizinhos.length - 1 < i)
          i--;
        console.log('novo vizinhos[' + i + ']: ' + vizinhos[i]);
      }

  //Só imprimir vizinhos no console para depuração e verificação
  console.log('Quantidade de vizinhos: ' + vizinhos.length);
  for (let i = 0; i < vizinhos.length; i++) {
    console.log('Vizinhos que estão dentro da borda: ' + vizinhos[i]);
  }

  for (let i = 0; i < caminho.length; i++) {
    console.log('Caminho percorrido: ' + caminho[i]);
  }

  //Elimina vizinhos que já estão em um caminho - ARRUMAR
  for (let i = 0; i < vizinhos.length; i++) {
    for (let j = 0; j < caminho.length; j++) {
      console.log('comparação do vizinho[' + i + ']: ' + vizinhos[i] + ' - caminho[' + j + ']: ' + caminho[j]);
      // console.log(typeof (parseInt(vizinhos[i])) + ' - ' + typeof (parseInt(caminho[j])));
      console.log(vizinhos[i]);
      console.log(caminho[j]);
      if (vizinhos[i][0] == caminho[j][0] && vizinhos[i][1] == caminho[j][1]) {
        console.log('vizinho eliminado: ' + vizinhos[i]);
        vizinhos.splice(i, 1);
        if (vizinhos.length - 1 < i)
          i--;
      }
    }
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
    caminho2[i].textContent = i;
  }
}

createGrid();

generateBtn.addEventListener('click', generatePath);