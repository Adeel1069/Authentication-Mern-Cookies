import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import avatar from "../assets/profile.png";
import convertToBase64 from "../utils.js/base64Conversion";

const Profile = () => {
  const [profileImg, setProfileImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setProfileImg(userInfo.profileImg);
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfileImg(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password did not match");
    } else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name,
          email,
          password,
          profileImg,
        }).unwrap();
        setPassword("");
        setConfirmPassword("");
        dispatch(setCredentials(res));
        toast.success("Your profile has been updated.");
      } catch (error) {
        toast.error(
          error?.data?.message ||
            error?.error ||
            "Something went wrong, Please try again"
        );
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} className="FormWrapper">
        <h3 className="Title">Profile</h3>
        <div className="FromField">
          <div className="FromField">
            <label htmlFor="file-upload" className="CustomFileUpload">
              <img src={profileImg || avatar} alt="" />
            </label>

            <input
              hidden
              type="file"
              lable="Image"
              name="myFile"
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          />
        </div>
        <div className="FromField">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="ActionButtons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Update Profile"}
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default Profile;
