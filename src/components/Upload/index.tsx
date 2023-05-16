import React from "react";
import Dropzone from "react-dropzone";
import "../Upload/uploadStyle.css";

type UploadProps = {
  onUpload: (files: File[]) => void;
}

const Upload = ({ onUpload }: UploadProps) => {
  const getLabelDropzone = (isDragActive: boolean, isDragReject: boolean) => {
    if(isDragActive && isDragReject) {
      return <span className="labelRejected">Arquivo não suportado e/ou mais de um arquivo selecionado</span>;
    }
    
    if(isDragActive) {
      return <span className="labelAcepted">Solte o arquivo aqui</span>;
    }
    
    return <span>Clique aqui ou arraste o arquivo .csv para esta área</span>;
  };
    
  return (
    <div className="dropzone-container">
      <Dropzone accept={{"text/csv": [".csv"]}} maxFiles={1} onDropAccepted={onUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
            {...getRootProps()}
            className={
            isDragActive && isDragReject
                ? "dropzone dragReject"
                : isDragActive ? "dropzone dragActive" : "dropzone"
            }
          >
            <input {...getInputProps()} />
            {getLabelDropzone(isDragActive, isDragReject)}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default Upload;