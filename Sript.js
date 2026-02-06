document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("downloadBtn");
  const resume = document.querySelector(".resume");

  btn.addEventListener("click", () => {
    const options = {
      margin: 0,
      filename: "Saurabh_Surve_Resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 1.25,
        useCORS: true
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },
      pagebreak: { mode: "avoid-all" }
    };

    html2pdf().set(options).from(resume).save();
  });
});
