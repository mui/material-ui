// reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#name_conversion
export default function getDataset(dataAttribute: string) {
  return dataAttribute
    .toLowerCase()
    .replace(/([\u002d][a-z])/g, (m, chr) => chr.substr(1).toUpperCase());
}
