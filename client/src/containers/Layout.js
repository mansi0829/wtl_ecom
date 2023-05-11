import React from "react";
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";

class CustomLayout extends React.Component {
  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
    const { authenticated, cart, loading } = this.props;
    return (
      <div>
        <Segment
          inverted
          textAlign="center"
          style={{ margin: "0em", padding: "1em 0em 0em 0em" }}
        >
          <Menu inverted pointing secondary size="large">
            <Container>
              <Link to="/">
                <Menu.Item header>Home</Menu.Item>
              </Link>
              <Link to="/products">
                <Menu.Item header>Products</Menu.Item>
              </Link>
              {authenticated ? (
                <React.Fragment>
                  <Menu.Menu position="right">
                    <Link to="/profile">
                      <Menu.Item header>Profile</Menu.Item>
                    </Link>
                    <Dropdown
                      icon="cart"
                      loading={loading}
                      text={`${cart !== null ? cart.order_items.length : 0}`}
                      pointing
                      className="link item"
                    >
                      <Dropdown.Menu>
                        {cart !== null ? (
                          <React.Fragment>
                            {cart.order_items.map((order_item) => {
                              return (
                                <Dropdown.Item key={order_item.id}>
                                  {order_item.quantity} x{" "}
                                  {order_item.item.title}
                                </Dropdown.Item>
                              );
                            })}
                            {cart.order_items.length < 1 ? (
                              <Dropdown.Item>
                                No items in your cart
                              </Dropdown.Item>
                            ) : null}
                            <Dropdown.Divider />

                            <Dropdown.Item
                              icon="arrow right"
                              text="Checkout"
                              onClick={() =>
                                this.props.history.push("/order-summary")
                              }
                            />
                          </React.Fragment>
                        ) : (
                          <Dropdown.Item>No items in your cart</Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item header onClick={() => this.props.logout()}>
                      <Button as="a" inverted>
                        logout
                      </Button>
                    </Menu.Item>
                  </Menu.Menu>
                </React.Fragment>
              ) : (
                <Menu.Menu position="right">
                  <Link to="/login">
                    <Menu.Item header>
                      <Button as="a" inverted>
                        Login
                      </Button>
                    </Menu.Item>
                  </Link>
                  <Link to="/signup">
                    <Menu.Item header>
                      <Button as="a" inverted>
                        Signup
                      </Button>
                    </Menu.Item>
                  </Link>
                </Menu.Menu>
              )}
            </Container>
          </Menu>
        </Segment>

        {this.props.children}

        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                @2023
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart,
    loading: state.cart.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
