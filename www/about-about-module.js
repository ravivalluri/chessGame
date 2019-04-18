(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["about-about-module"],{

/***/ "./src/app/about/about.module.ts":
/*!***************************************!*\
  !*** ./src/app/about/about.module.ts ***!
  \***************************************/
/*! exports provided: AboutPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPageModule", function() { return AboutPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _about_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about.page */ "./src/app/about/about.page.ts");





var AboutPageModule = /** @class */ (function () {
    function AboutPageModule() {
    }
    AboutPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _about_page__WEBPACK_IMPORTED_MODULE_4__["AboutPage"]
                    }
                ])
            ],
            declarations: [_about_page__WEBPACK_IMPORTED_MODULE_4__["AboutPage"]]
        })
    ], AboutPageModule);
    return AboutPageModule;
}());



/***/ }),

/***/ "./src/app/about/about.page.html":
/*!***************************************!*\
  !*** ./src/app/about/about.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      {{'about.title' | translate}}\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item lines=\"none\">\n      <p>{{'about.description' | translate}}</p>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <a (click)=\"openLink('https://github.com/supertorpe/chessendgametraining')\">{{'about.source-code' | translate}}</a>\n    </ion-item>\n    <ion-item>\n      <p>{{'about.third-party' | translate}}</p>\n    </ion-item>\n    <!-- ECO -->\n    <ion-item lines=\"none\">\n      <a (click)=\"openLink('http://ecochessopeningcodes.blogspot.com.es/2016/01/play-chess-endgame-positions-with.html')\">\n        ECO Chess Opening Codes</a>\n    </ion-item>\n    <ion-item>\n      <p>{{'about.eco-description' | translate}}</p>\n    </ion-item>\n    <!-- chess.js -->\n    <ion-item lines=\"none\">\n      <a (click)=\"openLink('https://github.com/jhlywa/chess.js')\">chess.js</a>\n    </ion-item>\n    <ion-item>\n      <p>{{'about.chessjs-description' | translate}}</p>\n    </ion-item>\n    <!-- chessboard.js -->\n    <ion-item lines=\"none\">\n      <a (click)=\"openLink('http://chessboardjs.com')\">chessboard.js</a>\n    </ion-item>\n    <ion-item>\n      <p>{{'about.chessboard-description' | translate}}</p>\n    </ion-item>\n    <!-- stockfish.js -->\n    <ion-item lines=\"none\">\n      <a (click)=\"openLink('https://github.com/niklasf/stockfish.js')\">stockfish.js</a>\n    </ion-item>\n    <ion-item>\n      <p>{{'about.stockfish-description' | translate}}</p>\n    </ion-item>\n    <!-- syzygy-->\n    <ion-item lines=\"none\">\n      <a (click)=\"openLink('https://github.com/niklasf/lila-tablebase')\">Syzygy endgame\n        tablebases</a>\n    </ion-item>\n    <ion-item>\n      <p>{{'about.syzygy-description' | translate}}</p>\n    </ion-item>\n    <!-- icons -->\n    <ion-item lines=\"none\">\n      <p>{{'about.multimedia-from' | translate}} :</p>\n    </ion-item>\n    <ion-item>\n      <p>pacifier: designed by Smashicons from Flaticon</p>\n    </ion-item>\n    <ion-item>\n      <p>logo: designed by Inipagi from Iconfinder</p>\n    </ion-item>\n    <ion-item>\n      <p>chess pieces: from Wikimedia Commons, by user Cburnett</p>\n    </ion-item>\n    <ion-item>\n      <p>Move sound: from lichess static resources</p>\n    </ion-item>\n    <ion-item>\n      <p>Success sound: shinephoenixstormcrow from freesound.org</p>\n    </ion-item>\n    <ion-item>\n      <p>Fail sound: Bertrof from freesound.org</p>\n    </ion-item>\n  </ion-list>\n</ion-content>"

/***/ }),

/***/ "./src/app/about/about.page.scss":
/*!***************************************!*\
  !*** ./src/app/about/about.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".welcome-card ion-img {\n  max-height: 35vh;\n  overflow: hidden; }\n\na {\n  color: var(--ion-color-tertiary); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yYXZpdmFsbHVyaS9EZXNrdG9wL2NoZXNzR2FtZS9zcmMvYXBwL2Fib3V0L2Fib3V0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0IsRUFBQTs7QUFFbEI7RUFDRSxnQ0FBZ0MsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2Fib3V0L2Fib3V0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi53ZWxjb21lLWNhcmQgaW9uLWltZyB7XG4gIG1heC1oZWlnaHQ6IDM1dmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5hIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG59Il19 */"

/***/ }),

/***/ "./src/app/about/about.page.ts":
/*!*************************************!*\
  !*** ./src/app/about/about.page.ts ***!
  \*************************************/
/*! exports provided: AboutPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPage", function() { return AboutPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AboutPage = /** @class */ (function () {
    function AboutPage() {
    }
    AboutPage.prototype.openLink = function (url) {
        window.open(url, '_system');
    };
    ;
    AboutPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(/*! ./about.page.html */ "./src/app/about/about.page.html"),
            styles: [__webpack_require__(/*! ./about.page.scss */ "./src/app/about/about.page.scss")]
        })
    ], AboutPage);
    return AboutPage;
}());



/***/ })

}]);
//# sourceMappingURL=about-about-module.js.map