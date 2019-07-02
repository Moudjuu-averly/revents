import {firestore, storage} from "../../config/fbConfig";
import {toastr} from 'react-redux-toastr';
const uuidv1 = require('uuid/v1');

export const basicProfile = (info) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FORM_SUBMITTING'
    });
    const uid = getState().firebase.auth.uid;
    firestore.collection('users').doc(uid).update({
      ...info
    }).then(() => {
      toastr.success('Basic profile Updated.');
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
    }).catch((err) => {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.error('Failed to Update.', err.message);
    });
  }
};

export const aboutMeProfile = (info) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FORM_SUBMITTING'
    });
    const uid = getState().firebase.auth.uid;
    firestore.collection('users').doc(uid).update({
      ...info
    }).then(() => {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.success('About Me Updated.');
    }).catch((err) => {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.error('Failed to Update.', err.message);
    });
  }
};

export const uploadPhoto = (image) => {
  return (dispatch, getState) => {
    const storageRef = storage.ref('images');
    const fileName = uuidv1();
    const uid = getState().firebase.auth.uid;
    const previousImages = getState().firebase.profile.images || [];
    dispatch({
      type: 'FORM_SUBMITTING'
    });
    storageRef.child(`${uid}/${fileName}`).putString(image, 'data_url')
      .then((snapshot) => {
        return storageRef.child(`${uid}/${fileName}`).getDownloadURL()
    }).then((url) => {
      return firestore.collection('users').doc(uid).update({
        images: [...previousImages, url]
      })
    })
    .then(() => {
      toastr.success('Image added successfully.');
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
    }).catch((err) => {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.error('Unable to add Image.', err.message);
    });
  }
};

export const setMainPhoto = (mainImage) => {
  return (dispatch, getState) => {
    const uid = getState().firebase.auth.uid;
    const previousImages = getState().firebase.profile.images;
    const updatedImages = [mainImage];
    previousImages.forEach(image => {
      if(image !== mainImage){
        updatedImages.push(image);
      }
    });
    firestore.collection('users').doc(uid).update({
        images: updatedImages
      })
      .then(() => {
        console.log('Image set as Main.');
      }).catch((err) => {
      toastr.error('Unable to set Image as Main.', err.message);
    });
  }
};

export const deletePhoto = (image) => {
  return (dispatch, getState) => {
    const storageRef = storage.ref('images');
    //Extract fileName from image url
    const fileName = image.substring(112, 148);
    const uid = getState().firebase.auth.uid;
    const previousImages = getState().firebase.profile.images;
    const updatedImages = previousImages.filter((currImage) => currImage !== image);
    storageRef.child(`${uid}/${fileName}`).delete().then(function() {
      return firestore.collection('users').doc(uid).update({
        images: updatedImages
      })
    })
    .then(() => {
      console.log('Image deleted successfully.');
    }).catch((err) => {
    toastr.error('Unable to delete Image.', err.message);
    });
  }
};