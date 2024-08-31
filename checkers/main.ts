// interface Piece {
//   kinged: boolean;
//   color: string;
// }

// interface Square {
//   piece?: Piece;
//   playable: boolean;
// }

// const board: Square[][] = [
//   [
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//   ],
//   [
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//   ],
//   [
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//   ],
//   [
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//   ],
//   [
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//   ],
//   [
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//   ],
//   [
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//   ],
//   [
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//   ],
// ];

// // sets piece at endLocation to piece at startLocation, and deletes piece at startLocation
// function movePiece(startLocation: number[], endLocation: number[]): void {
//   if (board[startLocation[0]][startLocation[1]].piece !== undefined) {
//     const piece = board[startLocation[0]][startLocation[1]].piece;
//     board[endLocation[0]][endLocation[1]].piece = piece;
//     delete board[startLocation[0]][startLocation[1]].piece;
//   }
// }

// function takePiece(location: number[]): void {
//   if (board[location[0]][location[1]].piece !== undefined) {
//     delete board[location[0]][location[1]].piece;
//   }
// }

// // // has to be commented out until I figure out how to fix the typescript error
// // function kingPiece(location: number[]): void {
// //   if (board[location[0]][location[1]].piece) {
// //     board[location[0]][location[1]].piece.kinged = true;
// //   }
// // }

// // lots and lots of tests
// function canMoveWithoutTaking(
//   startLocation: number[],
//   endLocation: number[]
// ): boolean {
//   const piece = board[startLocation[0]][startLocation[1]].piece;
//   if (
//     !board[endLocation[0]][endLocation[1]].playable ||
//     !board[startLocation[0]][startLocation[1]].playable
//   ) {
//     return false;
//   } else if (
//     piece === undefined ||
//     board[endLocation[0]][endLocation[1]].piece !== undefined
//   ) {
//     return false;
//   }
//   const columns = [startLocation[1] + 1, startLocation[1] - 1];
//   const rows: number[] = [];
//   if (piece.kinged) {
//     rows.push(startLocation[0] + 1, startLocation[0] - 1);
//   } else {
//     const color = piece.color;
//     let direction;
//     if (color === 'red') {
//       direction = 1;
//     } else if (color === 'black') {
//       direction = -1;
//     } else {
//       console.log('ERROR: piece is neither black nor red');
//       return false;
//     }
//     rows.push(startLocation[0] + direction);
//   }
//   if (rows.includes(endLocation[0]) && columns.includes(endLocation[1])) {
//     return true;
//   } else {
//     return false;
//   }
// }

// // // work in progress
// // function canMoveIfTaking(
// //   startLocation: number[],
// //   endLocation: number[]
// // ): boolean {
// //   if (
// //     startLocation[0] - endLocation[0] !== 2 &&
// //     startLocation[0] - endLocation[0] !== -2
// //   ) {
// //     console.log('false because wrong row');
// //     return false;
// //   } else if (
// //     startLocation[1] - endLocation[1] !== 2 &&
// //     startLocation[1] - endLocation[1] !== -2
// //   ) {
// //     console.log('false because wrong column');
// //     return false;
// //   } else if (
// //     board[startLocation[0]][startLocation[1]].piece === undefined ||
// //     board[endLocation[0]][endLocation[1]].piece !== undefined
// //   ) {
// //     console.log('false because of empty start or full end');
// //     return false;
// //   } else {
// //     const pieceTaking = board[startLocation[0]][startLocation[1]].piece;
// //     const locationAttacked = [
// //       startLocation[0] + (startLocation[0] - endLocation[0]),
// //       startLocation[1] + (startLocation[1] - endLocation[1]),
// //     ];
// //     console.log('location attacked:', locationAttacked);
// //   }
// // }
