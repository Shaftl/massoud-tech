import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

const PASSWORD = "open the door of database"; // Set your password

const VoiceLogin = ({ setAuth }) => {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const audio = new Audio("/vioce.mp3");
    audio.loop = false;
    audio.volume = 1; // Full volume

    // Trick: Play muted first (allowed by browsers)
    audio.muted = true;
    audio
      .play()
      .then(() => {
        setTimeout(() => {
          audio.muted = false; // Unmute after a short delay
        }, 1000); // 1-second delay
      })
      .catch((error) => console.warn("Autoplay blocked:", error));
  }, []);

  useEffect(() => {
    console.log("User said:", transcript); // Debugging

    if (!listening && transcript) {
      const spokenPassword = transcript.toLowerCase().trim();

      if (spokenPassword.includes(PASSWORD)) {
        console.log("✅ Correct Password!");
        sessionStorage.setItem("isAuthenticated", "true");
        setAuth(true);
        navigate("/addItem"); // Redirect to addItem
      } else {
        console.log("❌ Wrong Password:", spokenPassword);
        alert("Incorrect password, try again.");
        resetTranscript();
      }
    }
  }, [transcript, listening, navigate, setAuth]);

  return (
    <div className="vioce">
      <div className="video-container">
        <video autoPlay loop muted>
          <source src="/hack.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="ds">
        <h2>Say the Password to Login</h2>
        <button
          className="buttonFill"
          onClick={SpeechRecognition.startListening}
        >
          Start Listening
        </button>

        <p>{listening ? "Listening..." : "Say your password!"}</p>
      </div>
    </div>
  );
};

export default VoiceLogin;
