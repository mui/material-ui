import { expectType } from '@mui/types';
import { AccordionOwnerState } from '@mui/joy/Accordion';
import { AccordionGroupOwnerState } from '@mui/joy/AccordionGroup';
import { AccordionSummaryOwnerState } from '@mui/joy/AccordionSummary';
import { AccordionDetailsOwnerState } from '@mui/joy/AccordionDetails';
import { AlertOwnerState } from '@mui/joy/Alert';
import { AspectRatioOwnerState } from '@mui/joy/AspectRatio';
import { AutocompleteOwnerState } from '@mui/joy/Autocomplete';
import { AutocompleteListboxOwnerState } from '@mui/joy/AutocompleteListbox';
import { AutocompleteOptionOwnerState } from '@mui/joy/AutocompleteOption';
import { AvatarOwnerState } from '@mui/joy/Avatar';
import { AvatarGroupOwnerState } from '@mui/joy/AvatarGroup';
import { BadgeOwnerState } from '@mui/joy/Badge';
import { BreadcrumbsOwnerState } from '@mui/joy/Breadcrumbs';
import { ButtonOwnerState } from '@mui/joy/Button';
import { CardOwnerState } from '@mui/joy/Card';
import { CardContentOwnerState } from '@mui/joy/CardContent';
import { CardCoverOwnerState } from '@mui/joy/CardCover';
import { CardOverflowOwnerState } from '@mui/joy/CardOverflow';
import { CheckboxOwnerState } from '@mui/joy/Checkbox';
import { ChipOwnerState } from '@mui/joy/Chip';
import { ChipDeleteOwnerState } from '@mui/joy/ChipDelete';
import { CircularProgressOwnerState } from '@mui/joy/CircularProgress';
import { ContainerProps } from '@mui/joy/Container';
import { ScopedCssBaselineOwnerState } from '@mui/joy/ScopedCssBaseline';
import { DialogActionsOwnerState } from '@mui/joy/DialogActions';
import { DialogContentOwnerState } from '@mui/joy/DialogContent';
import { DialogTitleOwnerState } from '@mui/joy/DialogTitle';
import { DividerOwnerState } from '@mui/joy/Divider';
import { DrawerOwnerState } from '@mui/joy/Drawer';
import { FormControlOwnerState } from '@mui/joy/FormControl';
import { FormHelperTextOwnerState } from '@mui/joy/FormHelperText';
import { FormLabelOwnerState } from '@mui/joy/FormLabel';
import { GridProps } from '@mui/joy/Grid';
import { IconButtonOwnerState } from '@mui/joy/IconButton';
import { InputOwnerState } from '@mui/joy/Input';
import { LinkOwnerState } from '@mui/joy/Link';
import { LinearProgressOwnerState } from '@mui/joy/LinearProgress';
import { ListOwnerState } from '@mui/joy/List';
import { ListDividerOwnerState } from '@mui/joy/ListDivider';
import { ListSubheaderOwnerState } from '@mui/joy/ListSubheader';
import { ListItemOwnerState } from '@mui/joy/ListItem';
import { ListItemButtonOwnerState } from '@mui/joy/ListItemButton';
import { ListItemContentOwnerState } from '@mui/joy/ListItemContent';
import { ListItemDecoratorOwnerState } from '@mui/joy/ListItemDecorator';
import { MenuOwnerState } from '@mui/joy/Menu';
import { MenuButtonOwnerState } from '@mui/joy/MenuButton';
import { MenuItemOwnerState } from '@mui/joy/MenuItem';
import { MenuListOwnerState } from '@mui/joy/MenuList';
import { ModalOwnerState } from '@mui/joy/Modal';
import { ModalCloseOwnerState } from '@mui/joy/ModalClose';
import { ModalDialogOwnerState } from '@mui/joy/ModalDialog';
import { ModalOverflowOwnerState } from '@mui/joy/ModalOverflow';
import { OptionOwnerState } from '@mui/joy/Option';
import { RadioOwnerState } from '@mui/joy/Radio';
import { RadioGroupOwnerState } from '@mui/joy/RadioGroup';
import { SelectOwnerState } from '@mui/joy/Select';
import { SheetOwnerState } from '@mui/joy/Sheet';
import { SliderOwnerState } from '@mui/joy/Slider';
import { SnackbarOwnerState } from '@mui/joy/Snackbar';
import { StackProps } from '@mui/joy/Stack';
import { StepperOwnerState } from '@mui/joy/Stepper';
import { StepOwnerState } from '@mui/joy/Step';
import { StepButtonOwnerState } from '@mui/joy/StepButton';
import { StepIndicatorOwnerState } from '@mui/joy/StepIndicator';
import { extendTheme } from '@mui/joy/styles';
import { SvgIconOwnerState } from '@mui/joy/SvgIcon';
import { SwitchOwnerState } from '@mui/joy/Switch';
import { TabOwnerState } from '@mui/joy/Tab';
import { TabListOwnerState } from '@mui/joy/TabList';
import { TabPanelOwnerState } from '@mui/joy/TabPanel';
import { TabsOwnerState } from '@mui/joy/Tabs';
import { TableOwnerState } from '@mui/joy/Table';
import { TextareaOwnerState } from '@mui/joy/Textarea';
import { ToggleButtonGroupOwnerState } from '@mui/joy/ToggleButtonGroup';
import { TooltipOwnerState } from '@mui/joy/Tooltip';
import { TypographyOwnerState } from '@mui/joy/Typography';

