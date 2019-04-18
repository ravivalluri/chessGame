(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["position-position-module"],{

/***/ "./node_modules/chess.js/chess.js":
/*!****************************************!*\
  !*** ./node_modules/chess.js/chess.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Copyright (c) 2016, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/

/* minified license below  */

/* @license
 * Copyright (c) 2016, Jeff Hlywa (jhlywa@gmail.com)
 * Released under the BSD license
 * https://github.com/jhlywa/chess.js/blob/master/LICENSE
 */

var Chess = function(fen) {

  /* jshint indent: false */

  var BLACK = 'b';
  var WHITE = 'w';

  var EMPTY = -1;

  var PAWN = 'p';
  var KNIGHT = 'n';
  var BISHOP = 'b';
  var ROOK = 'r';
  var QUEEN = 'q';
  var KING = 'k';

  var SYMBOLS = 'pnbrqkPNBRQK';

  var DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  var POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*'];

  var PAWN_OFFSETS = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15]
  };

  var PIECE_OFFSETS = {
    n: [-18, -33, -31, -14,  18, 33, 31,  14],
    b: [-17, -15,  17,  15],
    r: [-16,   1,  16,  -1],
    q: [-17, -16, -15,   1,  17, 16, 15,  -1],
    k: [-17, -16, -15,   1,  17, 16, 15,  -1]
  };

  var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];

  var RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];

  var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };

  var FLAGS = {
    NORMAL: 'n',
    CAPTURE: 'c',
    BIG_PAWN: 'b',
    EP_CAPTURE: 'e',
    PROMOTION: 'p',
    KSIDE_CASTLE: 'k',
    QSIDE_CASTLE: 'q'
  };

  var BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64
  };

  var RANK_1 = 7;
  var RANK_2 = 6;
  var RANK_3 = 5;
  var RANK_4 = 4;
  var RANK_5 = 3;
  var RANK_6 = 2;
  var RANK_7 = 1;
  var RANK_8 = 0;

  var SQUARES = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };

  var ROOKS = {
    w: [{square: SQUARES.a1, flag: BITS.QSIDE_CASTLE},
        {square: SQUARES.h1, flag: BITS.KSIDE_CASTLE}],
    b: [{square: SQUARES.a8, flag: BITS.QSIDE_CASTLE},
        {square: SQUARES.h8, flag: BITS.KSIDE_CASTLE}]
  };

  var board = new Array(128);
  var kings = {w: EMPTY, b: EMPTY};
  var turn = WHITE;
  var castling = {w: 0, b: 0};
  var ep_square = EMPTY;
  var half_moves = 0;
  var move_number = 1;
  var history = [];
  var header = {};

  /* if the user passes in a fen string, load it, else default to
   * starting position
   */
  if (typeof fen === 'undefined') {
    load(DEFAULT_POSITION);
  } else {
    load(fen);
  }

  function clear() {
    board = new Array(128);
    kings = {w: EMPTY, b: EMPTY};
    turn = WHITE;
    castling = {w: 0, b: 0};
    ep_square = EMPTY;
    half_moves = 0;
    move_number = 1;
    history = [];
    header = {};
    update_setup(generate_fen());
  }

  function reset() {
    load(DEFAULT_POSITION);
  }

  function load(fen) {
    var tokens = fen.split(/\s+/);
    var position = tokens[0];
    var square = 0;

    if (!validate_fen(fen).valid) {
      return false;
    }

    clear();

    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i);

      if (piece === '/') {
        square += 8;
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10);
      } else {
        var color = (piece < 'a') ? WHITE : BLACK;
        put({type: piece.toLowerCase(), color: color}, algebraic(square));
        square++;
      }
    }

    turn = tokens[1];

    if (tokens[2].indexOf('K') > -1) {
      castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('Q') > -1) {
      castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf('k') > -1) {
      castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('q') > -1) {
      castling.b |= BITS.QSIDE_CASTLE;
    }

    ep_square = (tokens[3] === '-') ? EMPTY : SQUARES[tokens[3]];
    half_moves = parseInt(tokens[4], 10);
    move_number = parseInt(tokens[5], 10);

    update_setup(generate_fen());

    return true;
  }

  /* TODO: this function is pretty much crap - it validates structure but
   * completely ignores content (e.g. doesn't verify that each side has a king)
   * ... we should rewrite this, and ditch the silly error_number field while
   * we're at it
   */
  function validate_fen(fen) {
    var errors = {
       0: 'No errors.',
       1: 'FEN string must contain six space-delimited fields.',
       2: '6th field (move number) must be a positive integer.',
       3: '5th field (half move counter) must be a non-negative integer.',
       4: '4th field (en-passant square) is invalid.',
       5: '3rd field (castling availability) is invalid.',
       6: '2nd field (side to move) is invalid.',
       7: '1st field (piece positions) does not contain 8 \'/\'-delimited rows.',
       8: '1st field (piece positions) is invalid [consecutive numbers].',
       9: '1st field (piece positions) is invalid [invalid piece].',
      10: '1st field (piece positions) is invalid [row too large].',
      11: 'Illegal en-passant square',
    };

    /* 1st criterion: 6 space-seperated fields? */
    var tokens = fen.split(/\s+/);
    if (tokens.length !== 6) {
      return {valid: false, error_number: 1, error: errors[1]};
    }

    /* 2nd criterion: move number field is a integer value > 0? */
    if (isNaN(tokens[5]) || (parseInt(tokens[5], 10) <= 0)) {
      return {valid: false, error_number: 2, error: errors[2]};
    }

    /* 3rd criterion: half move counter is an integer >= 0? */
    if (isNaN(tokens[4]) || (parseInt(tokens[4], 10) < 0)) {
      return {valid: false, error_number: 3, error: errors[3]};
    }

    /* 4th criterion: 4th field is a valid e.p.-string? */
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return {valid: false, error_number: 4, error: errors[4]};
    }

    /* 5th criterion: 3th field is a valid castle-string? */
    if( !/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return {valid: false, error_number: 5, error: errors[5]};
    }

    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
    if (!/^(w|b)$/.test(tokens[1])) {
      return {valid: false, error_number: 6, error: errors[6]};
    }

    /* 7th criterion: 1st field contains 8 rows? */
    var rows = tokens[0].split('/');
    if (rows.length !== 8) {
      return {valid: false, error_number: 7, error: errors[7]};
    }

    /* 8th criterion: every row is valid? */
    for (var i = 0; i < rows.length; i++) {
      /* check for right sum of fields AND not two numbers in succession */
      var sum_fields = 0;
      var previous_was_number = false;

      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return {valid: false, error_number: 8, error: errors[8]};
          }
          sum_fields += parseInt(rows[i][k], 10);
          previous_was_number = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return {valid: false, error_number: 9, error: errors[9]};
          }
          sum_fields += 1;
          previous_was_number = false;
        }
      }
      if (sum_fields !== 8) {
        return {valid: false, error_number: 10, error: errors[10]};
      }
    }

    if ((tokens[3][1] == '3' && tokens[1] == 'w') ||
        (tokens[3][1] == '6' && tokens[1] == 'b')) {
          return {valid: false, error_number: 11, error: errors[11]};
    }

    /* everything's okay! */
    return {valid: true, error_number: 0, error: errors[0]};
  }

  function generate_fen() {
    var empty = 0;
    var fen = '';

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        var color = board[i].color;
        var piece = board[i].type;

        fen += (color === WHITE) ?
                 piece.toUpperCase() : piece.toLowerCase();
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty;
        }

        if (i !== SQUARES.h1) {
          fen += '/';
        }

        empty = 0;
        i += 8;
      }
    }

    var cflags = '';
    if (castling[WHITE] & BITS.KSIDE_CASTLE) { cflags += 'K'; }
    if (castling[WHITE] & BITS.QSIDE_CASTLE) { cflags += 'Q'; }
    if (castling[BLACK] & BITS.KSIDE_CASTLE) { cflags += 'k'; }
    if (castling[BLACK] & BITS.QSIDE_CASTLE) { cflags += 'q'; }

    /* do we have an empty castling flag? */
    cflags = cflags || '-';
    var epflags = (ep_square === EMPTY) ? '-' : algebraic(ep_square);

    return [fen, turn, cflags, epflags, half_moves, move_number].join(' ');
  }

  function set_header(args) {
    for (var i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' &&
          typeof args[i + 1] === 'string') {
        header[args[i]] = args[i + 1];
      }
    }
    return header;
  }

  /* called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN is
   * equal to the default position, the SetUp and FEN are deleted
   * the setup is only updated if history.length is zero, ie moves haven't been
   * made.
   */
  function update_setup(fen) {
    if (history.length > 0) return;

    if (fen !== DEFAULT_POSITION) {
      header['SetUp'] = '1';
      header['FEN'] = fen;
    } else {
      delete header['SetUp'];
      delete header['FEN'];
    }
  }

  function get(square) {
    var piece = board[SQUARES[square]];
    return (piece) ? {type: piece.type, color: piece.color} : null;
  }

  function put(piece, square) {
    /* check for valid piece object */
    if (!('type' in piece && 'color' in piece)) {
      return false;
    }

    /* check for piece */
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false;
    }

    /* check for valid square */
    if (!(square in SQUARES)) {
      return false;
    }

    var sq = SQUARES[square];

    /* don't let the user place more than one king */
    if (piece.type == KING &&
        !(kings[piece.color] == EMPTY || kings[piece.color] == sq)) {
      return false;
    }

    board[sq] = {type: piece.type, color: piece.color};
    if (piece.type === KING) {
      kings[piece.color] = sq;
    }

    update_setup(generate_fen());

    return true;
  }

  function remove(square) {
    var piece = get(square);
    board[SQUARES[square]] = null;
    if (piece && piece.type === KING) {
      kings[piece.color] = EMPTY;
    }

    update_setup(generate_fen());

    return piece;
  }

  function build_move(board, from, to, flags, promotion) {
    var move = {
      color: turn,
      from: from,
      to: to,
      flags: flags,
      piece: board[from].type
    };

    if (promotion) {
      move.flags |= BITS.PROMOTION;
      move.promotion = promotion;
    }

    if (board[to]) {
      move.captured = board[to].type;
    } else if (flags & BITS.EP_CAPTURE) {
        move.captured = PAWN;
    }
    return move;
  }

  function generate_moves(options) {
    function add_move(board, moves, from, to, flags) {
      /* if pawn promotion */
      if (board[from].type === PAWN &&
         (rank(to) === RANK_8 || rank(to) === RANK_1)) {
          var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
          for (var i = 0, len = pieces.length; i < len; i++) {
            moves.push(build_move(board, from, to, flags, pieces[i]));
          }
      } else {
       moves.push(build_move(board, from, to, flags));
      }
    }

    var moves = [];
    var us = turn;
    var them = swap_color(us);
    var second_rank = {b: RANK_7, w: RANK_2};

    var first_sq = SQUARES.a8;
    var last_sq = SQUARES.h1;
    var single_square = false;

    /* do we want legal moves? */
    var legal = (typeof options !== 'undefined' && 'legal' in options) ?
                options.legal : true;

    /* are we generating moves for a single square? */
    if (typeof options !== 'undefined' && 'square' in options) {
      if (options.square in SQUARES) {
        first_sq = last_sq = SQUARES[options.square];
        single_square = true;
      } else {
        /* invalid square */
        return [];
      }
    }

    for (var i = first_sq; i <= last_sq; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) { i += 7; continue; }

      var piece = board[i];
      if (piece == null || piece.color !== us) {
        continue;
      }

      if (piece.type === PAWN) {
        /* single square, non-capturing */
        var square = i + PAWN_OFFSETS[us][0];
        if (board[square] == null) {
            add_move(board, moves, i, square, BITS.NORMAL);

          /* double square */
          var square = i + PAWN_OFFSETS[us][1];
          if (second_rank[us] === rank(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS.BIG_PAWN);
          }
        }

        /* pawn captures */
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j];
          if (square & 0x88) continue;

          if (board[square] != null &&
              board[square].color === them) {
              add_move(board, moves, i, square, BITS.CAPTURE);
          } else if (square === ep_square) {
              add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
          }
        }
      } else {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j];
          var square = i;

          while (true) {
            square += offset;
            if (square & 0x88) break;

            if (board[square] == null) {
              add_move(board, moves, i, square, BITS.NORMAL);
            } else {
              if (board[square].color === us) break;
              add_move(board, moves, i, square, BITS.CAPTURE);
              break;
            }

            /* break, if knight or king */
            if (piece.type === 'n' || piece.type === 'k') break;
          }
        }
      }
    }

    /* check for castling if: a) we're generating all moves, or b) we're doing
     * single square move generation on the king's square
     */
    if ((!single_square) || last_sq === kings[us]) {
      /* king-side castling */
      if (castling[us] & BITS.KSIDE_CASTLE) {
        var castling_from = kings[us];
        var castling_to = castling_from + 2;

        if (board[castling_from + 1] == null &&
            board[castling_to]       == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from + 1) &&
            !attacked(them, castling_to)) {
          add_move(board, moves, kings[us] , castling_to,
                   BITS.KSIDE_CASTLE);
        }
      }

      /* queen-side castling */
      if (castling[us] & BITS.QSIDE_CASTLE) {
        var castling_from = kings[us];
        var castling_to = castling_from - 2;

        if (board[castling_from - 1] == null &&
            board[castling_from - 2] == null &&
            board[castling_from - 3] == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from - 1) &&
            !attacked(them, castling_to)) {
          add_move(board, moves, kings[us], castling_to,
                   BITS.QSIDE_CASTLE);
        }
      }
    }

    /* return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal) {
      return moves;
    }

    /* filter out illegal moves */
    var legal_moves = [];
    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(us)) {
        legal_moves.push(moves[i]);
      }
      undo_move();
    }

    return legal_moves;
  }

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} sloppy Use the sloppy SAN generator to work around over
   * disambiguation bugs in Fritz and Chessbase.  See below:
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */
  function move_to_san(move, sloppy) {

    var output = '';

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O';
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O';
    } else {
      var disambiguator = get_disambiguator(move, sloppy);

      if (move.piece !== PAWN) {
        output += move.piece.toUpperCase() + disambiguator;
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0];
        }
        output += 'x';
      }

      output += algebraic(move.to);

      if (move.flags & BITS.PROMOTION) {
        output += '=' + move.promotion.toUpperCase();
      }
    }

    make_move(move);
    if (in_check()) {
      if (in_checkmate()) {
        output += '#';
      } else {
        output += '+';
      }
    }
    undo_move();

    return output;
  }

  // parses all of the decorators out of a SAN string
  function stripped_san(move) {
    return move.replace(/=/,'').replace(/[+#]?[?!]*$/,'');
  }

  function attacked(color, square) {
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) { i += 7; continue; }

      /* if empty square or wrong color */
      if (board[i] == null || board[i].color !== color) continue;

      var piece = board[i];
      var difference = i - square;
      var index = difference + 119;

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) return true;
          } else {
            if (piece.color === BLACK) return true;
          }
          continue;
        }

        /* if the piece is a knight or a king */
        if (piece.type === 'n' || piece.type === 'k') return true;

        var offset = RAYS[index];
        var j = i + offset;

        var blocked = false;
        while (j !== square) {
          if (board[j] != null) { blocked = true; break; }
          j += offset;
        }

        if (!blocked) return true;
      }
    }

    return false;
  }

  function king_attacked(color) {
    return attacked(swap_color(color), kings[color]);
  }

  function in_check() {
    return king_attacked(turn);
  }

  function in_checkmate() {
    return in_check() && generate_moves().length === 0;
  }

  function in_stalemate() {
    return !in_check() && generate_moves().length === 0;
  }

  function insufficient_material() {
    var pieces = {};
    var bishops = [];
    var num_pieces = 0;
    var sq_color = 0;

    for (var i = SQUARES.a8; i<= SQUARES.h1; i++) {
      sq_color = (sq_color + 1) % 2;
      if (i & 0x88) { i += 7; continue; }

      var piece = board[i];
      if (piece) {
        pieces[piece.type] = (piece.type in pieces) ?
                              pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(sq_color);
        }
        num_pieces++;
      }
    }

    /* k vs. k */
    if (num_pieces === 2) { return true; }

    /* k vs. kn .... or .... k vs. kb */
    else if (num_pieces === 3 && (pieces[BISHOP] === 1 ||
                                 pieces[KNIGHT] === 1)) { return true; }

    /* kb vs. kb where any number of bishops are all on the same color */
    else if (num_pieces === pieces[BISHOP] + 2) {
      var sum = 0;
      var len = bishops.length;
      for (var i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) { return true; }
    }

    return false;
  }

  function in_threefold_repetition() {
    /* TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the make_move/undo_move functions,
     * avoiding the costly that we do below.
     */
    var moves = [];
    var positions = {};
    var repetition = false;

    while (true) {
      var move = undo_move();
      if (!move) break;
      moves.push(move);
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      var fen = generate_fen().split(' ').slice(0,4).join(' ');

      /* has the position occurred three or move times */
      positions[fen] = (fen in positions) ? positions[fen] + 1 : 1;
      if (positions[fen] >= 3) {
        repetition = true;
      }

      if (!moves.length) {
        break;
      }
      make_move(moves.pop());
    }

    return repetition;
  }

  function push(move) {
    history.push({
      move: move,
      kings: {b: kings.b, w: kings.w},
      turn: turn,
      castling: {b: castling.b, w: castling.w},
      ep_square: ep_square,
      half_moves: half_moves,
      move_number: move_number
    });
  }

  function make_move(move) {
    var us = turn;
    var them = swap_color(us);
    push(move);

    board[move.to] = board[move.from];
    board[move.from] = null;

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null;
      } else {
        board[move.to + 16] = null;
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags & BITS.PROMOTION) {
      board[move.to] = {type: move.promotion, color: us};
    }

    /* if we moved the king */
    if (board[move.to].type === KING) {
      kings[board[move.to].color] = move.to;

      /* if we castled, move the rook next to the king */
      if (move.flags & BITS.KSIDE_CASTLE) {
        var castling_to = move.to - 1;
        var castling_from = move.to + 1;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        var castling_to = move.to + 1;
        var castling_from = move.to - 2;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      }

      /* turn off castling */
      castling[us] = '';
    }

    /* turn off castling if we move a rook */
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (move.from === ROOKS[us][i].square &&
            castling[us] & ROOKS[us][i].flag) {
          castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (castling[them]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (move.to === ROOKS[them][i].square &&
            castling[them] & ROOKS[them][i].flag) {
          castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === 'b') {
        ep_square = move.to - 16;
      } else {
        ep_square = move.to + 16;
      }
    } else {
      ep_square = EMPTY;
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      half_moves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0;
    } else {
      half_moves++;
    }

    if (turn === BLACK) {
      move_number++;
    }
    turn = swap_color(turn);
  }

  function undo_move() {
    var old = history.pop();
    if (old == null) { return null; }

    var move = old.move;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    ep_square = old.ep_square;
    half_moves = old.half_moves;
    move_number = old.move_number;

    var us = turn;
    var them = swap_color(turn);

    board[move.from] = board[move.to];
    board[move.from].type = move.piece;  // to undo any promotions
    board[move.to] = null;

    if (move.flags & BITS.CAPTURE) {
      board[move.to] = {type: move.captured, color: them};
    } else if (move.flags & BITS.EP_CAPTURE) {
      var index;
      if (us === BLACK) {
        index = move.to - 16;
      } else {
        index = move.to + 16;
      }
      board[index] = {type: PAWN, color: them};
    }


    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      var castling_to, castling_from;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castling_to = move.to + 1;
        castling_from = move.to - 1;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castling_to = move.to - 2;
        castling_from = move.to + 1;
      }

      board[castling_to] = board[castling_from];
      board[castling_from] = null;
    }

    return move;
  }

  /* this function is used to uniquely identify ambiguous moves */
  function get_disambiguator(move, sloppy) {
    var moves = generate_moves({legal: !sloppy});

    var from = move.from;
    var to = move.to;
    var piece = move.piece;

    var ambiguities = 0;
    var same_rank = 0;
    var same_file = 0;

    for (var i = 0, len = moves.length; i < len; i++) {
      var ambig_from = moves[i].from;
      var ambig_to = moves[i].to;
      var ambig_piece = moves[i].piece;

      /* if a move of the same piece type ends on the same to square, we'll
       * need to add a disambiguator to the algebraic notation
       */
      if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
        ambiguities++;

        if (rank(from) === rank(ambig_from)) {
          same_rank++;
        }

        if (file(from) === file(ambig_from)) {
          same_file++;
        }
      }
    }

    if (ambiguities > 0) {
      /* if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      if (same_rank > 0 && same_file > 0) {
        return algebraic(from);
      }
      /* if the moving piece rests on the same file, use the rank symbol as the
       * disambiguator
       */
      else if (same_file > 0) {
        return algebraic(from).charAt(1);
      }
      /* else use the file symbol */
      else {
        return algebraic(from).charAt(0);
      }
    }

    return '';
  }

  function ascii() {
    var s = '   +------------------------+\n';
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* display the rank */
      if (file(i) === 0) {
        s += ' ' + '87654321'[rank(i)] + ' |';
      }

      /* empty piece */
      if (board[i] == null) {
        s += ' . ';
      } else {
        var piece = board[i].type;
        var color = board[i].color;
        var symbol = (color === WHITE) ?
                     piece.toUpperCase() : piece.toLowerCase();
        s += ' ' + symbol + ' ';
      }

      if ((i + 1) & 0x88) {
        s += '|\n';
        i += 8;
      }
    }
    s += '   +------------------------+\n';
    s += '     a  b  c  d  e  f  g  h\n';

    return s;
  }

  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  function move_from_san(move, sloppy) {
    // strip off any move decorations: e.g Nf3+?!
    var clean_move = stripped_san(move);

    // if we're using the sloppy parser run a regex to grab piece, to, and from
    // this should parse invalid SAN like: Pe2-e4, Rc1c4, Qf3xf7
    if (sloppy) {
      var matches = clean_move.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
      if (matches) {
        var piece = matches[1];
        var from = matches[2];
        var to = matches[3];
        var promotion = matches[4];
      }
    }

    var moves = generate_moves();
    for (var i = 0, len = moves.length; i < len; i++) {
      // try the strict parser first, then the sloppy parser if requested
      // by the user
      if ((clean_move === stripped_san(move_to_san(moves[i]))) ||
          (sloppy && clean_move === stripped_san(move_to_san(moves[i], true)))) {
        return moves[i];
      } else {
        if (matches &&
            (!piece || piece.toLowerCase() == moves[i].piece) &&
            SQUARES[from] == moves[i].from &&
            SQUARES[to] == moves[i].to &&
            (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
          return moves[i];
        }
      }
    }

    return null;
  }


  /*****************************************************************************
   * UTILITY FUNCTIONS
   ****************************************************************************/
  function rank(i) {
    return i >> 4;
  }

  function file(i) {
    return i & 15;
  }

  function algebraic(i){
    var f = file(i), r = rank(i);
    return 'abcdefgh'.substring(f,f+1) + '87654321'.substring(r,r+1);
  }

  function swap_color(c) {
    return c === WHITE ? BLACK : WHITE;
  }

  function is_digit(c) {
    return '0123456789'.indexOf(c) !== -1;
  }

  /* pretty = external move object */
  function make_pretty(ugly_move) {
    var move = clone(ugly_move);
    move.san = move_to_san(move, false);
    move.to = algebraic(move.to);
    move.from = algebraic(move.from);

    var flags = '';

    for (var flag in BITS) {
      if (BITS[flag] & move.flags) {
        flags += FLAGS[flag];
      }
    }
    move.flags = flags;

    return move;
  }

  function clone(obj) {
    var dupe = (obj instanceof Array) ? [] : {};

    for (var property in obj) {
      if (typeof property === 'object') {
        dupe[property] = clone(obj[property]);
      } else {
        dupe[property] = obj[property];
      }
    }

    return dupe;
  }

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  /*****************************************************************************
   * DEBUGGING UTILITIES
   ****************************************************************************/
  function perft(depth) {
    var moves = generate_moves({legal: false});
    var nodes = 0;
    var color = turn;

    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1);
          nodes += child_nodes;
        } else {
          nodes++;
        }
      }
      undo_move();
    }

    return nodes;
  }

  return {
    /***************************************************************************
     * PUBLIC CONSTANTS (is there a better way to do this?)
     **************************************************************************/
    WHITE: WHITE,
    BLACK: BLACK,
    PAWN: PAWN,
    KNIGHT: KNIGHT,
    BISHOP: BISHOP,
    ROOK: ROOK,
    QUEEN: QUEEN,
    KING: KING,
    SQUARES: (function() {
                /* from the ECMA-262 spec (section 12.6.4):
                 * "The mechanics of enumerating the properties ... is
                 * implementation dependent"
                 * so: for (var sq in SQUARES) { keys.push(sq); } might not be
                 * ordered correctly
                 */
                var keys = [];
                for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
                  if (i & 0x88) { i += 7; continue; }
                  keys.push(algebraic(i));
                }
                return keys;
              })(),
    FLAGS: FLAGS,

    /***************************************************************************
     * PUBLIC API
     **************************************************************************/
    load: function(fen) {
      return load(fen);
    },

    reset: function() {
      return reset();
    },

    moves: function(options) {
      /* The internal representation of a chess move is in 0x88 format, and
       * not meant to be human-readable.  The code below converts the 0x88
       * square coordinates to algebraic coordinates.  It also prunes an
       * unnecessary move keys resulting from a verbose call.
       */

      var ugly_moves = generate_moves(options);
      var moves = [];

      for (var i = 0, len = ugly_moves.length; i < len; i++) {

        /* does the user want a full move object (most likely not), or just
         * SAN
         */
        if (typeof options !== 'undefined' && 'verbose' in options &&
            options.verbose) {
          moves.push(make_pretty(ugly_moves[i]));
        } else {
          moves.push(move_to_san(ugly_moves[i], false));
        }
      }

      return moves;
    },

    in_check: function() {
      return in_check();
    },

    in_checkmate: function() {
      return in_checkmate();
    },

    in_stalemate: function() {
      return in_stalemate();
    },

    in_draw: function() {
      return half_moves >= 100 ||
             in_stalemate() ||
             insufficient_material() ||
             in_threefold_repetition();
    },

    insufficient_material: function() {
      return insufficient_material();
    },

    in_threefold_repetition: function() {
      return in_threefold_repetition();
    },

    game_over: function() {
      return half_moves >= 100 ||
             in_checkmate() ||
             in_stalemate() ||
             insufficient_material() ||
             in_threefold_repetition();
    },

    validate_fen: function(fen) {
      return validate_fen(fen);
    },

    fen: function() {
      return generate_fen();
    },

    pgn: function(options) {
      /* using the specification from http://www.chessclub.com/help/PGN-spec
       * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
       */
      var newline = (typeof options === 'object' &&
                     typeof options.newline_char === 'string') ?
                     options.newline_char : '\n';
      var max_width = (typeof options === 'object' &&
                       typeof options.max_width === 'number') ?
                       options.max_width : 0;
      var result = [];
      var header_exists = false;

      /* add the PGN header headerrmation */
      for (var i in header) {
        /* TODO: order of enumerated properties in header object is not
         * guaranteed, see ECMA-262 spec (section 12.6.4)
         */
        result.push('[' + i + ' \"' + header[i] + '\"]' + newline);
        header_exists = true;
      }

      if (header_exists && history.length) {
        result.push(newline);
      }

      /* pop all of history onto reversed_history */
      var reversed_history = [];
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }

      var moves = [];
      var move_string = '';

      /* build the list of moves.  a move_string looks like: "3. e3 e6" */
      while (reversed_history.length > 0) {
        var move = reversed_history.pop();

        /* if the position started with black to move, start PGN with 1. ... */
        if (!history.length && move.color === 'b') {
          move_string = move_number + '. ...';
        } else if (move.color === 'w') {
          /* store the previous generated move_string if we have one */
          if (move_string.length) {
            moves.push(move_string);
          }
          move_string = move_number + '.';
        }

        move_string = move_string + ' ' + move_to_san(move, false);
        make_move(move);
      }

      /* are there any other leftover moves? */
      if (move_string.length) {
        moves.push(move_string);
      }

      /* is there a result? */
      if (typeof header.Result !== 'undefined') {
        moves.push(header.Result);
      }

      /* history should be back to what is was before we started generating PGN,
       * so join together moves
       */
      if (max_width === 0) {
        return result.join('') + moves.join(' ');
      }

      /* wrap the PGN output at max_width */
      var current_width = 0;
      for (var i = 0; i < moves.length; i++) {
        /* if the current move will push past max_width */
        if (current_width + moves[i].length > max_width && i !== 0) {

          /* don't end the line with whitespace */
          if (result[result.length - 1] === ' ') {
            result.pop();
          }

          result.push(newline);
          current_width = 0;
        } else if (i !== 0) {
          result.push(' ');
          current_width++;
        }
        result.push(moves[i]);
        current_width += moves[i].length;
      }

      return result.join('');
    },

    load_pgn: function(pgn, options) {
      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy = (typeof options !== 'undefined' && 'sloppy' in options) ?
                    options.sloppy : false;

      function mask(str) {
        return str.replace(/\\/g, '\\');
      }

      function has_keys(object) {
        for (var key in object) {
          return true;
        }
        return false;
      }

      function parse_pgn_header(header, options) {
        var newline_char = (typeof options === 'object' &&
                            typeof options.newline_char === 'string') ?
                            options.newline_char : '\r?\n';
        var header_obj = {};
        var headers = header.split(new RegExp(mask(newline_char)));
        var key = '';
        var value = '';

        for (var i = 0; i < headers.length; i++) {
          key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1');
          value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, '$1');
          if (trim(key).length > 0) {
            header_obj[key] = value;
          }
        }

        return header_obj;
      }

      var newline_char = (typeof options === 'object' &&
                          typeof options.newline_char === 'string') ?
                          options.newline_char : '\r?\n';
      var regex = new RegExp('^(\\[(.|' + mask(newline_char) + ')*\\])' +
                             '(' + mask(newline_char) + ')*' +
                             '1.(' + mask(newline_char) + '|.)*$', 'g');

      /* get header part of the PGN file */
      var header_string = pgn.replace(regex, '$1');

      /* no info part given, begins with moves */
      if (header_string[0] !== '[') {
        header_string = '';
      }

      reset();

      /* parse PGN header */
      var headers = parse_pgn_header(header_string, options);
      for (var key in headers) {
        set_header([key, headers[key]]);
      }

      /* load the starting position indicated by [Setup '1'] and
      * [FEN position] */
      if (headers['SetUp'] === '1') {
          if (!(('FEN' in headers) && load(headers['FEN']))) {
            return false;
          }
      }

      /* delete header to get the moves */
      var ms = pgn.replace(header_string, '').replace(new RegExp(mask(newline_char), 'g'), ' ');

      /* delete comments */
      ms = ms.replace(/(\{[^}]+\})+?/g, '');

      /* delete recursive annotation variations */
      var rav_regex = /(\([^\(\)]+\))+?/g
      while (rav_regex.test(ms)) {
        ms = ms.replace(rav_regex, '');
      }

      /* delete move numbers */
      ms = ms.replace(/\d+\.(\.\.)?/g, '');

      /* delete ... indicating black to move */
      ms = ms.replace(/\.\.\./g, '');

      /* delete numeric annotation glyphs */
      ms = ms.replace(/\$\d+/g, '');

      /* trim and get array of moves */
      var moves = trim(ms).split(new RegExp(/\s+/));

      /* delete empty entries */
      moves = moves.join(',').replace(/,,+/g, ',').split(',');
      var move = '';

      for (var half_move = 0; half_move < moves.length - 1; half_move++) {
        move = move_from_san(moves[half_move], sloppy);

        /* move not possible! (don't clear the board to examine to show the
         * latest valid position)
         */
        if (move == null) {
          return false;
        } else {
          make_move(move);
        }
      }

      /* examine last move */
      move = moves[moves.length - 1];
      if (POSSIBLE_RESULTS.indexOf(move) > -1) {
        if (has_keys(header) && typeof header.Result === 'undefined') {
          set_header(['Result', move]);
        }
      }
      else {
        move = move_from_san(move, sloppy);
        if (move == null) {
          return false;
        } else {
          make_move(move);
        }
      }
      return true;
    },

    header: function() {
      return set_header(arguments);
    },

    ascii: function() {
      return ascii();
    },

    turn: function() {
      return turn;
    },

    move: function(move, options) {
      /* The move function can be called with in the following parameters:
       *
       * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
       *
       * .move({ from: 'h7', <- where the 'move' is a move object (additional
       *         to :'h8',      fields are ignored)
       *         promotion: 'q',
       *      })
       */

      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy = (typeof options !== 'undefined' && 'sloppy' in options) ?
                    options.sloppy : false;

      var move_obj = null;

      if (typeof move === 'string') {
        move_obj = move_from_san(move, sloppy);
      } else if (typeof move === 'object') {
        var moves = generate_moves();

        /* convert the pretty move object to an ugly move object */
        for (var i = 0, len = moves.length; i < len; i++) {
          if (move.from === algebraic(moves[i].from) &&
              move.to === algebraic(moves[i].to) &&
              (!('promotion' in moves[i]) ||
              move.promotion === moves[i].promotion)) {
            move_obj = moves[i];
            break;
          }
        }
      }

      /* failed to find move */
      if (!move_obj) {
        return null;
      }

      /* need to make a copy of move because we can't generate SAN after the
       * move is made
       */
      var pretty_move = make_pretty(move_obj);

      make_move(move_obj);

      return pretty_move;
    },

    undo: function() {
      var move = undo_move();
      return (move) ? make_pretty(move) : null;
    },

    clear: function() {
      return clear();
    },

    put: function(piece, square) {
      return put(piece, square);
    },

    get: function(square) {
      return get(square);
    },

    remove: function(square) {
      return remove(square);
    },

    perft: function(depth) {
      return perft(depth);
    },

    square_color: function(square) {
      if (square in SQUARES) {
        var sq_0x88 = SQUARES[square];
        return ((rank(sq_0x88) + file(sq_0x88)) % 2 === 0) ? 'light' : 'dark';
      }

      return null;
    },

    history: function(options) {
      var reversed_history = [];
      var move_history = [];
      var verbose = (typeof options !== 'undefined' && 'verbose' in options &&
                     options.verbose);

      while (history.length > 0) {
        reversed_history.push(undo_move());
      }

      while (reversed_history.length > 0) {
        var move = reversed_history.pop();
        if (verbose) {
          move_history.push(make_pretty(move));
        } else {
          move_history.push(move_to_san(move));
        }
        make_move(move);
      }

      return move_history;
    }

  };
};

