'use strict';

const knex = require('./../knex.js');
const guest = 'guest';

class InvitationModel {
  constructor() {
  }

  confirmGuests(guests, invitationId) {
    const guestsConfirmationPromises = [ this.setAllConfirmationForAnInvitationToFalse(invitationId), ...guests
      .map(guest => {
      return this.confirmSingleGuest(guest, invitationId);
    }) ]

    return Promise.all(guestsConfirmationPromises);
  }

  confirmSingleGuest(name, invitationId) {
    return knex(guest)
      .where({
        name,
        invitation_id: invitationId
      })
      .update({
        confirmed: true
      })
  }

  setAllConfirmationForAnInvitationToFalse(invitationId) {
    return knex(guest)
      .where({
        invitation_id: invitationId
      })
      .update({
        confirmed: false
      });
  }

  getAllGuestsBasedOnInvitation(invitationId) {
    return knex(guest)
      .where({
        invitation_id: invitationId
      })
      .select('name', 'id', 'confirmed');
  }

  getNumberOfConfirmedGuests() {
    return knex(guest)
      .where({
        confirmed: true
      })
      .count()
  }

} 

module.exports = InvitationModel;
