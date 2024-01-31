/* eslint-disable no-unused-vars */
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const descriptionWrapper = document.querySelector(".description-wrapper");
    const description = document.querySelector(".description");
    const parameters = description.getBoundingClientRect();
    const width = parameters.width;
    const height = parameters.height;

    descriptionWrapper.addEventListener("mouseleave", function () {
      description.style.transition = ".3s";
      setTimeout(() => {
        description.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
      }, 100);
    });
    descriptionWrapper.addEventListener("mousemove", function (event) {
      const x = event.x;
      const y = event.y;

      const cardOffsetTop = parameters.top;
      const cardOffsetLeft = parameters.left;

      const xPos = x - cardOffsetLeft - width / 2;
      const yPos = y - cardOffsetTop - height / 2;

      const xPercent = (xPos / width) * 0.0003;
      const yPercent = (yPos / height) * 0.0003;
      description.style.transition = "none";
      setTimeout(() => {
        description.style.transform = `matrix3d(1, 0, 0, ${xPercent.toFixed(
          6
        )}, 0, 1, 0, ${yPercent.toFixed(6)}, 0, 0, 1, 0, 0, 0, 0, 1)`;
      }, 100);
    });
  }, []);
  return (
    <>
      <div className="home-page">
        <div className="top-gradient" />
        <div className="title-content">
          <div className="title-wrapper">
            <div className="title">
              Welcome to <br /> <span>🎮WebArcade🕹️</span>
            </div>
          </div>
        </div>
        <div className="description-wrapper">
          <div className="description">
            <p className="paragraph1">
              Dive into the world of endless fun and excitement where gaming
              meets the web!
            </p>
            <p>
              Whether you&apos;re a casual player or a hardcore gamer, our
              virtual arcade has something for everyone.
            </p>
            <p>
              Start your adventure now at WebArcade and share your high scores,
              and discover new challenges!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
