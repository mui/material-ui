import { StyledOptions, JSXInEl, CreateStyledComponentIntrinsic, CreateStyledComponentExtrinsic } from './muiStyled';

export interface CreateStyled<Theme extends object = any> {
  <Tag extends React.ComponentType<any>, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions,
  ): CreateStyledComponentExtrinsic<Tag, ExtraProps, Theme>;

  <Tag extends keyof JSXInEl, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions,
  ): CreateStyledComponentIntrinsic<Tag, ExtraProps, Theme>;
}

/**
 * Cutom styled utility that has a default mui theme.
 *
 * @param tag HTML tag or component that should serve as base.
 * @param options Styled options for the created component.
 * @returns React component that has styles attached to it.
 */
declare const styled: CreateStyled;

export default styled;
