import React from 'react'
import { useState } from 'react'
import {Button, Stack} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadFile() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const uploadFile = async (e) => {
        setIsLoading(false);
        if (file) {
          const fileData = file?.target?.files[0];
          const fileFormData = new FormData();
          fileFormData.append("file", fileData);
          setIsLoading(true);
          try {
            if (fileFormData) {
              const upload = await UploadFileBuffer(fileFormData);
                toast.success('🦄 Upload Successful!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setFileName("");
                setFile()
                setIsLoading(false);
            }
          } catch (err) {
            toast.error('👁 Upload Failed!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setIsLoading(false);
          }
        } else {
          setFileName("");
          setFile()
        }
      }

      const UploadFileBuffer = async(formData) => {
        console.log(process.env.REACT_APP_BASE_URL)
        await fetch(`${process.env.REACT_APP_BASE_URL}`,{
            method:'POST',
            body:formData
        })
      }
  return (
      <>
      <Stack>
        <Navbar/>
        <div className='verticalBox' style={{width:'50%', margin:'auto', alignItems:'center', marginTop:'40vh'}}>
          <div className="flexBox">
              <div className="upload-btn-wrapper">
                  <Button
                      // isLoading={isLoading && receiptFileName}
                      // isDisabled={isLoading && receiptFileName}
                      // loadingText="Uploading"
                      variant="outlined"
                      textTransform='none'
                  >
                      Choose File
                  </Button>
                  <input type="file"
                      name="file"
                      //   disabled={isLoading}
                      onChange={(event) => { setFile(event); setFileName(event?.target?.files[0]?.name) }} />
              </div>
              {fileName && <div>
                <Stack spacing={2} direction="row" alignItems={'center'}>
              <p className="truncate">{fileName}</p>
          <button onClick={() => { setFile(); setFileName("") }} className="regulerButton">X</button>
          </Stack></div>}
          </div>
          <div>
              {isLoading ? <LoadingButton loading loadingIndicator="Uploading…" variant="contained">Fetch data</LoadingButton> : <Button variant="contained" onClick={uploadFile}>
                  Upload
              </Button>}
          </div>
          </div>
          </Stack>
          <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
          </>
  )
}

export default UploadFile