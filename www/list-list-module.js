(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["list-list-module"],{

/***/ "./src/app/list/list.module.ts":
/*!*************************************!*\
  !*** ./src/app/list/list.module.ts ***!
  \*************************************/
/*! exports provided: ListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPageModule", function() { return ListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _list_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list.page */ "./src/app/list/list.page.ts");





var ListPageModule = /** @class */ (function () {
    function ListPageModule() {
    }
    ListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _list_page__WEBPACK_IMPORTED_MODULE_4__["ListPage"]
                    }
                ])
            ],
            declarations: [_list_page__WEBPACK_IMPORTED_MODULE_4__["ListPage"]]
        })
    ], ListPageModule);
    return ListPageModule;
}());



/***/ }),

/***/ "./src/app/list/list.page.html":
/*!*************************************!*\
  !*** ./src/app/list/list.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title text-center *ngIf=\"(category$ | async) as category\">\n        {{'category.' + category.name | translate}} [ {{idxSubcategory + 1}} / {{idxLastSubcategory + 1}} ]\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-toolbar color=\"light\">\n  <ion-buttons slot=\"start\" *ngIf=\"showNavPrev\" (click)=\"gotoPrev()\">\n    <ion-button>\n      <ion-icon slot=\"icon-only\" name=\"arrow-round-back\"></ion-icon>\n    </ion-button>\n  </ion-buttons>\n  <ion-buttons slot=\"end\" *ngIf=\"showNavNext\" (click)=\"gotoNext()\">\n    <ion-button>\n      <ion-icon slot=\"icon-only\" name=\"arrow-round-forward\"></ion-icon>\n    </ion-button>\n  </ion-buttons>\n  <ion-title text-center *ngIf=\"(subcategory$ | async) as subcategory\">\n      <img *ngFor=\"let image of subcategory.images\" src=\"../../assets/icon/{{image}}\" class=\"responsive-thumbnail\" />\n  </ion-title>\n</ion-toolbar>\n<ion-content>\n    <ion-grid *ngIf=\"(subcategory$ | async) as subcategory\">\n        <ion-row *ngFor=\"let chunk of subcategory.games | chunks: 6; index as idxChunk\">\n          <ion-col *ngFor=\"let game of chunk; index as idxGame\" size=\"2\">\n            <ion-button [color]=\"!game.record ? 'light' : game.record < 0 ? 'warning' : 'success' \" expand=\"block\" (click)=\"showPosition(idxGame + idxChunk * 6)\">{{1 + idxGame + idxChunk * 6}}</ion-button>\n          </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/list/list.page.scss":
/*!*************************************!*\
  !*** ./src/app/list/list.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xpc3QvbGlzdC5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/list/list.page.ts":
/*!***********************************!*\
  !*** ./src/app/list/list.page.ts ***!
  \***********************************/
/*! exports provided: ListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPage", function() { return ListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared */ "./src/app/shared/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");







var ListPage = /** @class */ (function () {
    function ListPage(route, location, navCtrl, endgameDatabaseService, miscService) {
        this.route = route;
        this.location = location;
        this.navCtrl = navCtrl;
        this.endgameDatabaseService = endgameDatabaseService;
        this.miscService = miscService;
        this.showNavPrev = false;
        this.showNavNext = false;
        this.idx = 1;
    }
    ListPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.idxCategory = +params.idxcategory;
            _this.idxSubcategory = +params.idxsubcategory;
            _this.endgameDatabaseService.initialize().then(function (result) {
                _this.endgameDatabase = _this.endgameDatabaseService.getDatabase();
                _this.load();
            });
        });
    };
    ListPage.prototype.load = function () {
        var cat = this.endgameDatabase.categories[this.idxCategory];
        var subcat = cat.subcategories[this.idxSubcategory];
        subcat.images = this.miscService.textToImages(subcat.name);
        this.category$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(cat);
        this.subcategory$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(subcat);
        this.idxLastSubcategory = this.endgameDatabase.categories[this.idxCategory].subcategories.length - 1;
        this.showNavPrev = this.idxSubcategory > 0 || this.idxCategory > 0;
        this.showNavNext = !(this.idxCategory === this.endgameDatabase.categories.length - 1 && this.idxSubcategory === this.idxLastSubcategory);
    };
    ListPage.prototype.gotoPrev = function () {
        var idxCat = this.idxCategory;
        var idxSub = this.idxSubcategory - 1;
        if (idxSub < 0) {
            idxCat--;
            idxSub = this.endgameDatabase.categories[idxCat].subcategories.length - 1;
        }
        //this.navCtrl.navigateRoot('/list/'+ idxCat + '/' + idxSub);
        this.idxCategory = idxCat;
        this.idxSubcategory = idxSub;
        this.location.go('/list/' + idxCat + '/' + idxSub);
        this.load();
    };
    ListPage.prototype.gotoNext = function () {
        var idxCat = this.idxCategory;
        var idxSub = this.idxSubcategory + 1;
        if (idxSub > this.idxLastSubcategory) {
            idxCat++;
            idxSub = 0;
        }
        //this.navCtrl.navigateRoot('/list/'+ idxCat + '/' + idxSub);
        this.idxCategory = idxCat;
        this.idxSubcategory = idxSub;
        this.location.go('/list/' + idxCat + '/' + idxSub);
        this.load();
    };
    ListPage.prototype.showPosition = function (idxGame) {
        this.navCtrl.navigateRoot('/position/' + this.idxCategory + '/' + this.idxSubcategory + '/' + idxGame);
    };
    ListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-list',
            template: __webpack_require__(/*! ./list.page.html */ "./src/app/list/list.page.html"),
            styles: [__webpack_require__(/*! ./list.page.scss */ "./src/app/list/list.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"],
            _shared__WEBPACK_IMPORTED_MODULE_4__["EndgameDatabaseService"],
            _shared__WEBPACK_IMPORTED_MODULE_4__["MiscService"]])
    ], ListPage);
    return ListPage;
}());



/***/ })

}]);
//# sourceMappingURL=list-list-module.js.map