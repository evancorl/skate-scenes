import React from 'react';
import Scroll from 'react-scroll';

const ScrollElement = Scroll.Element;
const ScrollLink = Scroll.Link;

class Introduction extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <ScrollElement name="intro" id="intro" className="intro-band">
        <div className="inner-hor">
          <div className="col-wide intro-col">
            <img src="/images/me.jpg" className="intro-photo" />
            <div className="intro-text">
              <h1 className="intro-title">
                Hi, I'm Evan.
              </h1>
              <p className="intro-body">
                <span>I </span>
                <span className="intro-love">love </span>
                <span>web and mobile app development.</span>
              </p>
              <ScrollLink
                className="intro-contact-btn button red"
                to="contact"
                smooth={true}
                offset={-50}
                duration={500}
              >Contact Me</ScrollLink>
            </div>
          </div>
        </div>
      </ScrollElement>
    );
  }
}

export default Introduction;