/* export Chess object if using node or any other CommonJS compatible
 * environment */
if (true) exports.Chess = Chess;
/* export Chess object for any RequireJS compatible environment */
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return Chess;  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/app/chessboard/chessboard.component.html":
/*!******************************************************!*\
  !*** ./src/app/chessboard/chessboard.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"__chessboard__\"></div>"

/***/ }),

/***/ "./src/app/chessboard/chessboard.component.scss":
/*!******************************************************!*\
  !*** ./src/app/chessboard/chessboard.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoZXNzYm9hcmQvY2hlc3Nib2FyZC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/chessboard/chessboard.component.ts":
/*!****************************************************!*\
  !*** ./src/app/chessboard/chessboard.component.ts ***!
  \****************************************************/
/*! exports provided: ChessboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChessboardComponent", function() { return ChessboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_native_audio_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/native-audio/ngx */ "./node_modules/@ionic-native/native-audio/ngx/index.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _promotion_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./promotion.dialog */ "./src/app/chessboard/promotion.dialog.ts");
/* harmony import */ var chess_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! chess.js */ "./node_modules/chess.js/chess.js");
/* harmony import */ var chess_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(chess_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");










var ChessboardComponent = /** @class */ (function () {
    function ChessboardComponent(configurationService, stockfish, translate, modalController, http, platform, nativeAudio) {
        this.configurationService = configurationService;
        this.stockfish = stockfish;
        this.translate = translate;
        this.modalController = modalController;
        this.http = http;
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.chess = new chess_js__WEBPACK_IMPORTED_MODULE_7__();
        this.autosolve = false;
        this.hinting = false;
        this.initializing = false;
        this.useSyzygy = false;
        this.sounds = [];
        this.ooopsPlayed = false;
        this.engineReady = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.engineStartThinking = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.engineEndThinking = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.engineInfo = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.playerMoved = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.gameOver = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ChessboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onStockfishMessageSubscription = this.stockfish.onMessage$.subscribe(function (event) { return _this.messageReceived(event); });
        this.loadAudio();
        this.configurationService.initialize().then(function (config) {
            _this.configuration = config;
            _this.useSyzygy = _this.configuration.useSyzygy;
        });
    };
    ChessboardComponent.prototype.ngOnDestroy = function () {
        this.onStockfishMessageSubscription.unsubscribe();
        this.unloadAudio();
    };
    ChessboardComponent.prototype.loadAudio = function () {
        if (this.platform.is('cordova')) {
            this.nativeAudio.preloadSimple('move', 'assets/audio/move.mp3');
            this.nativeAudio.preloadSimple('success', 'assets/audio/success.mp3');
            this.nativeAudio.preloadSimple('fail', 'assets/audio/fail.mp3');
        }
        else {
            var audio = new Audio();
            audio.src = '/assets/audio/move.mp3';
            audio.preload = 'auto';
            this.sounds.push({ key: 'move', audio: audio });
            audio = new Audio();
            audio.src = '/assets/audio/success.mp3';
            audio.preload = 'auto';
            this.sounds.push({ key: 'success', audio: audio });
            audio = new Audio();
            audio.src = '/assets/audio/fail.mp3';
            audio.preload = 'auto';
            this.sounds.push({ key: 'fail', audio: audio });
        }
    };
    ChessboardComponent.prototype.unloadAudio = function () {
        if (this.platform.is('cordova')) {
            this.nativeAudio.unload('move');
            this.nativeAudio.unload('success');
            this.nativeAudio.unload('fail');
        }
        else {
            this.sounds.forEach(function (sound) {
                sound.audio.src = '';
                sound.audio.load();
            });
            this.sounds = [];
        }
    };
    ChessboardComponent.prototype.playAudio = function (sound) {
        if (this.platform.is('cordova')) {
            this.nativeAudio.play(sound);
        }
        else {
            var soundToPlay = this.sounds.find(function (item) { return item.key === sound; });
            soundToPlay.audio.play();
        }
    };
    ChessboardComponent.prototype.onResize = function (event) {
        if (this.board)
            this.board.resize(event);
    };
    ChessboardComponent.prototype.build = function (fen, target) {
        var _this = this;
        var self = this;
        this.initializing = true;
        this.target = target;
        this.autosolve = false;
        this.originalFen = fen;
        this.fenHistory = [fen];
        this.ooopsPlayed = false;
        if (this.board) {
            this.board.destroy();
        }
        this.board = ChessBoard('__chessboard__', {
            position: fen,
            pieceTheme: '/assets/icon/{piece}.png',
            draggable: true,
            onDragStart: function (source, piece, position, orientation) { return self.onDragStart(source, piece, position, orientation); },
            onDrop: function (source, target, piece, newPos, oldPos, orientation) { return self.onDrop(source, target, piece, newPos, oldPos, orientation); },
            onMoveEnd: function (source, target) { self.onMoveEnd(source, target); },
            onMouseoutSquare: function (square, piece, position, orientation) { self.onMouseoutSquare(square, piece, position, orientation); },
            onMouseoverSquare: function (square, piece, position, orientation) { self.onMouseoverSquare(square, piece, position, orientation); },
            onSnapEnd: function (source, target, piece) { self.onSnapEnd(source, target, piece); }
        });
        this.chess.load(fen);
        this.cleanHighlights();
        this.originalPlayer = this.chess.turn();
        this.player = this.originalPlayer;
        this.translate.get([
            'chessboard.stalemate',
            'chessboard.insufficent-material',
            'chessboard.three-repetition',
            'chessboard.rule-fifty',
            'chessboard.game-over',
            'chessboard.mate-in',
            'chessboard.receive-mate-in',
            'chessboard.unfeasible-mate',
            'chessboard.white-advantage',
            'chessboard.black-advantage',
            'chessboard.querying-syzygy',
            'chessboard.syzygy-error'
        ]).subscribe(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.literales = res;
                return [2 /*return*/];
            });
        }); });
        window.setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 100);
    };
    ChessboardComponent.prototype.rewind = function () {
        this.cleanHighlights();
        this.board.position(this.originalFen);
        this.chess.load(this.originalFen);
        this.fenHistory = [this.originalFen];
        this.player = this.chess.turn();
        this.ooopsPlayed = false;
    };
    ChessboardComponent.prototype.undo = function () {
        this.cleanHighlights();
        this.chess.undo();
        this.chess.undo();
        this.fenHistory.pop();
        this.fenHistory.pop();
        this.board.position(this.chess.fen());
        this.ooopsPlayed = false;
    };
    ChessboardComponent.prototype.history = function () {
        return this.chess.history();
    };
    ChessboardComponent.prototype.solve = function () {
        this.initializing = false;
        this.autosolve = true;
        if (this.player === 'w') {
            this.player = 'b';
        }
        else {
            this.player = 'w';
        }
        this.prepareMove();
    };
    ChessboardComponent.prototype.hint = function () {
        this.initializing = false;
        this.hinting = true;
        this.getEngineMove();
        this.engineStartThinking.emit();
    };
    ChessboardComponent.prototype.flip = function () {
        this.board.flip();
    };
    ChessboardComponent.prototype.stop = function () {
        if (this.autosolve) {
            this.autosolve = false;
        }
        this.stockfish.postMessage('stop');
    };
    ChessboardComponent.prototype.winner = function () {
        if (this.chess.in_checkmate()) {
            return (this.chess.turn() === 'w' ? 'black' : 'white');
        }
        else {
            return null;
        }
    };
    ChessboardComponent.prototype.showFirstPosition = function () {
        if (this.fenPointer === 0) {
            return;
        }
        this.fenPointer = 0;
        this.showFenPointer();
    };
    ChessboardComponent.prototype.showPreviousPosition = function () {
        if (this.fenPointer === 0) {
            return;
        }
        this.fenPointer--;
        this.showFenPointer();
    };
    ChessboardComponent.prototype.showNextPosition = function () {
        if (this.fenPointer === this.fenHistory.length - 1) {
            return;
        }
        this.fenPointer++;
        this.showFenPointer();
    };
    ChessboardComponent.prototype.showLatestPosition = function () {
        if (this.fenPointer === this.fenHistory.length - 1) {
            return;
        }
        this.fenPointer = this.fenHistory.length - 1;
        this.showFenPointer();
    };
    ChessboardComponent.prototype.isShowingFirstPosition = function () {
        return (this.fenPointer === 0);
    };
    ChessboardComponent.prototype.isShowingLatestPosition = function () {
        return (this.fenPointer === this.fenHistory.length - 1);
    };
    ChessboardComponent.prototype.showFenPointer = function () {
        this.cleanHighlights();
        if (this.configuration.playSounds) {
            this.playAudio('move');
        }
        this.board.position(this.fenHistory[this.fenPointer], true);
    };
    ChessboardComponent.prototype.messageReceived = function (message) {
        if (this.initializing) {
            return;
        }
        if ('uciok' === message) {
            this.engineReady.emit();
            return;
        }
        var match;
        if (match = message.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/)) {
            if (this.hinting) {
                this.showHint(match[1], match[2], match[3], 2);
                return;
            }
            this.chess.move({ from: match[1], to: match[2], promotion: match[3] });
            if (this.configuration.playSounds) {
                this.playAudio('move');
            }
            this.board.position(this.chess.fen(), false);
            if (this.originalPlayer !== this.player) {
                this.playerMoved.emit();
            }
            this.fenHistory.push(this.chess.fen());
            this.highlightSquares(match[1], match[2]);
            if (this.chess.game_over()) {
                var message_1;
                if (this.chess.in_checkmate())
                    message_1 = 'Checkmate';
                else if (this.chess.in_stalemate())
                    message_1 = this.literales['chessboard.stalemate'];
                else if (this.chess.insufficient_material())
                    message_1 = this.literales['chessboard.insufficent-material'];
                else if (this.chess.in_threefold_repetition())
                    message_1 = this.literales['chessboard.three-repetition'];
                else if (this.chess.in_draw())
                    message_1 = this.literales['chessboard.rule-fifty'];
                else
                    message_1 = this.literales['chessboard.game-over'];
                this.autosolve = false;
                this.fenPointer = this.fenHistory.length - 1;
                if (this.configuration.playSounds) {
                    if ('checkmate' !== this.target && !this.chess.in_checkmate() ||
                        'checkmate' === this.target && this.chess.in_checkmate() && this.originalPlayer !== this.chess.turn()) {
                        this.playAudio('success');
                    }
                    else {
                        this.playAudio('fail');
                    }
                }
                this.gameOver.emit(message_1);
                return;
            }
            if (this.autosolve || this.player !== this.originalPlayer) {
                if (this.player === 'w') {
                    this.player = 'b';
                }
                else {
                    this.player = 'w';
                }
                this.prepareMove();
            }
            else {
                if (this.squareSelected) {
                    document.querySelector('.square-' + this.squareSelected).classList.add('highlight-square');
                }
                this.engineEndThinking.emit();
            }
        }
        else if (match = message.match(/^info .*\bscore (\w+) (-?\d+)/)) {
            var score = parseInt(match[2]) * (this.chess.turn() == 'w' ? 1 : -1);
            var engineScore = void 0;
            /// Is it measuring in centipawns?
            if (match[1] == 'cp') {
                engineScore = (score / 100.0).toFixed(2);
                /// Did it find a mate?
            }
            else if (match[1] == 'mate') {
                if (this.originalPlayer === 'w' && score > 0 || this.originalPlayer === 'b' && score < 0) {
                    this.engineInfo.emit(this.literales['chessboard.mate-in'] + ' ' + Math.abs(score));
                }
                else {
                    if (this.configuration.playSounds && !this.ooopsPlayed && !this.autosolve) {
                        this.ooopsPlayed = true;
                        this.playAudio('fail');
                    }
                    this.engineInfo.emit(this.literales['chessboard.receive-mate-in']);
                }
                return;
            }
            /// Is the score bounded?
            var bound = '';
            if (match = message.match(/\b(upper|lower)bound\b/)) {
                bound = ((match[1] == 'upper') == (this.chess.turn() == 'w') ? '<= ' : '>= ');
            }
            if ('0.00' === engineScore) {
                if ('checkmate' === this.target && this.configuration.playSounds && !this.ooopsPlayed && !this.autosolve) {
                    this.ooopsPlayed = true;
                    this.playAudio('fail');
                }
                this.engineInfo.emit(this.literales['chessboard.unfeasible-mate']);
            }
            else if (parseFloat(engineScore) > 0) {
                this.engineInfo.emit(this.literales['chessboard.white-advantage'] + ': ' + bound + engineScore);
            }
            else {
                this.engineInfo.emit(this.literales['chessboard.black-advantage'] + ': ' + bound + engineScore);
            }
        }
        else if (match = message.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/)) {
            this.engineInfo.emit('Depth: ' + match[1] + ' Nps: ' + match[2]);
        }
    };
    ChessboardComponent.prototype.promoteDialog = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var modal, data;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.modalController.create({
                                        component: _promotion_dialog__WEBPACK_IMPORTED_MODULE_6__["PromotionDialog"],
                                        componentProps: { turn: this.originalPlayer }
                                    })];
                                case 1:
                                    modal = _a.sent();
                                    modal.present();
                                    return [4 /*yield*/, modal.onDidDismiss()];
                                case 2:
                                    data = (_a.sent()).data;
                                    if (data == undefined) {
                                        resolve(null);
                                    }
                                    else {
                                        resolve(data.piece);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ChessboardComponent.prototype.onDragStart = function (source, piece, position, orientation) {
        var re = this.player == 'w' ? /^b/ : /^w/;
        if (this.chess.game_over() || piece.search(re) !== -1 || this.chess.turn() !== this.player) {
            return false;
        }
        this.drawGreySquares(source);
    };
    ;
    ChessboardComponent.prototype.onDrop = function (source, target, piece, newPos, oldPos, orientation) {
        var _this = this;
        this.removeGreySquares();
        if (source == target) {
            this.squareSelected = source;
            this.drawGreySquares(source);
            return;
        }
        // validate move
        var move = this.chess.move({
            from: source,
            to: target,
            promotion: 'q'
        });
        if (move === null)
            return 'snapback';
        this.chess.undo();
        this.squareSelected = target;
        // check promotion
        if (this.chess.get(source).type == 'p' && (target.charAt(1) == '8' || target.charAt(1) == '1')) {
            this.promoteDialog().then(function (promotion) {
                if (promotion) {
                    _this.registerMove(source, target, promotion);
                }
                _this.board.position(_this.chess.fen(), false);
            });
        }
        else {
            this.registerMove(source, target, 'q');
        }
    };
    ;
    ChessboardComponent.prototype.registerMove = function (source, target, promotion) {
        this.chess.move({
            from: source,
            to: target,
            promotion: promotion
        });
        if (this.configuration.playSounds) {
            this.playAudio('move');
        }
        this.fenHistory.push(this.chess.fen());
        this.playerMoved.emit();
        this.initializing = false;
        this.prepareMove();
    };
    ChessboardComponent.prototype.showHint = function (from, to, promotion, count) {
        var self = this;
        var currentFen = this.chess.fen();
        if (this.configuration.playSounds) {
            this.playAudio('move');
        }
        this.chess.move({ from: from, to: to, promotion: promotion });
        this.board.position(this.chess.fen(), true);
        setTimeout(function () {
            self.chess.undo();
            self.board.position(currentFen, true);
            count--;
            if (count >= 0) {
                setTimeout(function () {
                    self.showHint(from, to, promotion, count - 1);
                }, 500);
            }
            else {
                self.hinting = false;
                self.engineEndThinking.emit();
            }
        }, 500);
    };
    ChessboardComponent.prototype.onMoveEnd = function (source, target) {
    };
    ;
    ChessboardComponent.prototype.onMouseoutSquare = function (square, piece, position, orientation) {
        this.removeGreySquares();
    };
    ;
    ChessboardComponent.prototype.onMouseoverSquare = function (square, piece, position, orientation) {
        if (this.chess.turn() !== this.player) {
            return;
        }
        if (this.squareSelected) {
            this.onDrop(this.squareSelected, square, piece, null, null, orientation);
            this.board.position(this.chess.fen(), false);
            this.squareSelected = square;
        }
        else if (piece) {
            this.drawGreySquares(square);
        }
    };
    ;
    ChessboardComponent.prototype.onSnapEnd = function (source, target, piece) {
        this.highlightSquares(source, target);
    };
    ;
    ChessboardComponent.prototype.cleanHighlights = function () {
        document.querySelectorAll('.highlight-square').forEach(function (square) {
            square.classList.remove('highlight-square');
        });
    };
    ChessboardComponent.prototype.highlightSquares = function (source, target) {
        this.cleanHighlights();
        document.querySelector('.square-' + source).classList.add('highlight-square');
        document.querySelector('.square-' + target).classList.add('highlight-square');
    };
    ChessboardComponent.prototype.getStockfishMove = function () {
        this.stockfish.postMessage('position fen ' + this.chess.fen());
        this.stockfish.postMessage('go depth ' + this.configuration.stockfishDepth);
    };
    ChessboardComponent.prototype.getSyzygyMove = function () {
        var _this = this;
        this.engineInfo.emit(this.literales['chessboard.querying-syzygy']);
        this.http.get("http://tablebase.lichess.ovh/standard?fen=" + this.chess.fen())
            .subscribe(function (data) {
            if (_this.initializing) {
                return;
            }
            var bestmove = data.moves[0].uci;
            var match = bestmove.match(/^([a-h][1-8])([a-h][1-8])([qrbn])?/);
            if (_this.hinting) {
                if (data.dtm) {
                    if (data.dtm > 0) {
                        _this.engineInfo.emit(_this.literales['chessboard.mate-in'] + ' ' + Math.abs((data.dtm % 2 === 0 ? data.dtm : data.dtm + 1) / 2));
                    }
                    else {
                        if (_this.configuration.playSounds && !_this.ooopsPlayed && !_this.autosolve) {
                            _this.ooopsPlayed = true;
                            _this.playAudio('fail');
                        }
                        _this.engineInfo.emit(_this.literales['chessboard.receive-mate-in']);
                    }
                }
                else {
                    if ('checkmate' === _this.target && _this.configuration.playSounds && !_this.ooopsPlayed && !_this.autosolve) {
                        _this.ooopsPlayed = true;
                        _this.playAudio('fail');
                    }
                    _this.engineInfo.emit(_this.literales['chessboard.unfeasible-mate']);
                }
                _this.showHint(match[1], match[2], match[3], 2);
                return;
            }
            if (_this.configuration.playSounds) {
                _this.playAudio('move');
            }
            _this.chess.move({ from: match[1], to: match[2], promotion: match[3] });
            _this.board.position(_this.chess.fen(), false);
            if (_this.originalPlayer !== _this.player) {
                _this.playerMoved.emit();
            }
            _this.fenHistory.push(_this.chess.fen());
            _this.highlightSquares(match[1], match[2]);
            if (_this.chess.game_over()) {
                var message = void 0;
                if (_this.chess.in_checkmate())
                    message = 'Checkmate';
                else if (_this.chess.in_stalemate())
                    message = _this.literales['chessboard.stalemate'];
                else if (_this.chess.insufficient_material())
                    message = _this.literales['chessboard.insufficent-material'];
                else if (_this.chess.in_threefold_repetition())
                    message = _this.literales['chessboard.three-repetition'];
                else if (_this.chess.in_draw())
                    message = _this.literales['chessboard.rule-fifty'];
                else
                    message = _this.literales['chessboard.game-over'];
                _this.autosolve = false;
                _this.fenPointer = _this.fenHistory.length - 1;
                if (_this.configuration.playSounds) {
                    if ('checkmate' !== _this.target && !_this.chess.in_checkmate() ||
                        'checkmate' === _this.target && _this.chess.in_checkmate() && _this.originalPlayer !== _this.chess.turn()) {
                        _this.playAudio('success');
                    }
                    else {
                        _this.playAudio('fail');
                    }
                }
                _this.gameOver.emit(message);
                return;
            }
            else {
                if (data.dtm) {
                    if (data.dtm < 0) {
                        _this.engineInfo.emit(_this.literales['chessboard.mate-in'] + ' ' + Math.abs((data.dtm % 2 === 0 ? data.dtm : data.dtm + 1) / 2));
                    }
                    else {
                        if (_this.configuration.playSounds && !_this.ooopsPlayed && !_this.autosolve) {
                            _this.ooopsPlayed = true;
                            _this.playAudio('fail');
                        }
                        _this.engineInfo.emit(_this.literales['chessboard.receive-mate-in']);
                    }
                }
                else {
                    if ('checkmate' === _this.target && _this.configuration.playSounds && !_this.ooopsPlayed && !_this.autosolve) {
                        _this.ooopsPlayed = true;
                        _this.playAudio('fail');
                    }
                    _this.engineInfo.emit(_this.literales['chessboard.unfeasible-mate']);
                }
            }
            if (_this.autosolve || _this.player !== _this.originalPlayer) {
                if (_this.player === 'w') {
                    _this.player = 'b';
                }
                else {
                    _this.player = 'w';
                }
                _this.prepareMove();
            }
            else {
                if (_this.squareSelected) {
                    document.querySelector('.square-' + _this.squareSelected).classList.add('highlight-square');
                }
                _this.engineEndThinking.emit();
            }
        }, function (error) {
            _this.useSyzygy = false;
            _this.engineInfo.emit(_this.literales['syzygy-error']);
            _this.getStockfishMove();
        });
    };
    ChessboardComponent.prototype.numberOfPieces = function (fen) {
        return fen.substring(0, fen.indexOf(" ")).replace(/\d/g, "").replace(/\//g, "").length;
    };
    ChessboardComponent.prototype.getEngineMove = function () {
        if (this.useSyzygy && this.numberOfPieces(this.chess.fen()) <= 7) {
            this.getSyzygyMove();
        }
        else {
            this.getStockfishMove();
        }
    };
    ChessboardComponent.prototype.prepareMove = function () {
        if (!this.chess.game_over()) {
            if (this.chess.turn() !== this.player) {
                this.getEngineMove();
                this.engineStartThinking.emit();
            }
        }
        else {
            this.autosolve = false;
            if (this.chess.game_over()) {
                var message = void 0;
                if (this.chess.in_checkmate())
                    message = 'Checkmate';
                else if (this.chess.in_stalemate())
                    message = this.literales['chessboard.stalemate'];
                else if (this.chess.insufficient_material())
                    message = this.literales['chessboard.insufficent-material'];
                else if (this.chess.in_threefold_repetition())
                    message = this.literales['chessboard.three-repetition'];
                else if (this.chess.in_draw())
                    message = this.literales['chessboard.rule-fifty'];
                else
                    message = this.literales['chessboard.game-over'];
                this.fenPointer = this.fenHistory.length - 1;
                if (this.configuration.playSounds) {
                    if ('checkmate' !== this.target && !this.chess.in_checkmate() ||
                        'checkmate' === this.target && this.chess.in_checkmate() && this.originalPlayer !== this.chess.turn()) {
                        this.playAudio('success');
                    }
                    else {
                        this.playAudio('fail');
                    }
                }
                this.gameOver.emit(message);
                return;
            }
        }
    };
    ChessboardComponent.prototype.drawGreySquares = function (square) {
        var _this = this;
        // get list of possible moves for this square
        var moves = this.chess.moves({ square: square, verbose: true });
        // exit if there are no moves available for this square
        if (moves.length === 0)
            return;
        //this.removeGreySquares();
        // highlight the square they moused over
        this.greySquare(square);
        // highlight the possible squares for this piece
        moves.forEach(function (move) {
            _this.greySquare(move.to);
        });
    };
    ChessboardComponent.prototype.greySquare = function (square) {
        var squareEl = $('#__chessboard__ .square-' + square);
        /*
        let background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAANElEQVQYlWP4cHPrf0KYgZCCrR3J+BVt7UgmziScimAm4FSEroB067CZgKIIn4IPN7f+BwDVaRVpspCjIQAAAABJRU5ErkJggg==) repeat';
        if (squareEl.hasClass('black-3c85d') === true) {
            background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAANElEQVQYlWPY2pH8nxBmIKTgw82t+BV9uLmVOJNwKoKZgFMRugLSrcNmAooifAq2diT/BwD7VtmENkc+eQAAAABJRU5ErkJggg==) repeat';
        }
        */
        var background = '#e5d8c2'; // claro #f0d9b5
        if (squareEl.hasClass('black-3c85d') === true) {
            background = '#9d8b7b'; // oscuro #b58863
        }
        squareEl.css('background', background);
    };
    ;
    ChessboardComponent.prototype.removeGreySquares = function () {
        $('#__chessboard__ .square-55d63').css('background', '');
    };
    ;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ChessboardComponent.prototype, "engineReady", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ChessboardComponent.prototype, "engineStartThinking", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ChessboardComponent.prototype, "engineEndThinking", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ChessboardComponent.prototype, "engineInfo", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ChessboardComponent.prototype, "playerMoved", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ChessboardComponent.prototype, "gameOver", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:resize', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], ChessboardComponent.prototype, "onResize", null);
    ChessboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'chessboard',
            template: __webpack_require__(/*! ./chessboard.component.html */ "./src/app/chessboard/chessboard.component.html"),
            styles: [__webpack_require__(/*! ./chessboard.component.scss */ "./src/app/chessboard/chessboard.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared__WEBPACK_IMPORTED_MODULE_5__["ConfigurationService"],
            _shared__WEBPACK_IMPORTED_MODULE_5__["StockfishService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _ionic_native_native_audio_ngx__WEBPACK_IMPORTED_MODULE_4__["NativeAudio"]])
    ], ChessboardComponent);
    return ChessboardComponent;
}());



/***/ }),

