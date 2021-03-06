import React from "react";
import app from "./firebase";
import {
  doc,
  getDocs,
  onSnapshot,
  getFirestore,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Context = React.createContext();

export const GlobalState = () => {
  return React.useContext(Context);
};

const d = new Date();
const m = ("0" + (d.getMonth() + 1)).slice(-2);
const y = d.getFullYear();
const auth = getAuth();
const db = getFirestore();
let profileListener = null;

export class GlobalStateProvider extends React.Component {
  state = {
    profile: 0,
    notifications: [],
    loggedIn: false,
    activeMonth: `${m}_${y}`,
    monthList: [],
    data: [],
    total: {
      income: 0,
      expense: 0,
      balance: 0,
    },
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
    const getData = async () => {
      const userData = collection(db, `users/${uid}/data`);
      const docSnap = await getDocs(userData);

      this.setState({
        monthList: docSnap.docs.map((doc) => doc.id),
      });
    };

    getData();

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
      } else {
        this.setState({
          uid: null,
          email: null,
          profile: 0,
          loggedIn: false,
        });
        profileListener && profileListener();
      }
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
