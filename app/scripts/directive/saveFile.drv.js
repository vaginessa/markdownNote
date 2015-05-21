// saveFile.drv.js

'use strict';

function saveFile (fileService) {


  function saveFileController () {

    // function onDeviceReady (rootDirectory) {
    //   window.resolveLocalFileSystemURL(rootDirectory, onResolveSuccess, fail);
    // }

    // function onResolveSuccess (directoryEntry) {
    //   directoryEntry.getFile(fileService.filePath, {create: true, exclusive: false}, gotFileEntry, fail);
    // }

    // function gotFileEntry (fileEntry) {
    //   fileEntry.createWriter(gotFileWriter, fail);
    // }

    // function gotFileWriter (writer) {
    //   writer.write('some sample text from simpleNotes.json, ' +
    //     'saved to ' + fileService.filePath + ' at ' + new Date().toString());

    //   writer.onwrite = function(evt) {
    //     console.log("write success");
    //   };
    // }

    // function fail(error) {
    //   console.log('spikeCordovaFile: ERROR: ' + error.code);
    // }

    // only testing purpose, must be del !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //$(document).trigger('deviceready');

   /*jshint validthis: true */
    var controller = this;

    controller.fail = function (error) {
      console.log('spikeCordovaFile: ERROR: ' + error.code);
    };

    controller.gotFileWriter = function (writer) {
      writer.write('some sample text from simpleNotes.json, ' +
        'saved to ' + fileService.filePath + ' at ' + new Date().toString());

      writer.onwrite = function(evt) {
        console.log("write success");
      };
    };

    controller.gotFileEntry = function (fileEntry) {
      fileEntry.createWriter(controller.gotFileWriter, controller.fail);
    };

    controller.onResolveSuccess = function (directoryEntry) {
      directoryEntry.getFile(fileService.filePath,
        {create: true, exclusive: false}, controller.gotFileEntry, controller.fail);
    };

    controller.onDeviceReady = function (rootDirectory) {
      window.resolveLocalFileSystemURL(rootDirectory, controller.onResolveSuccess, controller.fail);
    };

    controller.saveText = function () {
      if (fileService.deviceready) {
        controller.onDeviceReady(fileService.rootDirectory);
      }
    };

    controller.saveText = function () {
      if (fileService.deviceReady) {
        console.log('save button clicked, device is ready');
        controller.onDeviceReady(fileService.rootDirectory);
      }
    };
  }

  return {
    restrict: 'E',
    controller: saveFileController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/save-file.drv.html'
  };
}

angular.module('simpleNote').directive('saveFile', saveFile);