/***/ "./src/app/chessboard/index.ts":
/*!*************************************!*\
  !*** ./src/app/chessboard/index.ts ***!
  \*************************************/
/*! exports provided: ChessboardComponent, PromotionDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chessboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chessboard.component */ "./src/app/chessboard/chessboard.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChessboardComponent", function() { return _chessboard_component__WEBPACK_IMPORTED_MODULE_0__["ChessboardComponent"]; });

/* harmony import */ var _promotion_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./promotion.dialog */ "./src/app/chessboard/promotion.dialog.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PromotionDialog", function() { return _promotion_dialog__WEBPACK_IMPORTED_MODULE_1__["PromotionDialog"]; });





/***/ }),

/***/ "./src/app/chessboard/promotion.dialog.html":
/*!**************************************************!*\
  !*** ./src/app/chessboard/promotion.dialog.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-toolbar>\n        <ion-title>{{'chessboard.promotion.title' | translate}}</ion-title>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n    <ion-grid>\n        <ion-row>\n            <ion-col>\n                <ion-button (click)=\"select('q')\" color=\"light\" size=\"large\" expand=\"full\">\n                    <img slot=\"start\" src=\"../../assets/icon/{{turn}}Q.png\" class=\"thumbnail\" />\n                </ion-button>\n            </ion-col>\n            <ion-col>\n                <ion-button (click)=\"select('n')\" color=\"light\" size=\"large\" expand=\"full\">\n                    <img slot=\"start\" src=\"../../assets/icon/{{turn}}N.png\" class=\"thumbnail\" />\n                </ion-button>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <ion-button (click)=\"select('r')\" color=\"light\" size=\"large\" expand=\"full\">\n                    <img slot=\"start\" src=\"../../assets/icon/{{turn}}R.png\" class=\"thumbnail\" />\n                </ion-button>\n            </ion-col>\n            <ion-col>\n                <ion-button (click)=\"select('b')\" color=\"light\" size=\"large\" expand=\"full\">\n                    <img slot=\"start\" src=\"../../assets/icon/{{turn}}B.png\" class=\"thumbnail\" />\n                </ion-button>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>"

/***/ }),

