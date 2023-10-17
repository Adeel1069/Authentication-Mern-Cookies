import { Link } from "react-router-dom";

const Hero = ({ userInfo }) => {
  return (
    <div className="HeroContainer">
      <h3 className="Title">Mern Authentication</h3>
      <p className="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore earum
        vel itaque dolorem labore alias iusto id ipsum perspiciatis voluptatem
        quam et sed ab dolorum eius, sequi cum obcaecati necessitatibus!
      </p>
      <div className="ActionButtons">
        {userInfo ? (
          <Link to="/profile">
            <button>See Profile </button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              {" "}
              <button>Sign In </button>
            </Link>
            <Link to="/signup">
              {" "}
              <button>Sign Up </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
