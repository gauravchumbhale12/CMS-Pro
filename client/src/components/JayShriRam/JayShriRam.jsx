import "./JayShriRam.css";
import image from "../../assets/phooto.png";

function JayShriRam() {
  return (
    <div className="welcome">

      <div className="overlay"></div>

      <img
        src={image}
        alt="Jay Shri Ram"
        className="ramImage"
      />

      <div className="loading">
        <div className="loadingBar"></div>
      </div>

      <p className="loadingText">
        Loading Dashboard...
      </p>

    </div>
  );
}

export default JayShriRam;