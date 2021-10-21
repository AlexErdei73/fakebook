export function handleClickLink(e, linkState, setLinkState) {
  const current = e.currentTarget;
  const previous = linkState;
  if (current === previous) return;
  if (previous) {
    previous.style.borderBottom = "3px solid transparent";
    previous.style.color = "";
  }
  setLinkState(current);
  if (current.id === "profile") return;
  current.style.color = "dodgerblue";
  current.style.borderBottom = "3px solid dodgerblue";
}

export function handleTextareaChange(input) {
  let value = input.e.target.value;
  const newState = { ...input.state };
  newState.text = value;
  input.setState(newState);
  return value;
}

export function addPhoto(input) {
  const newState = { ...input.state };
  newState.isPhoto = true;
  newState.photoURL = `${input.userID}/${input.file.name}`;
  input.setState(newState);
}

export function delPhoto(input) {
  const photoURL = input.state.photoURL;
  //we only remove the photo from the storage if it's not in the photos of the user
  const photoURLs = input.user.photos.map(
    (photo) => `${input.userID}/${photo.fileName}`
  );
  if (photoURLs.indexOf(photoURL) !== -1) {
    removePhotoFromPost(input.state, input.setState, input.sideEffect);
    return;
  }
  const ref = input.storage.ref().child(photoURL);
  ref.delete().then(() => {
    removePhotoFromPost(input.state, input.setState, input.sideEffect);
  });
}

function removePhotoFromPost(state, setState, sideEffect) {
  const newState = { ...state };
  newState.isPhoto = false;
  newState.photoURL = "";
  setState(newState);
  if (sideEffect) sideEffect();
}
