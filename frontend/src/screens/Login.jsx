import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
    } catch (error) {
      toast.error(
        error?.data?.message || error?.error || "Something went wrong"
      );
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} className="FormWrapper">
        <h3 className="Title">Sign In</h3>
        <div className="FromField">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="FromField">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="ActionButtons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging..." : "Login"}
          </button>
        </div>
        <div>
          Don't have an account ? <Link to="/signup">Register</Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default Login;
