export const HandleStep = (isNext, setStep, Fields, stepIndex, setStepIndex) => {
  let CurrentStep = 0;
  if (isNext) {
    if (stepIndex >= Fields.length - 1) {
      return;
    }
    CurrentStep = stepIndex + 1;
  } else {
    if (stepIndex <= 0) {
      return;
    }
    CurrentStep = stepIndex - 1;
  }
  setStep(Fields[CurrentStep]);
  setStepIndex(CurrentStep);

  if (CurrentStep === 0) {
    document.querySelector("#progress_inner").style.width = "0%";
    document.querySelector(".step2").textContent = "1";
    document.querySelector(".heading-steps").textContent = "";
    document.querySelector(".next_button").style.display = "block";
  }

  if (CurrentStep === 1) {
    document.querySelector("#progress_inner").style.width = "60%";
    document.querySelector(".step2").textContent = "2";
    document.querySelector(".heading-steps").textContent = "You're nearly there";
    document.querySelector(".next_button").style.display = "block";
  }
  if (CurrentStep === 2) {
    document.querySelector(".heading-steps").textContent = "Last Step";
    document.querySelector("#progress_inner").style.width = "100%";
    document.querySelector(".step2").textContent = "3";
    document.querySelector(".next_button").style.display = "none";
  }
};
