import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        //   <p>Drag 'n' drop some files here, or click to select files</p>
        <div>
          <button style={{ border: "1px solid rgb(45, 52, 54)", width: "100px" }}>
            Edit
          </button>
          <button style={{ border: "1px solid rgb(45, 52, 54)", width: "100px" }}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default MyDropzone;
