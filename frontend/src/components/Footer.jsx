import profileImg from "../img/cat-profile.jpg";
import githubImg from "../img/github.png";
import linkedInImg from "../img/linkedIn.png";
import mokokoImg from "../img/personal_website.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleGameNavigation = async (route) => {
    navigate(`${route}`);
    window.location.reload();
  };

  return (
    <>
      <footer className="footer-bound">
        <div className="footer">
          <div className="profile-card">
            <div className="name-field">
              <img src={profileImg} />
              Eric Son
            </div>
            <div className="email-field">insooeric.son@gmail.com</div>
            <div className="links-field">
              <a
                href="https://github.com/insooeric/WebArcade"
                target="_blank"
                rel="noreferrer"
              >
                <img src={githubImg} />
              </a>
              <a
                href="https://insooeric.github.io/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={mokokoImg} />
              </a>
              <a href="/404" target="_blank" rel="noreferrer">
                <img src={linkedInImg} />
              </a>
            </div>
          </div>
          <div className="content-boundary">
            <div className="content">
              <div className="content-layout col-1">
                <span className="title">Games</span>
                <div className="ul-container">
                  <ul>
                    <li
                      onClick={() =>
                        handleGameNavigation("/game-page/tower-stack")
                      }
                    >
                      Tower
                    </li>
                    <li
                      onClick={() =>
                        handleGameNavigation("/game-page/memory-game")
                      }
                    >
                      Memory
                    </li>
                    <li
                      onClick={() =>
                        handleGameNavigation("/game-page/simon-game")
                      }
                    >
                      Simon
                    </li>
                  </ul>
                  <ul>
                    <li
                      onClick={() =>
                        handleGameNavigation("/game-page/click-game")
                      }
                    >
                      Click
                    </li>
                    <li
                      onClick={() =>
                        handleGameNavigation("/game-page/word-type")
                      }
                    >
                      Typing
                    </li>
                    <li
                      onClick={() =>
                        handleGameNavigation("/game-page/flappy-bird")
                      }
                    >
                      Flappy
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content-layout col-2">
                <span className="title">Others</span>
                <ul>
                  <li onClick={() => handleGameNavigation("/settings")}>
                    Account Setting
                  </li>
                </ul>
              </div>
              <div className="content-layout col-3">
                <span className="title">Contact</span>
                <ul>
                  {/* <li>yeet</li>
                  <li>yeet</li>
                  <li>yeet</li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
