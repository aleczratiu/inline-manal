const createTrackingObject = user => {
  if (!user) {
    throw new Error(
      "Cannot create inline manual player without an user object!"
    );
  }

  const { id: uid, email, firstName, lastName, createdAt } = user;

  return {
    uid,
    email,
    username: email,
    name: `${firstName} ${lastName}`,
    created: Date.parse(createdAt) / 1000
  };
};

export const createInlineManualPlayer = user => {
  window.inlineManualTracking = createTrackingObject(user);

  if (
    Object.prototype.hasOwnProperty.call(window, "createInlineManualPlayer") &&
    Object.prototype.hasOwnProperty.call(window, "inlineManualPlayerData")
  ) {
    window.createInlineManualPlayer(window.inlineManualPlayerData);
  }
};

export const updateInlineManualPlayer = user => {
  window.inlineManualTracking = createTrackingObject(user);

  if (
    Object.prototype.hasOwnProperty.call(window, "inline_manual_player") &&
    Object.prototype.hasOwnProperty.call(window.inline_manual_player, "update")
  ) {
    window.inline_manual_player.update();
  }
};
