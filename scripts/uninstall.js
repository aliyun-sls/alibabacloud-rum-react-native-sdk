#!/usr/bin/env node
"use strict";
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileOperationHelper_1 = require("../lib/util/fileOperationHelper");
const pathsConstants_1 = require("../lib/util/pathsConstants");
const nodePath = require("path");
module.exports = (function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield modifyPackageJson();
    });
}());
function modifyPackageJson() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pathToPackageJson = pathsConstants_1.default.getPackageJsonFile();
            let packageJson = yield fileOperationHelper_1.default.readTextFromFile(pathToPackageJson);
            let packageJsonParsed = JSON.parse(packageJson);
            if (packageJsonParsed.scripts !== undefined && packageJsonParsed.scripts.instrumentOpenRUM !== undefined) {
                delete packageJsonParsed.scripts.instrumentOpenRUM;
                yield fileOperationHelper_1.default.writeTextToFile(pathToPackageJson, JSON.stringify(packageJsonParsed));
                console.info("Modified package.json - Removed the instrumentDynatrace script!");
            }
            yield removePatchMetroSourceMap();
        }
        catch (e) {
            console.error("Could not find package.json - please remove instrumentDynatrace script manually!");
        }
    });
}
function removePatchMetroSourceMap() {
    return __awaiter(this, void 0, void 0, function* () {
        console.info("Undo Patching SourceMap generation of Metro .. ");
        try {
            let currentSourceMapPath = nodePath.join(pathsConstants_1.path.getMetroSouceMapPath(), "getSourceMapInfo.js");
            let origSourceMapPath = nodePath.join(pathsConstants_1.path.getMetroSouceMapPath(), "getSourceMapInfoOrig.js");
            yield fileOperationHelper_1.default.checkIfFileExists(origSourceMapPath);
            yield fileOperationHelper_1.default.deleteFile(currentSourceMapPath);
            yield fileOperationHelper_1.default.renameFile(origSourceMapPath, currentSourceMapPath);
            console.info("Removed patch for SourceMap generation of Metro!");
        }
        catch (e) {
            console.info("Removing of patch for SourceMap generation failed!");
        }
    });
}
