import React, { useState, useRef } from "react";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";

const BarcodeGen = () => {
  const [text, setText] = useState("");
  const [barcode, setBarcode] = useState();
  const barcodeRef = useRef(null); // Ref for the barcode container

  const handleGen = () => {
    setBarcode(text); // Generate the barcode
  };

  const handleDownload = () => {
    if (barcodeRef.current) {
      html2canvas(barcodeRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png"); // Convert canvas to data URL
        link.download = "barcode.png"; // Name the downloaded file
        link.click(); // Trigger the download
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center w-50 bg-light p-4 rounded shadow">
        <h1 className="mb-4">BarCode Generator</h1>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Value for Barcode Generator"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn btn-primary mb-3"
          onClick={handleGen}
        >
          Generate BarCode
        </button>

        {barcode && (
          <div className="mt-4">
            <div
              ref={barcodeRef}
              className="d-flex justify-content-center"
            >
              <Barcode value={barcode} />
            </div>
            <button
              className="btn btn-success mt-3"
              onClick={handleDownload}
            >
              Download BarCode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeGen;
