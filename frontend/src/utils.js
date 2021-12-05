import EmbeddedLink from "./components/embedded-link";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const utils = {
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

  // Takes a text and makes mkb-codes found in it clickable
  parseMKBCodesInText: function (text) {
    if (text.length < 4) return text;

    text = text + " ";
    const pattern =
      /\b[A-Z]{1}\d{2}-[A-Z]{1}\d{2}\b|\b[A-Z]{1}\d{2}\.\d{1}[+*]?\b|\b[A-Z]{1}\d{2}[+*]?\b/g;

    const mkb_codes = Array.from(text.matchAll(pattern));

    const elements = [];

    let [left, right] = ["", text];

    mkb_codes.forEach((code, index) => {
      code = code[0];

      const split_pos = right.indexOf(code);

      left = right.substring(0, split_pos);
      right = right.substring(split_pos + code.length);

      elements.push(<span key={"" + index + 1}>{left}</span>);
      elements.push(<EmbeddedLink key={"" + index + 2} mkb_code={code} />);
    });

    elements.push(<span key={"last_elem"}>{right}</span>);

    return elements;
  },
};

export default utils;
