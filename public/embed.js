// const url = "http://vcap.me:3000";
// const url = "https://pavelify.com";
// const url = "https://pavelify-web-home.vercel.app";
const url = "https://pavelify.help";
(function () {
  const PAVELIFY_WRAPPER_ID = "pavelify-container";
  const IFRAME_ID = "pavelify-iframe-element";
  const IFRAME_URL = `${url}/widget/${window.chatID}`;
  const TAKEOVER_CLASSNAME = "pavelify-iframe-takeover";
  const init = () => {
    window.addEventListener(
      "message",
      (e) => {
        let data = {};
        try {
          data = JSON.parse(e.data);
        } catch (e) {}

        if (data.type && data.type === "TOGGLE_IFRAME") {
          if (
            this.iframe.classList.contains("mobile") ||
            this.iframe.classList.contains("desktop")
          ) {
            this.iframe.classList.remove("mobile");
            this.iframe.classList.remove("desktop");
          } else {
            handleScreenSize();
          }
        } else if (data.type && data.type === "HANDLE_SCREEN_SIZE_CHANGE") {
          if (
            this.iframe.classList.contains("mobile") ||
            this.iframe.classList.contains("desktop")
          ) {
            handleScreenSize();
          }
        }
      },
      false
    );
    initializeIframe();
    mountIframe();
    // Create new link Element
    var link = document.createElement("link");
    // set the attributes for link element
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${url}/embed.css`;

    // Get HTML head element to append
    // link element to it
    document.getElementsByTagName("HEAD")[0].appendChild(link);
  };

  const initializeIframe = () => {
    if (!document.getElementById(IFRAME_ID)) {
      const iframe = document.createElement("iframe");
      iframe.src = IFRAME_URL;
      iframe.id = IFRAME_ID;
      iframe.crossorigin = "anonymous";
      this.iframe = iframe;
    }
  };

  const mountIframe = () => {
    if (!document.getElementById(IFRAME_ID)) {
      window.addEventListener("message", receiveMessage, false);
      const wrapper = document.createElement("div");
      wrapper.id = PAVELIFY_WRAPPER_ID;
      wrapper.style = `z-index: ${Number.MAX_SAFE_INTEGER};  position: relative;`;
      wrapper.appendChild(this.iframe);
      document.body.appendChild(wrapper);

      this.iframe.classList.add(TAKEOVER_CLASSNAME);
      this.iframe.onload = () => {
        handleResize();
        const { href, origin } = window.location;
        this.iframe.contentWindow.postMessage(
          JSON.stringify({
            type: "PAGE_VIEW",
            value: { url: href, host: origin }
          }),
          "*"
        );
      };
    } else {
    }

    window.addEventListener("resize", handleResize);
  };

  const handleScreenSize = () => {
    if (window.innerWidth <= 600) {
      this.iframe.classList.add("mobile");
      this.iframe.classList.remove("desktop");
    } else {
      this.iframe.classList.remove("mobile");
      this.iframe.classList.add("desktop");
    }
  };
  const receiveMessage = (event) => {
    // this is where we handle when our widget sends us a message
    if (!!event && !!event.data && !!event.data.type) {
      switch (event.data.type) {
        case "IFRAME_LOAD_DONE":
          this.handleWidgetLoaded();
          break;
      }
    }
  };

  const handleResize = () => {
    this.iframe.contentWindow.postMessage(
      JSON.stringify({
        type: "SCREEN_SIZE",
        value: { width: window.innerWidth, height: window.innerHeight }
      }),
      "*"
    );
  };

  init();
})();
