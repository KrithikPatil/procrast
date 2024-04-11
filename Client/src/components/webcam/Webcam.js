import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import './Webcam.css';
// import axios from 'axios'
import AWS from 'aws-sdk';

function Webcam() {

    const history = useNavigate();

    // const location = useLocation();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedFrame, setCapturedFrame] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);

    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    const displayName = searchParams.get("displayName");
    console.log("email: " + email + " displayName: " + displayName);

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    setMediaStream(stream);
                    videoRef.current.srcObject = stream;
                })
                .catch(error => console.error('getUserMedia error:', error));
        }
    }, []);

    const config = {
        bucketName: 'sem6-test-images',
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET
    }

    const CaptureImage = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        const dataURL = canvas.toDataURL('image/jpeg');
        setCapturedFrame(dataURL);
    }

    const Retake = async () => {
        setCapturedFrame(null);
    }

    const startTest = async () => {

        if (capturedFrame) {
            AWS.config.update({
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            });
            const s3 = new AWS.S3({
                params: { Bucket: config.bucketName },
                region: config.region,
            });
            
            const blob = await fetch(capturedFrame).then(res => res.blob());
            
            const params = {
                Key: 'index/' + displayName + '.jpg',
                Body: blob,
                Metadata: {'FullName': displayName},
                ContentType: 'image/jpeg'
            };

            try {
                const data = await s3.putObject(params).promise();
                console.log('Upload successful:', data.Location);
            } catch (error) {
                console.error('Error uploading to S3:', error);
            }

            if (mediaStream) {
                // mediaStream.getTracks().forEach(track => track.stop());
                mediaStream.getTracks().forEach(track => {
                    try {
                        track.stop();
                        console.log("ended");
    
                        // Check if the track is already ended
                        if (track.readyState === 'ended') {
                            console.log('Webcam has stopped (track was already ended)');
                        } else {
                            // Attach onended event handler
                            track.onended = () => {
                                console.log('Webcam has stopped');
                            };
                        }
                    } catch (error) {
                        console.log('Error stopping track:', error);
                    }
                });
    
                setMediaStream(null);
            }

            history("/Home", { state: { id: displayName, email: email } });
        }
        else{
            alert("Please take a picture first");
            return false;
        }
    }

    return (
        <div className="checkpage">
            <div className="check">
                <video ref={videoRef} autoPlay></video>
                    <div className="buttons">
                        <input type="button" className="capture" value="Capture Image" onClick={CaptureImage} />
                        <input type="button" className="retake" value="Retake Image" onClick={Retake} />
                    </div>
                    {capturedFrame && (
                    <div>
                        <img src={capturedFrame} alt="Captured Frame" />
                    </div>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <div className="sub_div">
                <input type="button" className="submit_btn" value="Start test" onClick={startTest} />
            </div>
        </div>
    )
}

export default Webcam;