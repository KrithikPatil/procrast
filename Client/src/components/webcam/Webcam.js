import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import './Webcam.css';
// import axios from 'axios'
import AWS from 'aws-sdk';

function Webcam() {

    const history = useNavigate();

    const location = useLocation();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedFrame, setCapturedFrame] = useState(null);
    let mediaStream = null;
    const email = location.state.email;
    const displayName = location.state.id;

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    mediaStream = stream;
                    videoRef.current.srcObject = stream;
                })
                .catch(error => console.error('getUserMedia error:', error));
        }
    }, []);

    // useEffect(() => {
    //     try {
    //         axios.post("http://localhost:8000/test/check/fetchName", {
    //             email
    //         })
    //         .then(res => {
    //             if (res.data == "not found") {
    //                 console.log("user not found");
    //             }
    //             else {
    //                 console.log("Name received: " + res.data[0].name);
    //                 setName(res.data[0].name);
    //             }
    //         })
    //     }
    //     catch(e) {
    //         console.log(e);
    //     }
    // }, [email]);

    const config = {
        bucketName: 'sem6-test-images',
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET
    }

    const CaptureImage = async () => {
        // const capture = document.getElementById('captured_image');
        // console.log(email);
        // fetch(`http://localhost:5000/capture_image/${name}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data.message);
        //         capture.src = "https://" + config.bucketName + ".s3." + config.region + ".amazonaws.com/index/" + name + ".jpg" + `?${new Date().getTime()}`;
        //     })
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
        // const capture = document.getElementById('captured_image');
        // AWS.config.update({
        //     accessKeyId: config.accessKeyId,
        //     secretAccessKey: config.secretAccessKey,
        // });
        // const s3 = new AWS.S3({
        //     params: { Bucket: config.bucketName },
        //     region: config.region,
        // });
        // const params = {
        //     Bucket: config.bucketName,
        //     Key: "index/" + name + ".jpg",
        // };
        // s3.deleteObject(params, (err, data) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         capture.src = '';
        //         window.location.reload();
        //     }
        // })
        setCapturedFrame(null);
    }

    const startTest = async () => {

        // const capture = document.getElementById('captured_image');

        if (capturedFrame) {

            // const res = axios.post('http://localhost:8000/test/kill')
            // if (res.data == "killed") {
            //     history("/test/startTest", { state: { id: email, test_name: test_name } })
            // }
            // else if (res.data == "error") {
            //     alert("The snake is alive");
            // }
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
                mediaStream.getTracks().forEach(track => track.stop());
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