import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { RiRobot2Fill } from "react-icons/ri";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RudeBot = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState(0);
  const messagesEndRef = useRef(null);

  const [once, setOnce] = useState(true);

  if (once) {
    setTimeout(() => {
      setLevel(1);
      setOnce(false);
    }, 1000);
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [history]);

  const sendMessage = async () => {
    if (!message) {
      alert("Please enter a message!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/lvl${level}`, {
        message,
      });

      setHistory((prev) => [
        ...prev,
        { question: message, response: res.data.response, level: level },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setHistory((prev) => [
        ...prev,
        {
          question: message,
          response: "Sorry, there was an error.",
          level: level,
        },
      ]);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-6xl text-center tracking-tight font-bold text-gray-800 mt-5 sm:mb-0 mb-2 sm:mt-20">
        Chat With{" "}
        <span
          className={`${
            level === 0
              ? "text-black"
              : level === 1
              ? "text-red-500"
              : level === 2
              ? "text-blue-500"
              : level === 3
              ? "text-gray-500"
              : level === 4
              ? "text-purple-700"
              : "invisible"
          }`}
        >
          {level === 0
            ? "Mood"
            : level === 1
            ? "Rude"
            : level === 2
            ? "Sad"
            : level === 3
            ? "Lost"
            : level === 4
            ? "Poetic"
            : ""}
        </span>
        Bot
      </h1>
      <p className="mb-7 sm:mb-20">Choose a bot and start typing Questions</p>

      {/* bots */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div
          onClick={() => setLevel(1)}
          className={`box-border bg-red-200 bg-opacity-30 w-[170px] sm:w-[215px] text-red-600 rounded-xl p-3 text-lg cursor-pointer ${
            level === 1 ? "border-red-500 border" : "border border-transparent"
          }`}
        >
          <span className="block text-center text-xl font-[600]">RudeBot</span>
          <span className="sm:visible sm:block hidden text-[16px] font-[400]">
            A blunt, sarcastic bot full of attitude!
          </span>
        </div>

        <div
          onClick={() => setLevel(2)}
          className={`box-border bg-blue-200 bg-opacity-30 w-[170px] sm:w-[215px] text-blue-700 rounded-xl p-3 text-lg cursor-pointer ${
            level === 2 ? "border-blue-500 border" : "border border-transparent"
          }`}
        >
          <span className="block text-center text-xl font-[600]">SadBot</span>
          <span className="sm:visible sm:block hidden text-[16px] font-[400]">
            Always feeling low, its replies are full of sighs and sadness.
          </span>
        </div>

        <div
          onClick={() => setLevel(3)}
          className={`box-border bg-gray-400 bg-opacity-30 w-[170px] sm:w-[215px] text-gray-700 rounded-xl p-3 text-lg cursor-pointer ${
            level === 3 ? "border-gray-800 border" : "border border-transparent"
          }`}
        >
          <span className="block text-center text-xl font-[600]">LostBot</span>
          <span className="sm:visible sm:block hidden text-[16px] font-[400]">
            Easily distracted, its replies tend to drift off-topic.
          </span>
        </div>

        <div
          onClick={() => setLevel(4)}
          className={`box-border bg-purple-700 bg-opacity-30 w-[170px] sm:w-[215px] text-purple-800 rounded-xl p-3 text-lg cursor-pointer ${
            level === 4
              ? "border-purple-500 border"
              : "border border-transparent"
          }`}
        >
          <span className="block text-center text-xl font-[600]">
            PoeticBot
          </span>
          <span className="sm:visible sm:block hidden text-[16px] font-[400]">
            Replies with rhymes and lyrics in a poetic way.
          </span>
        </div>
      </div>

      <div className="w-full sm:w-[50%] bg-gray-100 p-6 flex flex-col h-full">
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Conversation:</h3>
          <div className="mt-2 space-y-4">
            {history.map((entry, index) => (
              <div key={index}>
                <div className="flex flex-col space-y-4">
                  {/* I/P */}
                  <div className="flex justify-end w-[full]">
                    <div className="w-fit rounded-3xl bg-blue-100 px-5 py-2">
                      <p className="text-gray-700">{entry.question}</p>
                    </div>
                  </div>
                  {/* Bot O/P */}
                  <div className="flex justify-start items-center">
                    <RiRobot2Fill
                      size={30}
                      className={`${entry.level === 1 && "text-red-500"} ${
                        entry.level === 2 && "text-blue-500"
                      } ${entry.level === 3 && "text-gray-700"} ${
                        entry.level === 4 && "text-purple-700"
                      }`}
                    />
                    <div className="border-gray-200 w-fit rounded-3xl max-w-[70%] px-3 py-2 bg-gray-100">
                      <p className="text-black">{entry.response}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/*  chat inpot */}
        <div className="sticky bottom-7 bg-slate-200 rounded-3xl flex items-center sm:w-full w-full mx-auto z-10 p-1 mt-4 mb-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Message RudeBot"
            className="w-full p-3 ml-3 rounded-md bg-slate-200 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`p-0 mr-2 rounded-full text-black font-semibold ${
              loading ? "cursor-not-allowed" : ""
            } ${message === "" && "text-gray-500"}`}
          >
            <IoIosArrowDropupCircle size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RudeBot;