/***/ "./src/app/chessboard/promotion.dialog.scss":
/*!**************************************************!*\
  !*** ./src/app/chessboard/promotion.dialog.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoZXNzYm9hcmQvcHJvbW90aW9uLmRpYWxvZy5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/chessboard/promotion.dialog.ts":
/*!************************************************!*\
  !*** ./src/app/chessboard/promotion.dialog.ts ***!
  \************************************************/
/*! exports provided: PromotionDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromotionDialog", function() { return PromotionDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");




var PromotionDialog = /** @class */ (function () {
    function PromotionDialog(modalController, translate) {
        this.modalController = modalController;
        this.translate = translate;
    }
    PromotionDialog.prototype.select = function (piece) {
        this.modalController.dismiss({ piece: piece });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], PromotionDialog.prototype, "turn", void 0);
    PromotionDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'chessboard-promotion',
            template: __webpack_require__(/*! ./promotion.dialog.html */ "./src/app/chessboard/promotion.dialog.html"),
            styles: [__webpack_require__(/*! ./promotion.dialog.scss */ "./src/app/chessboard/promotion.dialog.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"]])
    ], PromotionDialog);
    return PromotionDialog;
}());



/***/ }),

/***/ "./src/app/position/position.module.ts":
/*!*********************************************!*\
  !*** ./src/app/position/position.module.ts ***!
  \*********************************************/
