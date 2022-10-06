import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  OAuthProvider,
  PhoneAuthProvider,
  reauthenticateWithCredential,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
  verifyPasswordResetCode,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../config/firebase";

export class AuthServices {
  createAccount = ({ email, password, username }: any) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        return updateProfile(user, { displayName: username })
          .then((e) => e)
          .catch((error) => {
            throw Error(error.code);
          });
      })
      .catch((error) => {
        throw Error(error.code);
      });
  };

  signIn = ({ email, password }: any) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };

  signInWithPhone = ({ phone }: any) => {
    var appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {},
      },
      auth
    );
    return signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        return confirmationResult;
      })
      .catch((error) => {
        throw Error(error.code);
      });
  };

  confirmPhone = ({ code, verificationId }) => {
    var credential = PhoneAuthProvider.credential(verificationId, code);
    return signInWithCredential(auth, credential)
      .then((result) => {
        return result.user;
      })
      .catch((error) => {
        throw Error(error.message);
      });
  };

  getToken = () => {
    return getIdToken(auth.currentUser)
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };

  sendResetEmail = ({ email }: any) => {
    return sendPasswordResetEmail(auth, email)
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };

  logout = () => {
    return signOut(auth)
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };

  signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };

  signInWithApple = async () => {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    return signInWithPopup(auth, provider)
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };

  resetPassword = async (code, password) => {
    return verifyPasswordResetCode(auth, code)
      .then(function (email) {
        return confirmPasswordReset(auth, code, password)
          .then((e) => e)
          .catch((error) => {
            throw Error(error.code);
          });
      })
      .catch((error) => {
        throw Error(error.code);
      });
  };

  updateProfile = async (data) => {
    function clean(obj) {
      return Object.fromEntries(
        Object.entries(obj)
          .filter(([_, v]) => v != null)
          .map(([k, v]) => [k, v === Object(v) ? clean(v) : v])
      );
    }
    const user = auth.currentUser;
    return updateProfile(
      user,
      clean({
        displayName: data.displayName,
        photoURL: data.photoURL,
      })
    )
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };

  changePassword = async ({ new_password, old_password }) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, old_password);
    return reauthenticateWithCredential(user, credential)
      .then(() => {
        return updatePassword(user, new_password)
          .then((e) => e)
          .catch((error) => {
            throw Error(error.code);
          });
      })
      .catch((error) => {
        throw Error(error.code);
      });
  };
}
