import React, { useState } from "react";
const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState({});
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <div>
      <img src={preview} alt="" style={{ borderColor: "black" }} />
    </div>
  );
};

export default PreviewImage;
