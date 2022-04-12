import Container from './Container';
import styled from './styled';

export default function createContainer(options?: {
  defaultTheme: object;
  styled: typeof styled;
  getContainerUtilityClass: (slot: string) => string;
}): typeof Container;
