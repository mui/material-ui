import {
  StyledOptions,
  JSXInEl,
  CreateStyledComponentIntrinsic,
  CreateStyledComponentExtrinsic,
} from '../styles/muiStyled';

export interface CreateStyled<Theme extends object = any> {
  <Tag extends React.ComponentType<any>, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions
  ): CreateStyledComponentExtrinsic<Tag, ExtraProps, Theme>;

  <Tag extends keyof JSXInEl, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions
  ): CreateStyledComponentIntrinsic<Tag, ExtraProps, Theme>;
}

/**
 * Custom styled utility that has a default MUI theme.
 *
 * @param tag HTML tag or component that should serve as base.
 * @param options Styled options for the created component.
 * @returns React component that has styles attached to it.
 */
declare const experimentalStyled: CreateStyled;

export default experimentalStyled;