extendTheme({
  components: {
    JoyAccordion: {
      defaultProps: {
        variant: 'soft',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AccordionOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyAccordionGroup: {
      defaultProps: {
        variant: 'soft',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AccordionGroupOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyAccordionSummary: {
      defaultProps: {
        variant: 'soft',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AccordionSummaryOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        button: ({ ownerState }) => {
          expectType<AccordionSummaryOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        indicator: ({ ownerState }) => {
          expectType<AccordionSummaryOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyAccordionDetails: {
      defaultProps: {
        variant: 'soft',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AccordionDetailsOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        content: ({ ownerState }) => {
          expectType<AccordionDetailsOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyAlert: {
      defaultProps: {
        variant: 'soft',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AlertOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<AlertOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<AlertOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyAspectRatio: {
      defaultProps: {
        variant: 'outlined',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AspectRatioOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        content: ({ ownerState }) => {
          expectType<AspectRatioOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyAutocomplete: {
      defaultProps: {
        freeSolo: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        wrapper: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        input: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        clearIndicator: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        popupIndicator: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        listbox: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        option: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        loading: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        noOptions: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
        limitTag: ({ ownerState }) => {
          expectType<
            AutocompleteOwnerState<any, any, any, any> & Record<string, unknown>,
            typeof ownerState
          >(ownerState);
          return {};
        },
      },
    },
    JoyAutocompleteListbox: {
      defaultProps: {
        variant: 'solid',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AutocompleteListboxOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyAutocompleteOption: {
      defaultProps: {
        variant: 'solid',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AutocompleteOptionOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyAvatar: {
      defaultProps: {
        variant: 'outlined',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AvatarOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        img: ({ ownerState }) => {
          expectType<AvatarOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        fallback: ({ ownerState }) => {
          expectType<AvatarOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyAvatarGroup: {
      defaultProps: {
        variant: 'solid',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<AvatarGroupOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyBadge: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'danger',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<BadgeOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        badge: ({ ownerState }) => {
          expectType<BadgeOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyBreadcrumbs: {
      defaultProps: {
        size: 'sm',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<BreadcrumbsOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        ol: ({ ownerState }) => {
          expectType<BreadcrumbsOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        li: ({ ownerState }) => {
          expectType<BreadcrumbsOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        separator: ({ ownerState }) => {
          expectType<BreadcrumbsOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyButton: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ButtonOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<ButtonOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<ButtonOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyCard: {
      defaultProps: {
        size: 'sm',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<CardOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyCardContent: {
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<CardContentOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyCardCover: {
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<CardCoverOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyCardOverflow: {
      defaultProps: {
        variant: 'solid',
        color: 'success',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<CardOverflowOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyCheckbox: {
      defaultProps: {
        variant: 'solid',
        color: 'success',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<CheckboxOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        checkbox: ({ ownerState }) => {
          expectType<CheckboxOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        action: ({ ownerState }) => {
          expectType<CheckboxOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        input: ({ ownerState }) => {
          expectType<CheckboxOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        label: ({ ownerState }) => {
          expectType<CheckboxOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyChip: {
      defaultProps: {
        size: 'sm',
        variant: 'solid',
        color: 'success',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ChipOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        label: ({ ownerState }) => {
          expectType<ChipOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        action: ({ ownerState }) => {
          expectType<ChipOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<ChipOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<ChipOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyChipDelete: {
      defaultProps: {
        variant: 'solid',
        color: 'success',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ChipDeleteOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyCircularProgress: {
      defaultProps: {
        variant: 'soft',
        color: 'primary',
        size: 'md',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<CircularProgressOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        svg: ({ ownerState }) => {
          expectType<CircularProgressOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        track: ({ ownerState }) => {
          expectType<CircularProgressOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        progress: ({ ownerState }) => {
          expectType<CircularProgressOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyContainer: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ContainerProps & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyScopedCssBaseline: {
      defaultProps: {
        disableColorScheme: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ScopedCssBaselineOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyDialogActions: {
      defaultProps: {
        buttonFlex: 1,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<DialogActionsOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyDialogContent: {
      defaultProps: {
        orientation: 'horizontal',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<DialogContentOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyDialogTitle: {
      defaultProps: {
        level: 'title-md',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<DialogTitleOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyDivider: {
      defaultProps: {
        orientation: 'vertical',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<DividerOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyDrawer: {
      defaultProps: {
        variant: 'plain',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<DrawerOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        backdrop: ({ ownerState }) => {
          expectType<DrawerOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        content: ({ ownerState }) => {
          expectType<DrawerOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyFormControl: {
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<FormControlOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyFormHelperText: {
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<FormHelperTextOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyFormLabel: {
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<FormLabelOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyGrid: {
      defaultProps: {
        spacing: 1,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<GridProps & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyIconButton: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<IconButtonOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        loadingIndicator: ({ ownerState }) => {
          expectType<IconButtonOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyInput: {
      defaultProps: {
        size: 'sm',
        variant: 'solid',
        color: 'success',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<InputOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        input: ({ ownerState }) => {
          expectType<InputOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<InputOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<InputOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyLink: {
      defaultProps: {
        level: 'body-md',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<LinkOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<LinkOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<LinkOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyLinearProgress: {
      defaultProps: {
        variant: 'soft',
        color: 'primary',
        size: 'md',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<LinearProgressOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyList: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ListOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyListDivider: {
      defaultProps: {
        inset: 'gutter',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ListDividerOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyListSubheader: {
      defaultProps: {
        sticky: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ListSubheaderOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyListItem: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ListItemOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyListItemButton: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ListItemButtonOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyListItemContent: {
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ListItemContentOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyListItemDecorator: {
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ListItemDecoratorOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyMenu: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<MenuOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyMenuButton: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<MenuButtonOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyMenuItem: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<MenuItemOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyMenuList: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<MenuListOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyModal: {
      defaultProps: {
        disableAutoFocus: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ModalOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        backdrop: ({ ownerState }) => {
          expectType<ModalOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyModalClose: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ModalCloseOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyModalDialog: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
        layout: 'center',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ModalDialogOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyModalOverflow: {
      defaultProps: {},
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ModalOverflowOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyOption: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<OptionOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyRadio: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<RadioOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        radio: ({ ownerState }) => {
          expectType<RadioOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        icon: ({ ownerState }) => {
          expectType<RadioOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        action: ({ ownerState }) => {
          expectType<RadioOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        input: ({ ownerState }) => {
          expectType<RadioOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        label: ({ ownerState }) => {
          expectType<RadioOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyRadioGroup: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<RadioGroupOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoySelect: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<SelectOwnerState<any, any> & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        button: ({ ownerState }) => {
          expectType<SelectOwnerState<any, any> & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<SelectOwnerState<any, any> & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<SelectOwnerState<any, any> & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        indicator: ({ ownerState }) => {
          expectType<SelectOwnerState<any, any> & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
        listbox: ({ ownerState }) => {
          expectType<SelectOwnerState<any, any> & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoySheet: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<SheetOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoySlider: {
      defaultProps: {
        size: 'sm',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<SliderOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        mark: ({ ownerState }) => {
          expectType<SliderOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        markLabel: ({ ownerState }) => {
          expectType<SliderOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        rail: ({ ownerState }) => {
          expectType<SliderOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        track: ({ ownerState }) => {
          expectType<SliderOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        thumb: ({ ownerState }) => {
          expectType<SliderOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        valueLabel: ({ ownerState }) => {
          expectType<SliderOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        input: ({ ownerState }) => {
          expectType<SliderOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoySnackbar: {
      defaultProps: {
        variant: 'plain',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<SnackbarOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<SnackbarOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<SnackbarOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        clickAway: ({ ownerState }) => {
          expectType<SnackbarOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyStack: {
      defaultProps: {
        spacing: 1,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<StackProps & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyStepper: {
      defaultProps: {
        orientation: 'vertical',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<StepperOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyStep: {
      defaultProps: {
        orientation: 'vertical',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<StepOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyStepButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<StepButtonOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyStepIndicator: {
      defaultProps: {
        color: 'primary',
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<StepIndicatorOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoySvgIcon: {
      defaultProps: {
        fontSize: 'md',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<SvgIconOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoySwitch: {
      defaultProps: {
        size: 'sm',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<SwitchOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        action: ({ ownerState }) => {
          expectType<SwitchOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        input: ({ ownerState }) => {
          expectType<SwitchOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        track: ({ ownerState }) => {
          expectType<SwitchOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        thumb: ({ ownerState }) => {
          expectType<SwitchOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyTab: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<TabOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyTabList: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<TabListOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyTabPanel: {
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<TabPanelOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyTabs: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<TabsOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyTable: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<TableOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyTextarea: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<TextareaOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        textarea: ({ ownerState }) => {
          expectType<TextareaOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<TextareaOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<TextareaOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyToggleButtonGroup: {
      defaultProps: {
        size: 'sm',
        variant: 'solid',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<ToggleButtonGroupOwnerState & Record<string, unknown>, typeof ownerState>(
            ownerState,
          );
          return {};
        },
      },
    },
    JoyTooltip: {
      defaultProps: {
        size: 'md',
        variant: 'solid',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<TooltipOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        arrow: ({ ownerState }) => {
          expectType<TooltipOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
    JoyTypography: {
      defaultProps: {
        level: 'body-md',
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<TypographyOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        startDecorator: ({ ownerState }) => {
          expectType<TypographyOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
        endDecorator: ({ ownerState }) => {
          expectType<TypographyOwnerState & Record<string, unknown>, typeof ownerState>(ownerState);
          return {};
        },
      },
    },
  },
});
