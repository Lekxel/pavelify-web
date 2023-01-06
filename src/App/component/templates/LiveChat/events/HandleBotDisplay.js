export const HandleBotDisplay = (e, innerSize) => {
  window.parent.postMessage(JSON.stringify({ type: "TOGGLE_IFRAME" }), "*");
  const Bot = document.querySelector(".collapse-bot");

  if (innerSize.width > 600) {
    // if (window.innerWidth > 600) {
    if (Bot.classList.contains("active")) {
      document.querySelector("#MessageArea").style.display = "none";
      document.querySelector(".collapse-bot").style.opacity = 0;
      document.querySelector(".collapse-bot").style.transform = " translateY(30px)";
      setTimeout(() => {
        document.querySelector(".collapse-bot").style.display = "none";
      }, 400);
      document.querySelector(".collapse-bot").classList.remove("active");
      document.querySelector("#closeIconButton").classList.add("d-none");
      document.querySelector("#chatIconImg").classList.remove("d-none");
    } else {
      document.querySelector(".collapse-bot").style.display = "block";

      setTimeout(() => {
        document.querySelector(".collapse-bot").style.opacity = 1;
        document.querySelector(".collapse-bot").style.transform = " translateY(0px)";
      }, 100);
      document.querySelector(".collapse-bot").classList.add("active");
      document.querySelector("#closeIconButton").classList.remove("d-none");
      document.querySelector("#chatIconImg").classList.add("d-none");
    }
  } else if (e.target.id === "burgerButton") {
    document.querySelector(".collapse-bot").style.display = "block";
  } else {
    document.querySelector(".collapse-bot").style.display = "none";
  }
};
