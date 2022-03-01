import React from "react";
import Router from "next/router";
import app from "./firebase";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Context = React.createContext();

export const GlobalState = () => {
  return React.useContext(Context);
};

const auth = getAuth();
const db = getFirestore();
let profileListener = null;

export class GlobalStateProvider extends React.Component {
  state = {
    profile: 0,
    notifications: [],
    loggedIn: false,
  };

  set(key, val) {
    this.setState({ [key]: val });
  }

  notify(kind, msg) {
    this.setState({
      notifications: [
        ...this.state.notifications,
        {
          notificationType: kind, // success - error - info
          notificationText: msg,
        },
      ],
    });
  }

  listenForProfile(uid) {
    profileListener = onSnapshot(doc(db, "users", uid), (doc) => {
      this.setState({ profile: doc.data() });
    });
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({
          uid: user.uid,
          email: user.email,
          loggedIn: true,
        });
        this.listenForProfile(user.uid);
        console.log(user);
      } else {
        this.setState({
          uid: null,
          email: null,
          profile: 0,
          loggedIn: false,
        });
        profileListener && profileListener();
      }
      console.log(user);
    });
  }

  render() {
    return (
      <Context.Provider
        value={Object.assign(this.state, {
          set: (key, value) => this.set(key, value),
          notify: (kind, msg) => this.notify(kind, msg),
        })}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
