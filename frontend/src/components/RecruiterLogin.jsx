import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";

const RecruiterLogin = () => {
  const navigate = useNavigate()
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const {setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();//?

    if (state == "Sign up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);//chờ nhập ảnh
      return//chưa gửi lên server
    }

    try {
      if(state === "Login") {
        const {data} = await axios.post(backendUrl + "/api/company/login", {email, password})
        //data(body): object

        if(data.success) {
          //console.log(data)
          setCompanyData(data)
          setCompanyToken(data.token)
          localStorage.setItem("companyToken", data.token) // lưu trữ lâu dài 
          setShowRecruiterLogin(false)
          navigate("/dashboard")
        } else {
          toast.error(data.message)
        }
      } else {
        const formData = new FormData() //??
        formData.append("name", name)
        formData.append("password", password)
        formData.append("email", email)
        formData.append("image", image)

        const {data} = await axios.post(backendUrl + "/api/company/register", formData)
        if(data.success) {
          //console.log(formData)
          setCompanyData(data)
          setCompanyToken(data.token)
          localStorage.setItem("companyToken", data.token) // lưu trữ lâu dài 
          setShowRecruiterLogin(false)
          navigate("/dashboard")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
        toast.error(error.message)
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    //khi components hiện thị thì không thể cuộn
    return () => {
      document.body.style.overflow = 'unset'
    //khi components biến mất thì khôi phục 
    }
  }, []) 
  return (
    <div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0 z-1 bg-dark bg-opacity-25 backdrop-blur">
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="position-relative bg-white p-5 rounded"
      >
        <h1 className="text-center p-2">Recruiter {state}</h1>
        <p className="text-center p-3">
          Welcome back! Please sign in to continue
        </p>
        {state === "Sign up" && isTextDataSubmitted ? (
          <>
            <div className="d-flex gap-4 my-2 align-items-center">
              <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt=""
                className="img-fluid rounded-circle" style={{ maxWidth: '80px', height: 'auto' }} />
                <input onChange={e => setImage(e.target.files[0])} type="file" id="image" hidden/>
              </label>
              <p>Upload Company <br />logo</p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 d-flex align-items-center gap-2 rounded-pill mt-1">
                <img src={assets.person_icon} alt="" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                  className="form-control shadow-none outline-none border-0"
                />
              </div>
            )}
            <div className="border px-4 py-2 d-flex align-items-center gap-2 rounded-pill mt-1">
              <img src={assets.email_icon} alt="" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Id"
                required
                className="form-control shadow-none outline-none border-0"
              />
            </div>
            <div className="border px-4 py-2 d-flex align-items-center gap-2 rounded-pill mt-1 mb-2">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="form-control shadow-none outline-none border-0"
              />
            </div>
          </>
        )}
        {state === 'Login' && <p className="text-primary small p-2" style={{ cursor: "pointer" }}>
          Forgot password?
        </p>}
        <button
          type="submit"
          className="btn btn-outline-primary rounded-pill border"
        >
          {state === "Login"
            ? "login"
            : isTextDataSubmitted
            ? "create account"
            : "next"}
        </button>
        {state === "Login" ? (
          <p className="p-2 small">
            Don’t have an account?{" "}
            <span onClick={() => setState("Sign up")} className="text-primary">
              Sign up
            </span>
          </p>
        ) : (
          <p className="p-2 small">
            Already have an account?{" "}
            <span onClick={() => setState("Login")} className="text-primary">
              Login
            </span>
          </p>
        )}
        <img onClick={() => setShowRecruiterLogin(false)} src={assets.cross_icon} className="position-absolute top-0 end-0 pe-3 pt-3 me-2 mt-2" style={{cursor: 'pointer'}}/>
      </form>
    </div>
  );
};

export default RecruiterLogin;
