import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="HeaderContainer">
      <Link className="Logo">MERN Auth</Link>
      {userInfo ? (
        <div className="ActionButtons">
          <Link to="/profile">
            {" "}
            <button>Profile </button>
          </Link>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      ) : (
        <div className="ActionButtons">
          <Link to="/login">
            {" "}
            <button>Sign In </button>
          </Link>
          <Link to="/signup">
            {" "}
            <button>Sign Up </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
