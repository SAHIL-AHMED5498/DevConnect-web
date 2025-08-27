import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("test1@gmail.com");
  const [pass, setPass] = useState("Test1@123");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isUser, setIsUser] = useState(true);

  const handleGuestLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/signIn`, {
        email: "test1@gmail.com",
        password: "Test1@123"
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      toast.success("Logged in as Guest");
      navigate("/");
    } catch (err) {
      toast.error("Guest login failed");
    }
  }

  const handleIsUser = () => setIsUser(!isUser);

  const handleClick = async () => {
    try {
      if (isUser) {
        const res = await axios.post(`${BASE_URL}/signIn`, {
          email: email,
          password: pass
        }, { withCredentials: true });
        dispatch(addUser(res.data));
        toast.success("Login Successful");
        navigate("/");
      } else {
        const res = await axios.post(`${BASE_URL}/signUp`, {
          email: email,
          password: pass,
          name: name,
          age: age,
          skills: "[`skill1`,`skill2`,`skill3`]",
          about: "new user",
          profileImg: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
        }, { withCredentials: true });
        dispatch(addUser(res.data));
        toast.success("Signup Successful");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      toast.error("Authentication Failed");
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-100">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="backdrop-blur-md bg-zinc-100 border border-white/40 shadow-2xl rounded-sm w-96 md:w-[400px] p-6">
        <h2 className="text-3xl font-extrabold text-blue-300 text-center mb-6 tracking-tight">
          {isUser ? "Welcome Back 👋" : "Create Account ✨"}
        </h2>

        <div className="space-y-4">
          {!isUser && (
            <>
              <input
                type="text"
                className="input input-bordered w-full rounded-xl"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="input input-bordered w-full rounded-xl"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </>
          )}

          <input
            type="text"
            className="input input-bordered w-full rounded-xl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input input-bordered w-full rounded-xl"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={handleClick}
            className="btn w-full bg-gradient-to-r from-blue-500 to-zinc-500 border-0 text-white rounded-xl hover:opacity-90 transition active:scale-95"
          >
            {isUser ? "Login" : "Sign Up"}
          </button>
          <button
            onClick={handleGuestLogin}
            className="btn w-full bg-gradient-to-r from-blue-400 to-zinc-400 border-0 text-white rounded-xl hover:opacity-90 transition active:scale-95"
          >
            Guest Login
          </button>
        </div>

        {error && <p className="mt-3 text-sm font-medium text-red-600 text-center">{error}</p>}

        <p
          onClick={handleIsUser}
          className="mt-4 text-center text-sm text-gray-600 cursor-pointer active:scale-95 "
        >
          {isUser ? "Not a user? " : "Already have an account? "}
          <span className="font-semibold text-orange-600 hover:underline">
            {isUser ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login;
