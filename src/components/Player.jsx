import React from "react";
import { useState, useEffect } from "react";

const Player = () => {
  const [ayat, setAyat] = useState([]);
  const [ayasrc, setAyaSrc] = useState([]);
  var [text, setText] = useState(["إضغط علي السورة للإستماع إليها"]);
  useEffect(() => {
    fetch("https://quran-endpoint.vercel.app/quran")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setAyat(data.data);
      });
  }, []);
  var i = 0;
  var [index, setIndex] = useState(i);
  return (
    <div className="container">
      <div className="player">
        <div className="ayah">{text[index]}</div>
        <audio
          src={ayasrc[index]}
          onEnded={() => {
            if (index < ayasrc.length) {
              return setIndex((index += 1));
            }
          }}
          className="quranPlayer"
          controls
          autoPlay
        ></audio>
        <div className="buttons">
          <div className="icon next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" />
            </svg>
          </div>
          <div className="icon play">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
            </svg>
          </div>
          <div className="icon prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="surahs">
        <div className="sura">
          {ayat.map((aya, index) => (
            <div
              onClick={() => {
                setIndex(0);
                fetch(`https://quran-endpoint.vercel.app/quran/${index + 1}`)
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(
                      data.data.ayahs.map((el) => {
                        return el.audio.url;
                      })
                    );
                    console.log(
                      data.data.ayahs.map((el) => {
                        return el.text.ar;
                      })
                    );
                    setText(
                      data.data.ayahs.map((el) => {
                        return el.text.ar;
                      })
                    );
                    setAyaSrc(
                      data.data.ayahs.map((el) => {
                        return el.audio.url;
                      })
                    );
                  });
              }}
              className="sura-lonely"
            >
              <p>{aya.asma.ar.long}</p>
              <p>{aya.asma.en.short}</p>
              <svg
                onClick={() => {
                  fetch(`https://quran-endpoint.vercel.app/quran/${index + 1}`)
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data.data.recitation.full);
                      window.open(data.data.recitation.full);
                    });
                }}
                className="download icon"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
              >
                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Player;
