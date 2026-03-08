import React, { useState } from "react";
import MetaData from "./MetaData";
import "./Support.css";
import axios from "axios";
import BottomTab from "./BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Support = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v2/support",
        {
          user_name: name,
          user_email: email,
          user_subject: subject,
          user_message: message,
        },
        config
      );
      if (data.success) {
        toast.success(data.message);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaData title="Support" />
      <div
        className="support"
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 0",
        }}
      >
        <h2
          className="support__heading"
          style={{
            textAlign: "center",
          }}
        >
          Hey How can we improve our services
        </h2>
        <h2
          className="support__heading"
          style={{
            textAlign: "center",
          }}
        >
          Report us for something...
        </h2>
        <div>
          <form
            style={{
              width: "400px",
              margin: "auto",
              padding: "20px 0",
            }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Write your Name ..."
              required
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                borderBottom: "1px solid #3BB77E",
                margin: "10px 0",
                fontSize: "1.2vmax",
                height: "40px",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="user_name"
            />
            <input
              type="text"
              placeholder="Write a Subject ..."
              required
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                borderBottom: "1px solid #3BB77E",
                margin: "10px 0",
                fontSize: "1.2vmax",
                height: "40px",
              }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              name="user_subject"
            />
            <input
              type="email"
              name="user_email"
              placeholder="write your Email ..."
              required
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                borderBottom: "1px solid #3BB77E",
                margin: "10px 0",
                fontSize: "1.2vmax",
                height: "40px",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              cols="30"
              rows="5"
              required
              placeholder="write your message ..."
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                borderBottom: "1px solid #3BB77E",
                margin: "10px 0",
                fontSize: "1.2vmax",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="user_message"
            ></textarea>
            <button
              style={{
                border: "none",
                cursor: "pointer",
                width: "100%",
                background: "#3BB77E",
                height: "40px",
                margin: "10px 0",
                color: "#fff",
                fontSize: "1.2vmax",
              }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
          <div className="animation"></div>
        </div>
      </div>
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
      />
      <BottomTab />
    </>
  );
};

export default Support;