/*! exports provided: PositionPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositionPageModule", function() { return PositionPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _position_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./position.page */ "./src/app/position/position.page.ts");
/* harmony import */ var _chessboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../chessboard */ "./src/app/chessboard/index.ts");







var PositionPageModule = /** @class */ (function () {
    function PositionPageModule() {
    }
    PositionPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _position_page__WEBPACK_IMPORTED_MODULE_4__["PositionPage"]
                    }
                ])
            ],
            declarations: [_position_page__WEBPACK_IMPORTED_MODULE_4__["PositionPage"], _chessboard__WEBPACK_IMPORTED_MODULE_5__["ChessboardComponent"], _chessboard__WEBPACK_IMPORTED_MODULE_5__["PromotionDialog"]],
            entryComponents: [_chessboard__WEBPACK_IMPORTED_MODULE_5__["PromotionDialog"]]
        })
    ], PositionPageModule);
    return PositionPageModule;
}());



/***/ }),

/***/ "./src/app/position/position.page.html":
/*!*********************************************!*\
  !*** ./src/app/position/position.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"start\" *ngIf=\"showNavPrev\" (click)=\"gotoPrev()\" class=\"\">\n      <ion-button>\n        <ion-icon slot=\"icon-only\" name=\"arrow-round-back\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\" *ngIf=\"showNavNext\" (click)=\"gotoNext()\" class=\"\">\n      <ion-button>\n        <ion-icon slot=\"icon-only\" name=\"arrow-round-forward\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-title text-center class=\"padding-0\" *ngIf=\"(subcategory$ | async) as subcategory\" [routerDirection]=\"'root'\"\n      routerLink=\"/list/{{idxCategory}}/{{idxSubcategory}}\">\n      <img *ngFor=\"let image of subcategory.images\" src=\"../../assets/icon/{{image}}\" class=\"responsive-thumbnail\" />\n      &nbsp;<span class=\"responsive-text\">[ {{idxPosition + 1}} / {{idxLastPosition + 1}} ]</span>\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <div class=\"container\">\n    <div class=\"board_wrapper\" id=\"board-wrapper\">\n      <chessboard #chessboard (engineReady)=\"onEngineReady()\" (engineStartThinking)=\"onEngineStartThinking()\"\n        (engineEndThinking)=\"onEngineEndThinking()\" (engineInfo)=\"onEngineInfo($event)\" (playerMoved)=\"onPlayerMoved()\"\n        (gameOver)=\"onGameOver($event)\">\n      </chessboard>\n    </div>\n    <div class=\"info_wrapper\">\n      <div class=\"info\">\n        <div class=\"innerinfo\" *ngIf=\"(position$ | async) as position\">\n          <p class=\"text-centered\">\n            <img *ngIf=\"targetImage\" src=\"../../assets/icon/{{targetImage}}\" class=\"thumbnail\" />\n            {{('position.' + position.move) | translate}} {{'position.to' | translate}}\n            {{('position.' + position.target) | translate}}\n          </p>\n          <p *ngIf=\"engineThinking\" class=\"text-centered\">\n            <ion-spinner name=\"dots\"></ion-spinner>\n          </p>\n          <p *ngIf=\"!engineThinking\" class=\"text-centered\">{{infotext}}</p>\n          <p *ngIf=\"position.record > 0\" class=\"text-centered\">{{'position.personal-record' | translate}}:\n            {{position.record}} {{'position.moves' | translate}}</p>\n        </div>\n      </div>\n      <div class=\"action_buttons\">\n        <ion-grid>\n          <ion-row *ngIf=\"!engineThinking && !gameOver\">\n            <ion-col>\n              <ion-button [disabled]=\"!btnRewindEnabled\" (click)=\"btnRewindClick()\" size=\"small\" fill=\"clear\"\n                color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"rewind\"></ion-icon>\n              </ion-button>\n            </ion-col>\n            <ion-col>\n              <ion-button [disabled]=\"!btnUndoEnabled\" (click)=\"btnUndoClick()\" size=\"small\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"skip-backward\"></ion-icon>\n              </ion-button>\n            </ion-col>\n            <ion-col>\n              <ion-button [disabled]=\"!btnFlipEnabled\" (click)=\"btnFlipClick()\" size=\"small\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"sync\"></ion-icon>\n              </ion-button>\n            </ion-col>\n            <ion-col>\n              <ion-button [disabled]=\"!btnSolveEnabled\" (click)=\"btnHintlick()\" size=\"small\" fill=\"clear\"\n                color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"bulb\"></ion-icon>\n              </ion-button>\n            </ion-col>\n            <ion-col>\n              <ion-button [disabled]=\"!btnSolveEnabled\" (click)=\"btnSolveClick()\" size=\"small\" fill=\"clear\"\n                color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"color-wand\"></ion-icon>\n              </ion-button>\n            </ion-col>\n          </ion-row>\n          <ion-row *ngIf=\"engineThinking && !gameOver\">\n            <ion-col>\n              <ion-button (click)=\"btnStopEngineClick()\" size=\"small\" expand=\"full\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"square\"></ion-icon>\n              </ion-button>\n            </ion-col>\n          </ion-row>\n          <ion-row *ngIf=\"gameOver\">\n            <ion-col size=\"2\">\n              <ion-button [disabled]=\"autoplaying || chessboard.isShowingFirstPosition()\"\n                (click)=\"btnShowFirstPositionClick()\" size=\"small\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"rewind\"></ion-icon>\n              </ion-button>\n            </ion-col>\n            <ion-col size=\"2\">\n              <ion-button [disabled]=\"autoplaying || chessboard.isShowingFirstPosition()\"\n                (click)=\"btnShowPreviousPositionClick()\" size=\"small\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"skip-backward\"></ion-icon>\n              </ion-button>\n            </ion-col>\n            <ion-col size=\"2\">\n              <ion-button *ngIf=\"!autoplaying\" [disabled]=\"chessboard.isShowingLatestPosition()\"\n                (click)=\"btnPlayClick()\" size=\"small\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"play\"></ion-icon>\n              </ion-button>\n              <ion-button *ngIf=\"autoplaying\" (click)=\"btnPauseClick()\" size=\"small\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"pause\"></ion-icon>\n              </ion-button>\n            </ion-col>\n            <ion-col size=\"2\">\n              <ion-button [disabled]=\"autoplaying || chessboard.isShowingLatestPosition()\"\n                (click)=\"btnShowNextPositionClick()\" size=\"small\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"skip-forward\"></ion-icon>\n              </ion-button>\n            </ion-col>\n            <ion-col size=\"2\">\n              <ion-button [disabled]=\"autoplaying || chessboard.isShowingLatestPosition()\"\n                (click)=\"btnShowLatestPositionClick()\" size=\"small\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"fastforward\"></ion-icon>\n              </ion-button>\n            </ion-col>\n            <ion-col size=\"2\">\n              <ion-button [disabled]=\"autoplaying\" (click)=\"btnRewindClick()\" size=\"small\" fill=\"clear\" color=\"dark\">\n                <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n              </ion-button>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </div>\n    </div>\n  </div>\n</ion-content>"

/***/ }),

