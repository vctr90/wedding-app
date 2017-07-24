'use-strict';
(() => {
  const Connection = require('./../modules/connection.js');
  const endpointBases = require('./../modules/endpointBases.js');
  const base = endpointBases.invitation;

  class Invitation extends Connection {
    constructor({ invitationId }) {
      super(endpointBases.invitation);
      this.invitationId = invitationId;
    }

    getGuests() {
      return this.get(`getGuests/${this.invitationId}`);
    }

    handleConfirmation(guestIds) {
      return this.post(`confirm`, {
        'invitationId': this.invitationId,
        'guestIds': guestIds
      });
    }

    getNumberOfConfirmedGuests() {
      return this.get(`getNumberOfConfirmedGuests`);
    }

    confirmSingleGuest(guestId) {
      return this.post(`confirmSingleGuest`, {
        guestId,
        invitationId: this.invitationId,
      });
    }

    unConfirmSinglueGUest(guestId) {
    }
  }

  module.exports = Invitation;

  /*
  const myNewInvitation = new Invitation({
    invitationId: 'weijd12'
  });

   * USAGE
  myNewInvitation.getGuests()
    .then(guestResponse => console.log(guestResponse))
    .catch(error => console.log(error));
  myNewInvitation.handleConfirmation([
    'aygfa',
    'yaauno.com'
  ])
    .then(guestResponse => console.log(guestResponse))
    .catch(error => console.log(error));
  myNewInvitation.getNumberOfConfirmedGuests()
    .then(guestResponse => console.log(guestResponse))
    .catch(error => console.log(error));
  */
})();
