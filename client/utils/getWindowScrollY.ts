export default function getWindowScrollY() {
  return window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
}