/***/ "./src/app/position/position.page.scss":
/*!*********************************************!*\
  !*** ./src/app/position/position.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media (max-width: 500px) {\n  .hideOnSmallWidth {\n    display: none !important; } }\n\n@media (min-width: 500px) {\n  .showOnSmallWidth {\n    display: none !important; } }\n\n.container {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.board_wrapper {\n  float: left;\n  padding-left: 2px; }\n\n.info_wrapper {\n  float: left;\n  /*float: right;*/ }\n\n.info {\n  width: 100%;\n  display: table;\n  height: calc(100% - 52px); }\n\n.innerinfo {\n  display: table-cell;\n  vertical-align: middle; }\n\n.action_buttons {\n  width: 100%;\n  height: 48px; }\n\n.padding-0 {\n  padding-left: 0;\n  padding-right: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yYXZpdmFsbHVyaS9EZXNrdG9wL2NoZXNzR2FtZS9zcmMvYXBwL3Bvc2l0aW9uL3Bvc2l0aW9uLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQURKO0lBRVEsd0JBQXdCLEVBQUEsRUFFL0I7O0FBRUc7RUFESjtJQUVRLHdCQUF3QixFQUFBLEVBRS9COztBQUNEO0VBQ0ksV0FBVztFQUNYLFlBQVk7RUFDWixnQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxXQUFXO0VBQ1gsaUJBQWlCLEVBQUE7O0FBRXJCO0VBQ0ksV0FBVztFQUNYLGdCQUFBLEVBQWlCOztBQUVyQjtFQUNJLFdBQVc7RUFDWCxjQUFjO0VBQ2QseUJBQXlCLEVBQUE7O0FBRTdCO0VBQ0ksbUJBQW1CO0VBQ25CLHNCQUFzQixFQUFBOztBQUUxQjtFQUNJLFdBQVc7RUFDWCxZQUFZLEVBQUE7O0FBRWhCO0VBQ0ksZUFBZTtFQUNmLGdCQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcG9zaXRpb24vcG9zaXRpb24ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhpZGVPblNtYWxsV2lkdGgge1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xuICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuLnNob3dPblNtYWxsV2lkdGgge1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiA1MDBweCkge1xuICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuLmNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG4uYm9hcmRfd3JhcHBlciB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgcGFkZGluZy1sZWZ0OiAycHg7XG59XG4uaW5mb193cmFwcGVyIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICAvKmZsb2F0OiByaWdodDsqL1xufVxuLmluZm8ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNTJweCk7XG59XG4uaW5uZXJpbmZvIHtcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG4uYWN0aW9uX2J1dHRvbnMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNDhweDtcbn1cbi5wYWRkaW5nLTAge1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/position/position.page.ts":
/*!*******************************************!*\
  !*** ./src/app/position/position.page.ts ***!
  \*******************************************/
/*! exports provided: PositionPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositionPage", function() { return PositionPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_native_insomnia_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/insomnia/ngx */ "./node_modules/@ionic-native/insomnia/ngx/index.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared */ "./src/app/shared/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _chessboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../chessboard */ "./src/app/chessboard/index.ts");










