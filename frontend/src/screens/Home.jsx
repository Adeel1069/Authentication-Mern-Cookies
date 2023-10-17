import Hero from "../components/Hero";
import { useSelector } from "react-redux";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return <Hero userInfo={userInfo} />;
};

export default Home;
