import React, { useState, useEffect, useRef } from "react";
import "./DragAndDrop.css";
import { Document, Page, pdfjs } from "react-pdf";
import { Pagination } from "reactstrap";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


var base64files,
  logobase64,
  filebase64,
  filename;

export const conversiontobase64 = () => {
  return base64files, (<DropZone></DropZone>);
};

const DropZone = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [src, setBase64source] = useState(null);
  const [base64forfile, setbase64forfile] = useState(null);
  const [base64forlogo, setbase64forlogo] = useState(null);
  const [load,setload]=useState(false);
  const fileInputRef = useRef();


  var message = props.message;
  logobase64 = null;
  filebase64 = null;

  logobase64 = props.base64valueforlogo;
  filebase64 = props.base64valueforconsentform;

  var validTypes = [];
  if (props.type == "image") {
    validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
  } else if (props.type == "file") {
    validTypes = ["application/pdf", "application/msword"];
  }
  const [selectedFiles, setSelectedFiles] = useState([]);
 // const [errorMessage, setErrorMessage] = useState("");
  //const [validFiles, setValidFiles] = useState([]);
  const modalImageRef = useRef();
  const modalRef = useRef();
  const [flag ,setFlag]=useState(true);


  useEffect(() => {


   setbase64forfile(props.base64valueforconsentform)
    if (src == null && flag==true ) setBase64source(props.base64valueforlogo);
  });
  const fileInputClicked = () => {
    fileInputRef.current.click();
}
const filesSelected = (evt) => {

  if (fileInputRef.current.files.length) {

     handleFiles(fileInputRef.current.files);
  }
evt.target.value=null
}
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (props.type == "file") {
        setbase64forfile(reader.result);

        props.updatebase64valueforconsentform(reader.result);
      } else if (props.type == "image") {
        setbase64forlogo(reader.result);

        props.updatebase64valueforlogo(reader.result);
      }
    };
    reader.onerror = function (error) {

    };
  };

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
    e.stopPropagation();

    if (e.target.id == "main-drop-area") {
      e.target.style.background = " #008081";
    }
  };

  const dragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.id == "main-drop-area") {
      e.target.style.background = " #008081";
    }
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.target.style.background = "";
  };
  const fileDrop = (e) => {
    e.preventDefault();
    e.target.style.background = "";

    const files = e.dataTransfer.files;
    if (files.length == 1) {

      handleFiles(files);
    }
  };
  const handleFiles = (files) => {
    /* if(e.target.id!="droparea"){
     e.preventDefault();
    }
    */

    // else{

    if (selectedFiles.length == 0) {

      if (validateFile(files[0])) {
        // add to an array so we can display the name of file
        setSelectedFiles((prevArray) => [...prevArray, files[0]]);

        getBase64(files[0]);
      } else {
        //getBase64(files[0]);
        // files[0]["invalid"] = true;
        //setSelectedFiles((prevArray) => [...prevArray, files[0]]);
        //setErrorMessage("File type not permitted");
      }
    }
    if (selectedFiles[0]) filename = selectedFiles[0].name;
    if (logobase64 != null && base64forlogo == null) {

      setBase64source(logobase64);
    } else if (base64forlogo != null) {

      setBase64source(base64forlogo);
    }

    //}
  };
  const openImageModal = (file) => {
    modalRef.current.style.display = "block";
    modalImageRef.current.style.backgroundImage = `url(${file})`;
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
    //setFlag(false)
    setBase64source(null);
    setbase64forlogo(null);
    props.updatebase64valueforlogo(null);
    // find the index of the item
    // remove the item from array

    /*const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    */

    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);

    selectedFiles.splice(selectedFileIndex, 1);

    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);





  };
  const removeFileforform =(name)=>{
    setbase64forfile(null)
    props.updatebase64valueforconsentform(null);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);

    selectedFiles.splice(selectedFileIndex, 1);

    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);

  }
  const onDocumentLoadSuccess=({ numPages })=> {
    setNumPages(numPages);
  }
  const fileveiwer=()=>{
    setload(!load)
  }
  return (
    <div>
    <div className="container1">
      <div
        id="main-drop-area"
        className="drop-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}

      >
        <div id="droparea" className="drop-message"onClick={fileInputClicked}>
        <input
    ref={fileInputRef}
    className="file-input"
    type="file"
    onChange={filesSelected}
/>
          <div className="upload-icon"></div>
          Drag And Drop or Click {message}
        </div>

        {message == "Logo" ? (
          src ? (
            <div className="file-display-container">
              <div className="file-status-bar">
                <div>
                  <span
                    className={`file-name`}
                    onClick={() => openImageModal(src)}
                  >
                    Logo
                  </span>

                  <img src={src} width="100px" height="50px" style={{marginLeft:"20px"}}></img>

                  <div
                    className="file-remove"
                    onClick={() => removeFile(filename)}
                  >
                    X
                  </div>
                </div>
              </div>
              <div className="modal1" ref={modalRef}>
                <div className="overlay"></div>

                <div className="modal-image" ref={modalImageRef}></div>
                <span className="close1" onClick={() => closeModal()}>
                  X
                </span>
              </div>
            </div>
          ) : null
        ) : (
          base64forfile?
          <div className="file-display-container">
            <div className="file-status-bar">
              <span className={`file-name`} onClick={()=>fileveiwer()}>Patientconsentform</span>
              <div
                    className="file-remove"
                    onClick={() => removeFileforform(filename)}
                  >
                    X
                  </div>
            </div>
          </div>
          :null

        )
      }
      </div>
    </div>
    <div>
    { load?
       <div className="modalforfile">
          <div className="overlay2"></div>

          <div className="modal-image2">


   <Document
     file={base64forfile}
     onLoadSuccess={onDocumentLoadSuccess}

     height="550px"
   ><Pagination>
     <Page pageNumber={pageNumber} />
     </Pagination>
   </Document>
   <p>Page {pageNumber} of {numPages}</p>
   </div>
   <span className="close1" onClick={() => fileveiwer()}>
                  X
                </span>
   </div>

 :null
}
</div>
</div>

  );
};

export default DropZone;
