export function handleClickLink(e, linkState, setLinkState) {
  const current = e.currentTarget;
  const previous = linkState;
  if (previous) {
    if (previous.id === "profile") previous.style.backgroundColor = "#e9ecef";
    previous.style.borderBottom = "3px solid transparent";
    previous.style.color = "";
  }
  if (current) {
    if (setLinkState) setLinkState(current);
    current.style.color = "dodgerblue";
    if (current.id === "profile") {
      current.style.backgroundColor = "lightblue";
      return;
    }
    current.style.borderBottom = "3px solid dodgerblue";
  }
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
  //We do not remove the photo from the storage, because in the case of multiple occurances, the removal
  //of the photo causes error. If we want to take into account the storage efficiency, we have to store
  //the number of occurences of each photo and only delete those from the storage, which only occure once.
  //This would cause unnecessary extra logic in a demonstration app like this.
  removePhotoFromPost(input.state, input.setState, input.sideEffect);
}

function removePhotoFromPost(state, setState, sideEffect) {
  const newState = { ...state };
  newState.isPhoto = false;
  newState.photoURL = "";
  setState(newState);
  if (sideEffect) sideEffect();
}

export function handleKeyPress(e, save) {
  if (e.shiftKey) return;
  const code = e.code;
  if (code !== "Enter") return;
  e.preventDefault();
  save();
}
