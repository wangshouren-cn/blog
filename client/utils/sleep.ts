export default function sleep(delay: number) {
  for (let now = Date.now(); now + delay < Date.now(););
}