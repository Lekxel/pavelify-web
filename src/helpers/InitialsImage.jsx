const InitialsImage = ({ name, color, height, width }) => (
  <span
    style={{
      width: width || "45px",
      height: height || "45px",
      borderRadius: "50%",
      backgroundColor: color || "rgb(45, 150, 214)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    }}
  >
    {name?.charAt(0)}
  </span>
);
export default InitialsImage;
