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

    return new Promise(resolve => {
      // Inline Manual Player script is injected as the first script.
      const script = document.getElementsByTagName('script')[0];

      // Wait for script to load.
      script.addEventListener('load', ev => {
        // Create a player instance.
        const player =
          window.createInlineManualPlayer(window.inlineManualPlayerData);

        // Wait for the player instance to finish init.
        player.setCallbacks({
          onInit: player => resolve(player),
        });
      });
    });
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