var PositionPage = /** @class */ (function () {
    function PositionPage(route, location, menuController, alertController, translate, configurationService, endgameDatabaseService, miscService, insomnia) {
        this.route = route;
        this.location = location;
        this.menuController = menuController;
        this.alertController = alertController;
        this.translate = translate;
        this.configurationService = configurationService;
        this.endgameDatabaseService = endgameDatabaseService;
        this.miscService = miscService;
        this.insomnia = insomnia;
        this.showNavPrev = false;
        this.showNavNext = false;
        this.idx = 1;
        this.targetImage = '';
        this.infotext = '';
        this.btnRewindEnabled = false;
        this.btnUndoEnabled = false;
        this.btnFlipEnabled = false;
        this.btnSolveEnabled = false;
        this.autosolve = false;
        this.autosolveUsed = false;
        this.engineThinking = false;
        this.gameOver = false;
        this.autoplaying = false;
    }
    PositionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.idxCategory = +params.idxcategory;
            _this.idxSubcategory = +params.idxsubcategory;
            _this.idxPosition = +params.idxposition;
            _this.endgameDatabaseService.initialize().then(function (result) {
                _this.endgameDatabase = _this.endgameDatabaseService.getDatabase();
                _this.load();
            });
        });
    };
    PositionPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.configurationService.initialize().then(function (config) {
            _this.configuration = config;
            if (config.preventScreenOff) {
                _this.insomnia.keepAwake();
            }
        });
        this.menuController.get('mainMenu').then(function (menu) {
            menu.swipeGesture = false;
        });
    };
    PositionPage.prototype.ionViewWillLeave = function () {
        if (this.configuration && this.configuration.preventScreenOff) {
            this.insomnia.allowSleepAgain();
        }
        this.stopAutoplay();
        this.menuController.get('mainMenu').then(function (menu) {
            menu.swipeGesture = true;
        });
    };
    PositionPage.prototype.ngOnDestroy = function () {
    };
    PositionPage.prototype.onResize = function (event) {
        var container = document.querySelector('.container');
        var boardWrapper = document.querySelector('.board_wrapper');
        var infoWrapper = document.querySelector('.info_wrapper');
        var containerWidth = container.clientWidth;
        var containerHeight = container.clientHeight;
        var minSize = Math.min(containerWidth, containerHeight);
        boardWrapper.style.height = minSize + 'px';
        boardWrapper.style.width = minSize + 'px';
        if (containerWidth > containerHeight) {
            infoWrapper.style.width = containerWidth - minSize - 2 + 'px';
            infoWrapper.style.height = '100%';
        }
        else {
            infoWrapper.style.width = '100%';
            infoWrapper.style.height = containerHeight - minSize - 2 + 'px';
        }
    };
    PositionPage.prototype.load = function () {
        var _this = this;
        this.category = this.endgameDatabase.categories[this.idxCategory];
        this.subcategory = this.category.subcategories[this.idxSubcategory];
        this.position = this.subcategory.games[this.idxPosition];
        this.subcategory.images = this.miscService.textToImages(this.subcategory.name);
        this.category$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(this.category);
        this.subcategory$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(this.subcategory);
        this.position$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(this.position);
        this.idxLastSubcategory = this.endgameDatabase.categories[this.idxCategory].subcategories.length - 1;
        this.idxLastPosition = this.endgameDatabase.categories[this.idxCategory].subcategories[this.idxSubcategory].games.length - 1;
        this.showNavPrev = this.idxSubcategory > 0 || this.idxCategory > 0 || this.idxPosition > 0;
        this.showNavNext = !(this.idxCategory === this.endgameDatabase.categories.length - 1
            && this.idxSubcategory === this.idxLastSubcategory
            && this.idxPosition === this.idxLastPosition);
        if ('white' === this.position.move) {
            this.targetImage = 'wK.png';
        }
        else {
            this.targetImage = 'bK.png';
        }
        this.chessboard.build(this.position.fen, this.position.target);
        this.engineThinking = false;
        this.gameOver = false;
        this.btnRewindEnabled = false;
        this.btnUndoEnabled = false;
        this.btnFlipEnabled = true;
        this.btnSolveEnabled = true;
        this.translate.get([
            'position.your-turn',
            'position.used-assistance',
            'position.new-record',
            'position.goal-achieved',
            'position.congratulations',
            'position.review',
            'position.next-puzzle',
            'position.in',
            'position.moves',
            'position.ups',
            'position.keep-practicing',
            'position.ok'
        ]).subscribe(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.literales = res;
                this.infotext = this.literales['position.your-turn'];
                return [2 /*return*/];
            });
        }); });
    };
    PositionPage.prototype.onEngineReady = function () {
    };
    PositionPage.prototype.onEngineStartThinking = function () {
        this.engineThinking = true;
    };
    PositionPage.prototype.onEngineEndThinking = function () {
        this.engineThinking = false;
        if (this.infotext !== this.literales['position.your-turn'])
            this.infotext += ' : ' + this.literales['position.your-turn'];
    };
    PositionPage.prototype.onEngineInfo = function (info) {
        this.infotext = info;
    };
    PositionPage.prototype.onPlayerMoved = function () {
        this.btnRewindEnabled = true;
        this.btnUndoEnabled = true;
    };
    PositionPage.prototype.onGameOver = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var header, subHeader, text, buttons, totalMoves, playerMoves, alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.engineThinking = false;
                        this.infotext = message;
                        this.gameOver = true;
                        if (this.autosolve) {
                            this.autosolve = false;
                            return [2 /*return*/];
                        }
                        if ((message === 'Checkmate' && this.chessboard.winner() === this.position.move) || (this.position.target !== 'checkmate' && message !== 'Checkmate')) {
                            totalMoves = this.chessboard.history().length;
                            playerMoves = void 0;
                            if (totalMoves % 2 === 0) {
                                playerMoves = totalMoves / 2;
                            }
                            else {
                                playerMoves = (totalMoves + 1) / 2;
                            }
                            if (this.autosolveUsed) {
                                header = this.literales['position.used-assistance'];
                                buttons = [{
                                        test: this.literales['position.ok'],
                                        cssClass: 'overlay-button'
                                    }];
                            }
                            else {
                                if (!this.position.record || this.position.record < 0 || playerMoves < this.position.record) {
                                    subHeader = this.literales['position.new-record'];
                                    this.position.record = playerMoves;
                                    this.endgameDatabaseService.saveDatabase();
                                }
                                else {
                                    subHeader = this.literales['position.goal-achieved'];
                                }
                                header = this.literales['position.congratulations'];
                                if (this.showNavNext) {
                                    buttons = [
                                        {
                                            text: this.literales['position.review'],
                                            cssClass: 'overlay-button'
                                        },
                                        {
                                            text: this.literales['position.next-puzzle'],
                                            cssClass: 'overlay-button',
                                            handler: function () { _this.gotoNext(); }
                                        }
                                    ];
                                }
                                else {
                                    buttons = [{
                                            text: this.literales['position.ok'],
                                            cssClass: 'overlay-button'
                                        }];
                                }
                            }
                            text = this.infotext + ' ' + this.literales['position.in'] + ' ' + playerMoves + ' ' + this.literales['position.moves'];
                        }
                        else {
                            if (!this.position.record) {
                                this.position.record = -1;
                                this.endgameDatabaseService.saveDatabase();
                            }
                            header = this.literales['position.ups'];
                            subHeader = message;
                            text = this.literales['position.keep-practicing'];
                            buttons = [{
                                    text: this.literales['position.ok'],
                                    cssClass: 'overlay-button'
                                }];
                        }
                        return [4 /*yield*/, this.alertController.create({
                                header: header,
                                subHeader: subHeader,
                                message: text,
                                buttons: buttons
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PositionPage.prototype.btnRewindClick = function () {
        this.chessboard.rewind();
        this.autosolveUsed = false;
        this.btnRewindEnabled = false;
        this.btnUndoEnabled = false;
        this.gameOver = false;
        this.infotext = this.literales['position.your-turn'];
    };
    PositionPage.prototype.btnUndoClick = function () {
        this.chessboard.undo();
        var history = this.chessboard.history();
        this.btnRewindEnabled = history.length > 0;
        this.btnUndoEnabled = this.btnRewindEnabled;
        this.infotext = this.literales['position.your-turn'];
    };
    PositionPage.prototype.btnFlipClick = function () {
        this.chessboard.flip();
    };
    PositionPage.prototype.btnSolveClick = function () {
        this.autosolve = true;
        this.autosolveUsed = true;
        this.chessboard.solve();
    };
    PositionPage.prototype.btnHintlick = function () {
        this.autosolveUsed = true;
        this.chessboard.hint();
    };
    PositionPage.prototype.btnStopEngineClick = function () {
        this.chessboard.stop();
        if (this.autosolve) {
            this.autosolve = false;
        }
    };
    PositionPage.prototype.btnShowFirstPositionClick = function () {
        this.chessboard.showFirstPosition();
    };
    PositionPage.prototype.btnShowPreviousPositionClick = function () {
        this.chessboard.showPreviousPosition();
    };
    PositionPage.prototype.btnShowNextPositionClick = function () {
        this.chessboard.showNextPosition();
    };
    PositionPage.prototype.btnShowLatestPositionClick = function () {
        this.chessboard.showLatestPosition();
    };
    PositionPage.prototype.btnPlayClick = function () {
        var self = this;
        this.autoplaying = true;
        if (this.internalPlay()) {
            this.intervalPlay = setInterval(function () {
                if (!self.internalPlay()) {
                    clearInterval(self.intervalPlay);
                    self.intervalPlay = null;
                }
            }, 1000);
        }
    };
    PositionPage.prototype.internalPlay = function () {
        this.chessboard.showNextPosition();
        if (this.chessboard.isShowingLatestPosition()) {
            this.autoplaying = false;
            return false;
        }
        return true;
    };
    PositionPage.prototype.btnPauseClick = function () {
        this.autoplaying = false;
        clearInterval(this.intervalPlay);
    };
    PositionPage.prototype.stopAutoplay = function () {
        if (this.intervalPlay) {
            clearInterval(this.intervalPlay);
            this.intervalPlay = null;
            this.autoplaying = false;
        }
    };
    PositionPage.prototype.gotoPrev = function () {
        this.stopAutoplay();
        var idxCat = this.idxCategory;
        var idxSub = this.idxSubcategory;
        var idxPos = this.idxPosition - 1;
        if (idxPos < 0) {
            idxSub--;
            if (idxSub < 0) {
                idxCat--;
                idxSub = this.endgameDatabase.categories[idxCat].subcategories.length - 1;
            }
            idxPos = this.endgameDatabase.categories[idxCat].subcategories[idxSub].games.length - 1;
        }
        //this.navCtrl.navigateRoot('/position/'+ idxCat + '/' + idxSub + '/' + idxPos);
        this.idxCategory = idxCat;
        this.idxSubcategory = idxSub;
        this.idxPosition = idxPos;
        this.location.go('/position/' + idxCat + '/' + idxSub + '/' + idxPos);
        this.load();
    };
    PositionPage.prototype.gotoNext = function () {
        this.stopAutoplay();
        var idxCat = this.idxCategory;
        var idxSub = this.idxSubcategory;
        var idxPos = this.idxPosition + 1;
        if (idxPos > this.idxLastPosition) {
            idxSub++;
            if (idxSub > this.idxLastSubcategory) {
                idxCat++;
                idxSub = 0;
            }
            idxPos = 0;
        }
        //this.navCtrl.navigateRoot('/position/'+ idxCat + '/' + idxSub + '/' + idxPos);
        this.idxCategory = idxCat;
        this.idxSubcategory = idxSub;
        this.idxPosition = idxPos;
        this.location.go('/position/' + idxCat + '/' + idxSub + '/' + idxPos);
        this.load();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('chessboard'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _chessboard__WEBPACK_IMPORTED_MODULE_9__["ChessboardComponent"])
    ], PositionPage.prototype, "chessboard", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:resize', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], PositionPage.prototype, "onResize", null);
    PositionPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-position',
            template: __webpack_require__(/*! ./position.page.html */ "./src/app/position/position.page.html"),
            styles: [__webpack_require__(/*! ./position.page.scss */ "./src/app/position/position.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["MenuController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"],
            _shared__WEBPACK_IMPORTED_MODULE_5__["ConfigurationService"],
            _shared__WEBPACK_IMPORTED_MODULE_5__["EndgameDatabaseService"],
            _shared__WEBPACK_IMPORTED_MODULE_5__["MiscService"],
            _ionic_native_insomnia_ngx__WEBPACK_IMPORTED_MODULE_4__["Insomnia"]])
    ], PositionPage);
    return PositionPage;
}());



/***/ })

}]);
//# sourceMappingURL=position-position-module.js.map