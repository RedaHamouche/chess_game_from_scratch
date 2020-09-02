const board = document.querySelector("#board");
const player_display = document.querySelector(".player_turn");
let grid;
function createBoard() {
  let green = true;
  for (let i = 0; i < 8; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let y = 0; y < 8; y++) {
      let column = document.createElement("div");
      column.classList.add("column");
      row.appendChild(column);
    }
    board.appendChild(row);
  }

  let columns = document.querySelectorAll(".row div");
  grid = document.querySelectorAll(".row div");
  for (let i = 0; i < columns.length; i++) {
    if (i % 8 == 0) {
      green = !green;
    }
    if (green) {
      if (i % 2 == 0) {
        columns[i].classList.add("green");
      } else {
        columns[i].classList.add("lightgreen");
      }
    } else {
      if (i % 2 != 0) {
        columns[i].classList.add("green");
      } else {
        columns[i].classList.add("lightgreen");
      }
    }
  }
}
createBoard();

// 0 = nothing
// 1 = pons
// 2 = horse
// 3 = bishop
// 4 = rock
// 5 = queen
// 6 = king
// let currentBoard;

let currentBoard = [
  [14, 12, 13, 15, 16, 13, 12, 14],
  [11, 11, 11, 11, 11, 11, 11, 11],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [4, 2, 3, 5, 6, 3, 2, 4]
];

function InitBoard(board, element) {
  let cells = element;
  let rows = 8;
  let columns = 8;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      element = cells[row * 8 + column];
      let classEl = InitClass(board[row][column]);
      if (classEl) element.classList.add(classEl);
    }
  }
}

function InitClass(x) {
  let res;

  switch (x) {
    case 0:
      break;

    case 1:
      res = "white";
      break;

    case 2:
      res = "white";
      break;

    case 3:
      res = "white";
      break;

    case 4:
      res = "white";
      break;

    case 5:
      res = "white";
      break;

    case 6:
      res = "white";
      break;

    case 11:
      res = "black";
      break;
    case 12:
      res = "black";
      break;
    case 13:
      res = "black";
      break;
    case 14:
      res = "black";
      break;
    case 15:
      res = "black";
      break;
    case 16:
      res = "black";
      break;

    default:
      break;
  }
  return res;
}

InitBoard(currentBoard, grid);

function UpdateBoard(board, element) {
  let cells = element;
  let rows = 8;
  let columns = 8;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      element = cells[row * 8 + column];
      let classEl = getClass(board[row][column]);
      if (classEl) {
        element.classList.add(classEl);
      }
      if (classEl == "blank") {
        element.classList.add("blank");
      } else {
        element.classList.remove("blank");
      }
    }
  }
}
UpdateBoard(currentBoard, grid);

function getClass(x) {
  let res;

  switch (x) {
    case 0:
      res = "blank";
      break;

    case 1:
      res = "white_pons";
      break;

    case 2:
      res = "white_horse";
      break;

    case 3:
      res = "white_bishop";
      break;

    case 4:
      res = "white_rock";
      break;

    case 5:
      res = "white_queen";
      break;

    case 6:
      res = "white_king";
      break;

    case 11:
      res = "black_pons";
      break;
    case 12:
      res = "black_horse";
      break;
    case 13:
      res = "black_bishop";
      break;
    case 14:
      res = "black_rock";
      break;
    case 15:
      res = "black_queen";
      break;
    case 16:
      res = "black_king";
      break;

    default:
      break;
  }
  return res;
}

// Where the rules starts

