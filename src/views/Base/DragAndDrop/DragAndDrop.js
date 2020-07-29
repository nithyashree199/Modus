import React, { useState, useEffect, useRef } from "react";
import "./DragAndDrop.css";
//import { construct } from "core-js/fn/reflect";
var base64files;
export const conversiontobase64=()=>{
return(base64files,<DropZone></DropZone>)
}

const DropZone = (props) => {
  var message=props.message
 // console.log(message)
  var validTypes=[]
  if(props.type=="image"){
    validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
  }
  else if(props.type=="file"){
    validTypes = [
      "application/pdf",
      "application/msword",
    ];
  }
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [validFiles, setValidFiles] = useState([]);
  const modalImageRef = useRef();
  const modalRef = useRef();

  const getBase64=(file)=>{
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if(props.type=="file"){
      props.updatebase64valueforconsentform(reader.result);
      }
      else if(props.type=="image"){
        props.updatebase64valueforlogo(reader.result);
      }
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }

  const validateFile = (file) => {

    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  /*
useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
        const x = file.find(item => item.name === current.name);
        if (!x) {
            return file.concat([current]);
        } else {
            return file;
        }
    }, []);
    setValidFiles([...filteredArray]);

}, [selectedFiles]);
*/

  const dragOver = (e) => {

    e.preventDefault();
    e.stopPropagation()

    if(e.target.id=="main-drop-area"){
    e.target.style.background=" #008081"
    }
  };

  const dragEnter = (e) => {
     e.preventDefault();
     e.stopPropagation();

     if(e.target.id=="main-drop-area"){
     e.target.style.background=" #008081"
     }
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.target.style.background=""
  };

  const fileDrop = (e) => {
   e.preventDefault();
   e.target.style.background=""
    const files = e.dataTransfer.files;
    if (files.length == 1) {
      handleFiles(e,files);

  }
    console.log(files);
  };
  const handleFiles = (e,files) => {
   /* if(e.target.id!="droparea"){
     e.preventDefault();
    }
    */

   // else{


    if (selectedFiles.length == 0) {
      if (validateFile(files[0])) {
        // add to an array so we can display the name of file
        setSelectedFiles((prevArray) => [...prevArray, files[0]]);
        console.log(selectedFiles);
        getBase64(files[0])
      } else {
       // files[0]["invalid"] = true;
        //setSelectedFiles((prevArray) => [...prevArray, files[0]]);
        //setErrorMessage("File type not permitted");
      }
    }

  //}

  };
  const openImageModal = (file) => {
    console.log(file.type)
    if(file.type=="application/pdf" || file.type=="application/msword"){

    }
    else{
    const reader = new FileReader();
    modalRef.current.style.display = "block";
    reader.readAsDataURL(file);

    reader.onload = function (e) {

      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  }
  };
  const closeModal = () => {
    modalRef.current.style.display = "none";
    modalImageRef.current.style.backgroundImage = "none";
  };

  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };
  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);
  };
  return (

    <div className="container1">
      <div
      id="main-drop-area"
        className="drop-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <div id="droparea" className="drop-message">
          <div className="upload-icon"></div>
          Drag And Drop {message}
        </div>
        <div className="file-display-container">
          {selectedFiles.map((data, i) => (
            <div className="file-status-bar" key={i}>
              <div
                onClick={
                  !data.invalid
                    ? () => openImageModal(data)
                    : () => removeFile(data.name)
                }
              >
                <div className="file-type-logo"></div>
                <div className="file-type">{fileType(data.name)}</div>
               
                <span
                  className={`file-name ${data.invalid ? "file-error" : ""}`}
                >
                  {data.name}
                </span>
                {/*
                <span className="file-size">({fileSize(data.size)})</span>{" "}
                */
                }
                {data.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}
              </div>
              <div
                className="file-remove"
                onClick={() => removeFile(data.name)}
              >
                X
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="modal1" ref={modalRef}>
        <div className="overlay"></div>
        <span className="close1" onClick={() => closeModal()}>
          X
        </span>
        <div className="modal-image" ref={modalImageRef}></div>
      </div>
    </div>
  );
};

export default DropZone;
