export default function clearHtmlTag(str: string) {
  return str.replace(/\<.+?\>/g, "");
}