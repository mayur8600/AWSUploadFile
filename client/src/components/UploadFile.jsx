import React from 'react'
import { useState } from 'react'
import {Button, Stack, Switch, TextField} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadFile() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isJson, setIsJson] = useState(false)
    const [jsonData, setJsonData] = useState('')
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
              if(upload){
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
              }
              else{
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
              }
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
        const upload = await fetch(`${process.env.REACT_APP_BASE_URL}`,{
            method:'POST',
            body:formData
        })
        if(upload.status === 200){
          return true
        }
        else{
          return false
        }
      }

      const sendFile = async() => {
        try {
          setIsLoading(true);
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/json`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: jsonData
        });
        if(response.status < 300){
          toast.success('🦄 Data Sent!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
        else{
          toast.error(`👁 ${response.statusText}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
          setIsLoading(false);
          setJsonData('')
        } catch (error) {
          toast.error('👁 Something went wrong!', {
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
            setJsonData('')
        }
      }
  return (
      <>
      <Stack>
        <Navbar/>
        <div>
        <label>JSON</label>
        <Switch
            checked={isJson}
            onChange={() => setIsJson(!isJson)}
            name="loading"
            color="primary"
          />
          <label>Video / JSON Files</label>
          </div>
        <div className='verticalBox' style={{width:'50%', margin:'auto', alignItems:'center', marginTop:'40vh'}}>
          {isJson ? <div className="flexBox">
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
          </div>: 
          <div>
            <TextField
          id="outlined-error"
          label="JSON Data" value={jsonData} onChange={(e)=>{setJsonData(e.target.value)}}/>
          </div>
          }
          <div>
              {isLoading ? <LoadingButton loading loadingIndicator= {isJson ? "Uploading…" : "Sending..."} variant="contained">Fetch data</LoadingButton> : <Button variant="contained" onClick={isJson ? uploadFile : sendFile}>
              {isJson ? 'Upload' : 'Send'}
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