const game = () => {
  // let cells = grid;
  let white_turn = true;
  let pons_selected = null;
  let previousX;
  let previousY;
  let OldNode;
  for (let x = 0; x < board.childNodes.length; x++) {
    let rowNodes = board.childNodes[x];
    for (let y = 0; y < rowNodes.childNodes.length; y++) {
      let colNodes = rowNodes.childNodes[y];
      colNodes.addEventListener("click", e => {
        if (white_turn) {
          if (pons_selected == null) {
            OldNode = rowNodes.childNodes[y];

            white_selection(colNodes);
            previousX = x;
            previousY = y;
          } else {
            OldNode.classList.remove("selected");

            move(OldNode, colNodes, pons_selected, x, y, previousX, previousY);
          }
        } else {
          player_display.innerText = "Black turn";
          if (pons_selected == null) {
            OldNode = rowNodes.childNodes[y];
            black_selection(colNodes, x, y);
            previousX = x;
            previousY = y;
          } else {
            OldNode.classList.remove("selected");
            move(OldNode, colNodes, pons_selected, x, y, previousX, previousY);
          }
        }
      });
    }
  }

  function white_selection(pons) {
    if (
      !pons.classList.contains("blank") &&
      !pons.classList.contains("black")
    ) {
      pons.classList.add("selected");
    }

    if (pons.classList.contains("white_pons")) {
      pons_selected = 1;
    } else if (pons.classList.contains("white_horse")) {
      pons_selected = 2;
    } else if (pons.classList.contains("white_bishop")) {
      pons_selected = 3;
    } else if (pons.classList.contains("white_rock")) {
      pons_selected = 4;
    } else if (pons.classList.contains("white_queen")) {
      pons_selected = 5;
    } else if (pons.classList.contains("white_king")) {
      pons_selected = 6;
    }
  }

  function black_selection(pons) {
    if (
      !pons.classList.contains("blank") &&
      !pons.classList.contains("white")
    ) {
      pons.classList.add("selected");
    }

    if (pons.classList.contains("black_pons")) {
      pons_selected = 11;
    } else if (pons.classList.contains("black_horse")) {
      pons_selected = 12;
    } else if (pons.classList.contains("black_bishop")) {
      pons_selected = 13;
    } else if (pons.classList.contains("black_rock")) {
      pons_selected = 14;
    } else if (pons.classList.contains("black_queen")) {
      pons_selected = 15;
    } else if (pons.classList.contains("black_king")) {
      pons_selected = 16;
    }
  }
  function move(OldNode, html, pons, x, y, previousX, previousY) {
    // currentBoard[x][y] = pons;
    // currentBoard[previousX][previousY] = 0;
    switch (pons) {
      case 0:
        break;
      case 1:
        moveWhitePons(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "white", "white_pons");
        break;
      case 2:
        moveWhiteHorse(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "white", "white_horse");
        break;
      case 3:
        moveWhiteBishop(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "white", "white_bishop");
        break;
      case 4:
        moveWhiteRock(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "white", "white_rock");
        break;
      case 5:
        moveWhiteQueen(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "white", "white_queen");
        break;
      case 6:
        moveWhiteKing(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "white", "white_king");
        break;
      case 11:
        moveBlackPons(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "black", "black_pons");
        break;
      case 12:
        moveBlackHorse(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "black", "black_horse");
        break;
      case 13:
        moveBlackBishop(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "black", "black_bishop");
        break;
      case 14:
        moveBlackRock(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "black", "black_rock");
        break;
      case 15:
        moveBlackQueen(html, pons, x, y, previousX, previousY);
        removeOld(OldNode, "black", "black_queen");
        break;
      case 16:
        moveBlackKing(pons, x, y, previousX, previousY);
        removeOld(OldNode, "black", "black_king");
        break;
      default:
        break;
    }

    UpdateBoard(currentBoard, grid);
    pons_selected = null;
  }

  // UTILITIES

  function isWhite(color) {
    if (
      color == 1 ||
      color == 2 ||
      color == 3 ||
      color == 4 ||
      color == 5 ||
      color == 6
    ) {
      return true;
    } else if (
      color == 11 ||
      color == 12 ||
      color == 13 ||
      color == 14 ||
      color == 15 ||
      color == 16
    ) {
      return false;
    } else {
      return null;
    }
  }

  function removeOld(oldNode, color, pons_class) {
    oldNode.classList.remove(color);
    oldNode.classList.remove(pons_class);
  }
  const removeWhite = html => {
    html.classList.remove("white");
    html.classList.remove("white_pons");
    html.classList.remove("white_horse");
    html.classList.remove("white_bishop");
    html.classList.remove("white_rock");
    html.classList.remove("white_queen");
    html.classList.remove("white_king");
    html.classList.remove("selected");
    html.classList.remove("blank");
    html.classList.add("black");
    UpdateBoard(currentBoard, grid);
  };
  const removeBlack = html => {
    html.classList.remove("black");
    html.classList.remove("black_pons");
    html.classList.remove("black_horse");
    html.classList.remove("black_bishop");
    html.classList.remove("black_rock");
    html.classList.remove("black_queen");
    html.classList.remove("black_king");
    html.classList.remove("selected");
    html.classList.remove("blank");
    html.classList.add("white");
    UpdateBoard(currentBoard, grid);
  };

  function updatePons(color, pons, x, y, previousX, previousY) {
    currentBoard[previousX][previousY] = 0;
    currentBoard[x][y] = pons;
    if (color === "white") {
      player_display.innerText = "Black turn";
    }
    if (color === "black") {
      player_display.innerText = "White turn";
    }
    white_turn = !white_turn;
  }

  // END OF UTILITIES

  // WHITE
  function moveWhitePons(html, pons, x, y, previousX, previousY) {
    const moveForward = () => {
      updatePons("white", pons, x, y, previousX, previousY);
      removeBlack(html);
    };
    const moveEat = () => {
      updatePons("white", pons, x, y, previousX, previousY);
      removeBlack(html);
    };

    const moveBegining = () => {
      updatePons("white", pons, x, y, previousX, previousY);
      removeBlack(html);
    };

    if (y == previousY && previousX > x) {
      if (previousX != 6 && previousX - 1 <= x && currentBoard[x][y] == 0) {
        moveForward();
      } else if (previousX == 6 && previousX - 2 <= x) {
        moveBegining();
      }
    } else if (
      (y - 1 == previousY || y + 1 == previousY) &&
      previousX > x &&
      isWhite(currentBoard[x][y]) == false
    ) {
      moveEat();
    }
  }

  function moveWhiteHorse(html, pons, x, y, previousX, previousY) {
    const move = () => {
      updatePons("white", pons, x, y, previousX, previousY);
      removeBlack(html);
    };
    if (
      isWhite(currentBoard[x][y]) == false ||
      isWhite(currentBoard[x][y]) == null
    ) {
      if (
        (x - 2 == previousX || x + 2 == previousX) &&
        (y - 1 == previousY || y + 1 == previousY)
      ) {
        move();
      } else if (
        (y - 2 == previousY || y + 2 == previousY) &&
        (x - 1 == previousX || x + 1 == previousX)
      ) {
        move();
      }
    }
  }
  function moveWhiteBishop(html, pons, x, y, previousX, previousY) {
    const move = () => {
      updatePons("white", pons, x, y, previousX, previousY);
      removeBlack(html);
    };
    // console.log(previousX);
    // console.log(previousY);

    // LEFT UP CHECK

    if (x < previousX && y < previousY) {
      let i = 0;
      let possibleTopLeft;
      while (i < 8) {
        console.log(i);
        i++;
        if (previousX - i < 0 || previousY - i < 0) {
          possibleTopLeft = true;
          i = 8;
          return;
        }
        if (isWhite(currentBoard[previousX - i][previousY - i]) == true) {
          possibleTopLeft = false;
          return;
        } else {
          possibleTopLeft = true;
        }
      }

      if (possibleTopLeft) {
        move();
      }
    }
  }
  function moveWhiteRock(html, pons, x, y, previousX, previousY) {
    let possibleLeft;
    let possibleTop = true;
    let possibleRight;
    let possibleBottom;
    let limitX;
    let limitY;
    const move = () => {
      updatePons("white", pons, x, y, previousX, previousY);
      removeBlack(html);
    };

    // TOP CHECK
    if (x < previousX && y == previousY) {
      for (let i = previousX - 1; i >= x; i--) {
        if (isWhite(currentBoard[i][y]) == false) {
          limitX = i;
          break;
        }
        if (isWhite(currentBoard[i][y]) == true) {
          possibleTop = false;
          break;
        }
      }
      if (x < limitX) {
        possibleTop = false;
      }
      if (possibleTop) {
        move();
      }
    }
  }
  function moveWhiteQueen(html, pons, x, y, previousX, previousY) {}
  function moveWhiteKing(html, pons, x, y, previousX, previousY) {}

  // BLACK
  function moveBlackPons(html, pons, x, y, previousX, previousY) {
    const moveForward = () => {
      updatePons("black", pons, x, y, previousX, previousY);
      removeWhite(html);
    };
    const moveEat = () => {
      updatePons("black", pons, x, y, previousX, previousY);
      removeWhite(html);
    };
    const moveBegining = () => {
      updatePons("black", pons, x, y, previousX, previousY);
    };
    if (y == previousY && previousX < x) {
      if (previousX != 1 && previousX + 1 >= x && currentBoard[x][y] == 0) {
        moveForward();
      } else if (previousX == 1 && previousX + 2 >= x) {
        moveBegining();
      }
    } else if (
      (y - 1 == previousY || y + 1 == previousY) &&
      previousX < x &&
      isWhite(currentBoard[x][y]) == true
    ) {
      moveEat();
    }
  }
  function moveBlackHorse(html, pons, x, y, previousX, previousY) {
    const move = () => {
      updatePons("black", pons, x, y, previousX, previousY);
      removeWhite(html);
    };
    if (
      isWhite(currentBoard[x][y]) == true ||
      isWhite(currentBoard[x][y]) == null
    ) {
      if (
        (x - 2 == previousX || x + 2 == previousX) &&
        (y - 1 == previousY || y + 1 == previousY)
      ) {
        move();
      } else if (
        (y - 2 == previousY || y + 2 == previousY) &&
        (x - 1 == previousX || x + 1 == previousX)
      ) {
        move();
      }
    }
  }
  function moveBlackBishop(html, pons, x, y, previousX, previousY) {
    return;
    const move = () => {
      updatePons("black", pons, x, y, previousX, previousY);
      removeWhite(html);
    };

    for (let i = 0; i < 8; i++) {
      if (
        (isWhite(currentBoard[x - i][y - i]) == true ||
          isWhite(currentBoard[x - i][y - i]) == null) &&
        y != previousY
      ) {
        if (y + i == previousY && x + i == previousX) {
          move();
        } else if (y - i == previousY && x + i == previousX) {
          move();
        } else if (y - i == previousY && x - i == previousX) {
          move();
        } else if (y + i == previousY && x - i == previousX) {
          move();
        }
      }
    }
  }
  function moveBlackRock(html, pons, x, y, previousX, previousY) {}
  function moveBlackQueen(html, pons, x, y, previousX, previousY) {}
  function moveBlackKing(html, pons, x, y, previousX, previousY) {}
};

game();
