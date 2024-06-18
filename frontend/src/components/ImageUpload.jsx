import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';

import { potato } from '../assets';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: "http://localhost:8000/predict",
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsLoading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsLoading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <header className="w-full bg-lime-600 p-4 fixed top-0 z-10">
        <Link to = "/">
          <div className="flex items-center">
            <img src={potato} alt="Logo" className="w-10 h-10 rounded-full" />
            &nbsp;
            <h1 className="text-white text-xl font-mono">BlightDetect</h1>
          </div>
        </Link>
        
      </header>

      <main className="flex flex-col items-center w-full mt-10">
        <div className="mb-8 text-center w-full">
          <p className="text-3xl font-mono">Spot the Blight: Upload Your Leaf Image Now!</p>
        </div>
        
        <div className={`max-w-md bg-white rounded-lg p-4 ${!image ? 'border-2 border-dashed border-gray-400' : ''}`}>
          {!image && (
            <div className="p-4">
              <Dropzone onDrop={acceptedFiles => onSelectFile(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-4 text-center cursor-pointer">
                    <input {...getInputProps()} />
                    <p>Drag and Drop Your Leaf Image Here for Quick Diagnosis!</p>
                  </div>
                )}
              </Dropzone>
            </div>
          )}

          {image && (
            <div className="flex flex-row justify-between items-center">
              <div className="w-2/3 h-56">
                <img src={preview} alt="Preview" className="object-cover w-full h-full" />
              </div>
              <div className="w-1/2 text-center">
                {data && (
                  <div className="p-4">
                    <p className="mb-4 ml-2 font-mono">Diagnosis Done: It's <span className='font-bold text-lg text-green-800'> {data.class} </span> with a confidence of <span className='font-bold text-lg text-green-800'>{confidence}%</span></p>

                    {/* <table className="w-full bg-white border border-gray-300">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 border-b">Label</th>
                          <th className="px-4 py-2 border-b text-right">Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border-b">{data.class}</td>
                          <td className="px-4 py-2 border-b text-right">{confidence}%</td>
                        </tr>
                      </tbody>
                    </table> */} 
                    {
                      (data.class == 'Late Blight' || data.class == 'Early Blight') ? <p className='font-mono text-300'>In order to Stay Blight-Free: <Link to="/remedy" className="font-mono text-sm &nbsp; &nbsp; text-black px-2 py-2 bg-gray-200 rounded"> Click here!</Link></p> : <></>
                    }
                    
                  </div>
                )}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    <p className="mt-2 text-xl">Processing</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {data && (
          <button
            onClick={clearData}
            className="mt-4 px-6 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600"
          >
            Clear
          </button>
        )}
      </main>
    </div>
  );
};

export default ImageUpload;
