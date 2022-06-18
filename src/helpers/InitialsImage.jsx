const InitialsImage = ({ name }) => (
  <span
    style={{
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      backgroundColor: "rgb(45, 150, 214)",
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
