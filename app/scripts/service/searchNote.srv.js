// searchNote.srv.js

'use strict';

function searchNote($ionicScrollDelegate) {
  return {
    searchTerm: '',
    opened: false,

    toggleSearchInput: function () {
      this.opened = !this.opened;
      $ionicScrollDelegate.scrollTop();
    },
  };
}

angular.module('markdownNote').factory('searchNote', searchNote);
