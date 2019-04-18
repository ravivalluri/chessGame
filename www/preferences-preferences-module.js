(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["preferences-preferences-module"],{

/***/ "./src/app/preferences/preferences.module.ts":
/*!***************************************************!*\
  !*** ./src/app/preferences/preferences.module.ts ***!
  \***************************************************/
/*! exports provided: PreferencesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferencesPageModule", function() { return PreferencesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _preferences_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preferences.page */ "./src/app/preferences/preferences.page.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared */ "./src/app/shared/index.ts");





var PreferencesPageModule = /** @class */ (function () {
    function PreferencesPageModule() {
    }
    PreferencesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _preferences_page__WEBPACK_IMPORTED_MODULE_3__["PreferencesPage"]
                    }
                ])
            ],
            declarations: [_preferences_page__WEBPACK_IMPORTED_MODULE_3__["PreferencesPage"]]
        })
    ], PreferencesPageModule);
    return PreferencesPageModule;
}());



/***/ }),

/***/ "./src/app/preferences/preferences.page.html":
/*!***************************************************!*\
  !*** ./src/app/preferences/preferences.page.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      {{'preferences.title' | translate}}\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <ion-list *ngIf=\"configuration\">\n    <ion-item (click)=\"toggleThemes()\">\n      <ion-label>{{'preferences.color-theme' | translate}}</ion-label>\n      <ion-icon slot=\"end\" [name]=\"showThemes ? 'arrow-dropdown' : 'arrow-dropright'\" color=\"medium\"></ion-icon>\n    </ion-item>\n    <ion-item [ngClass]=\"{'ion-hide': !showThemes}\" *ngFor=\"let theme of themeSwitcherService.getThemes()\" button=\"true\" (click)=\"selectTheme(theme.name)\">\n      <div slot=\"start\" class=\"dot\" [ngStyle]=\"{'background-color': theme.mainColor}\"></div>\n      <ion-label text-centered>{{theme.name}}</ion-label>\n    </ion-item>\n    <ion-item button=\"true\" (click)=\"cleanDatabase()\">\n      <ion-label>{{'preferences.clean-database' | translate}}</ion-label>\n      <ion-icon slot=\"end\" name=\"trash\" color=\"medium\"></ion-icon>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{'preferences.goto-position' | translate}}</ion-label>\n      <ion-toggle slot=\"end\" [(ngModel)]=\"configuration.automaticShowFirstPosition\" color=\"medium\"></ion-toggle>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{'preferences.play-sounds' | translate}}</ion-label>\n      <ion-toggle slot=\"end\" [(ngModel)]=\"configuration.playSounds\" color=\"medium\"></ion-toggle>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{'preferences.prevent-screen-off' | translate}}</ion-label>\n      <ion-toggle slot=\"end\" [(ngModel)]=\"configuration.preventScreenOff\" color=\"medium\"></ion-toggle>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{'preferences.use-syzygy' | translate}}</ion-label>\n      <ion-toggle slot=\"end\" [(ngModel)]=\"configuration.useSyzygy\" color=\"medium\"></ion-toggle>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{'preferences.stockfish-depth' | translate}}: {{configuration.stockfishDepth}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-range min=\"20\" max=\"40\" [(ngModel)]=\"configuration.stockfishDepth\" color=\"medium\"></ion-range>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <ion-button *ngIf=\"configuration\" (click)=\"save()\" color=\"primary\" size=\"default\" expand=\"full\">\n    <ion-icon slot=\"start\" name=\"save\"></ion-icon>\n    <ion-label>{{'preferences.save-changes' | translate}}</ion-label>\n  </ion-button>\n</ion-footer>"

/***/ }),

/***/ "./src/app/preferences/preferences.page.scss":
/*!***************************************************!*\
  !*** ./src/app/preferences/preferences.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dot {\n  height: 25px;\n  width: 25px;\n  border-radius: 50%;\n  display: inline-block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yYXZpdmFsbHVyaS9EZXNrdG9wL2NoZXNzR2FtZS9zcmMvYXBwL3ByZWZlcmVuY2VzL3ByZWZlcmVuY2VzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLHFCQUFxQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcHJlZmVyZW5jZXMvcHJlZmVyZW5jZXMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRvdCB7XG4gIGhlaWdodDogMjVweDtcbiAgd2lkdGg6IDI1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/preferences/preferences.page.ts":
/*!*************************************************!*\
  !*** ./src/app/preferences/preferences.page.ts ***!
  \*************************************************/
/*! exports provided: PreferencesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferencesPage", function() { return PreferencesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");





var PreferencesPage = /** @class */ (function () {
    function PreferencesPage(endgameDatabaseService, configurationService, toast, alertController, translate, themeSwitcherService) {
        var _this = this;
        this.endgameDatabaseService = endgameDatabaseService;
        this.configurationService = configurationService;
        this.toast = toast;
        this.alertController = alertController;
        this.translate = translate;
        this.themeSwitcherService = themeSwitcherService;
        this.showThemes = false;
        this.configurationService.initialize().then(function (config) {
            _this.configuration = config;
        });
        this.translate.get([
            'preferences.clean-dialog.title',
            'preferences.records-removed',
            'preferences.clean-dialog.subtitle',
            'preferences.clean-dialog.message',
            'preferences.clean-dialog.cancel',
            'preferences.clean-dialog.continue',
            'preferences.changes-saved'
        ]).subscribe(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.literals = res;
                return [2 /*return*/];
            });
        }); });
    }
    PreferencesPage.prototype.toggleThemes = function () {
        this.showThemes = !this.showThemes;
    };
    PreferencesPage.prototype.selectTheme = function (theme) {
        this.configuration.colorTheme = theme;
        this.themeSwitcherService.setTheme(theme);
    };
    PreferencesPage.prototype.cleanDatabase = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: this.literals['preferences.clean-dialog.title'],
                            subHeader: this.literals['preferences.clean-dialog.subtitle'],
                            message: this.literals['preferences.clean-dialog.message'],
                            buttons: [
                                {
                                    text: this.literals['preferences.clean-dialog.cancel'],
                                    role: 'cancel',
                                    cssClass: 'overlay-button',
                                    handler: function () {
                                    }
                                }, {
                                    text: this.literals['preferences.clean-dialog.continue'],
                                    cssClass: 'overlay-button',
                                    handler: function () {
                                        _this.endgameDatabaseService.cleanDatabase().then(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                            var toast;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.toast.create({
                                                            message: this.literals['preferences.records-removed'],
                                                            position: 'middle',
                                                            color: 'success',
                                                            duration: 1000
                                                        })];
                                                    case 1:
                                                        toast = _a.sent();
                                                        toast.present();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }
                                }
                            ]
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
    PreferencesPage.prototype.save = function () {
        var _this = this;
        this.configurationService.save().then(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toast.create({
                            message: this.literals['preferences.changes-saved'],
                            position: 'middle',
                            color: 'success',
                            duration: 1000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PreferencesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-preferences',
            template: __webpack_require__(/*! ./preferences.page.html */ "./src/app/preferences/preferences.page.html"),
            styles: [__webpack_require__(/*! ./preferences.page.scss */ "./src/app/preferences/preferences.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared__WEBPACK_IMPORTED_MODULE_2__["EndgameDatabaseService"],
            _shared__WEBPACK_IMPORTED_MODULE_2__["ConfigurationService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"],
            _shared__WEBPACK_IMPORTED_MODULE_2__["ThemeSwitcherService"]])
    ], PreferencesPage);
    return PreferencesPage;
}());



/***/ })

}]);
//# sourceMappingURL=preferences-preferences-module.js.map