import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer inverted>
    <Segment style={{ padding: "8em 0em" }} vertical inverted>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Container text>
              <Header
                as="h1"
                content="Book Store"
                inverted
                style={{
                  fontSize: "4em",
                  fontWeight: "normal",
                  marginBottom: "-0.5em",
                  marginTop: "2.5em",
                }}
              />
              <Header
                as="h2"
                content="Buy Used Books / Stationary at affordable prices"
                inverted
                style={{
                  fontSize: "1.5em",
                  fontWeight: "normal",
                }}
              />
              <Header
                as="h3"
                inverted
                style={{ fontSize: "2em", margin: "1.5em 0em" }}
              >
                "Knowledge increases by sharing, but not saving"
              </Header>
              <Link to="/products">
                <Button primary size="huge">
                  Get Started
                  <Icon name="right arrow" />
                </Button>
              </Link>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              BOOK DONATION
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              The World Bank in the USA sends a wide variety of educational
              books for distribution to school libraries and NGO’s, thereby
              providing world class reading material for school children
              especially the poor who may otherwise never get the opportunity to
              access such books. In addition to this they have also donated 6000
              Braille books for the visually impaired. A large number of books
              have also been given to the JAINA organisation.
            </p>
            <a href="https://ratnanidhi.org/Category/book-donation?gad=1&gclid=Cj0KCQjwpPKiBhDvARIsACn-gzAjMVfYvU3V-Vh8NxO0FPiJCEw6h5d8eMLLCXbFO48ag65haDt3rngaAsNmEALw_wcB">
              <Button as="a" size="large">
                Read More
              </Button>
            </a>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src="https://media.istockphoto.com/id/1302961248/vector/book-donation-concept-vector-illustration-on-white-background-people-donate-second-hand.jpg?s=612x612&w=0&k=20&c=01c-jPTUTRYVGTbPb_h2HgHkcADjBBpxyxAxYP8MNbs="
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container text>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <a href="#">Case Studies</a>
        </Divider>

        <Header as="h3" style={{ fontSize: "2em" }}>
          Why to donate?
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Books are uniquely portable magic that carries your attached feelings
          forward. Your books can help someone in the same way they did for you.
          We are committed to carrying your emotions with your books and making
          them grow older! Let's become a cause for change & make a difference.
        </p>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;
