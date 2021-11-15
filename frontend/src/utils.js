function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const utils = {
  jumpto: function (anchor) {
    window.location.href = "#" + anchor;
    console.log("----------- JUMPED!!!------------ to " + anchor);
  },

  //Make some animation effect on the target item

  animateTargetItem: async function (targetItem) {
    for (let i = 0; i < 3; i++) {
      targetItem.classList.toggle("mkb-title-fade");
      await sleep(500);
      targetItem.classList.toggle("mkb-title-fade");
      await sleep(500);
    }
  },

  scrollToLastPosition: function () {
    const scrollPos = sessionStorage.getItem("scrollPosition");

    if (scrollPos) {
      window.scrollTo(0, parseInt(scrollPos));
      sessionStorage.removeItem("scrollPosition");
    }

    console.log("Scrolled back to last postition...");
  },

  getToken: function () {
    const refreshToken = localStorage.getItem("refresh_token");
    let tokenValid = false;

    if (refreshToken) {
      const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

      // exp date in token is expressed in seconds, while now() returns milliseconds:
      const now = Math.ceil(Date.now() / 1000);

      tokenValid = tokenParts.exp > now;
    }

    return { token: refreshToken, valid: tokenValid };
  },
};

export default utils;
