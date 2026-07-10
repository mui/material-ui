export default function getMemberImageFile(member: { name: string }) {
  return `${member.name
    .split(' ')
    .map((x) => x.toLowerCase())
    .join('-')}.png`;
}
