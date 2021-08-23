export function handleClickLink(e, linkState, setLinkState) {
  const current = e.currentTarget;
  const previous = linkState;
  if (current === previous) return;
  if (previous) {
    previous.style.borderBottom = "3px solid transparent";
    previous.style.color = "";
  }
  setLinkState(current);
  current.style.color = "dodgerblue";
  if (current.id === "profile") return;
  current.style.borderBottom = "3px solid dodgerblue";
}
