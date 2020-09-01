// function createBoard() {
//   let green = true;
//   let divIndex = 0;
//   for (let i = 0; i < 64; i++) {
//     let div = document.createElement("div");
//     div.classList.add(divIndex);
//     divIndex++;
//     if (i % 8 == 0) {
//       green = !green;
//     }
//     if (green) {
//       if (i % 2 == 0) {
//         div.classList.add("green");
//       } else {
//         div.classList.add("lightgreen");
//       }
//     } else {
//       if (i % 2 != 0) {
//         div.classList.add("green");
//       } else {
//         div.classList.add("lightgreen");
//       }
//     }
//     board.appendChild(div);
//   }
// }

// TURN OF COLOR

// for (let i = 0; i < cells.length; i++) {
//   cells[i].addEventListener("click", e => {
//     if (white_turn) {
//       white(e.currentTarget);
//       console.log(e.currentTarget);
//     } else {
//       black(e.currentTarget);
//     }
//   });
// }

// function white(cell_selected) {
//   if (cell_selected.classList.contains("white")) {
//     console.log("white");
//     UpdateBoard(currentBoard, grid);
//     white_turn = false;
//   }
// }
// function black(cell_selected) {
//   if (cell_selected.classList.contains("black")) {
//     console.log("black playing " + cell_selected);
//     UpdateBoard(currentBoard, grid);
//     white_turn = true;
//   }
// }

// function whitePlaying() {
//   console.log("white are playing");
// }
