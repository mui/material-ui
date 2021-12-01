import * as React from 'react';
import { debounce } from '@mui/material/utils';
import { Box } from '@mui/system';
import { VariantProp, ColorPaletteProp, BorderRadius, Elevation } from '@mui/joy/styles';
import { Typography } from 'docs/src/joy/components';

const InnerFrame = ({
  displayName,
  state,
}: {
  displayName: string;
  state: 'hidden' | 'hovered' | 'selected';
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: -6,
        left: -6,
        right: -6,
        bottom: -6,
        border: '1px solid',
        borderColor: 'danger.500',
        pointerEvents: 'none',
        opacity: 1,
        transition: '0.2s',
        ...(state === 'hidden' && { opacity: 0 }),
        ...(state === 'hovered' && { borderColor: 'neutral.400' }),
      }}
    >
      <Box
        sx={[
          {
            px: 0.5,
            transform: 'translateY(-100%)',
            ml: '-1px',
            width: 'min-content',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
          },
          // @ts-ignore this should be fixed once Box is from Joy
          (theme: JoyTheme) => ({
            ...theme.variants.contained[state === 'selected' ? 'danger' : 'neutral'],
            ...theme.variants.containedOverrides[state === 'selected' ? 'danger' : 'neutral'],
          }),
        ]}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '10px',
          }}
        >
          {displayName}
        </Typography>
      </Box>
    </Box>
  );
};

export interface DemoProps {
  variant?: VariantProp;
  color?: ColorPaletteProp;
  size?: 'small' | 'default' | 'large';
  roundness?: keyof BorderRadius;
  elevation?: keyof Elevation;
}

export const DemoContext = React.createContext<
  | {
      hoveredId: string | null;
      selectedId: string;
      nodeData: Record<string, DemoProps>;
      hoverNode: (id: string | null) => void;
      leaveNode: (id: string) => void;
      selectNode: (id: string, defaultProps: DemoProps) => void;
    }
  | undefined
>(undefined);

export const nodeMap = new Map<
  string,
  { displayName: string; supportedProps: Array<keyof DemoProps>; defaultProps: DemoProps }
>();

export const useDemoController = (defaultSelectedNode: Record<string, DemoProps>) => {
  const [nodeData, setNodeData] = React.useState<Record<string, DemoProps>>(defaultSelectedNode);
  const [selectedId, setSelectedId] = React.useState<string>(Object.keys(defaultSelectedNode)[0]);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const handleMouseOver = React.useMemo(
    () =>
      debounce((id: string | null) => {
        setHoveredId(id);
      }, 80),
    [],
  );

  return {
    nodeData,
    hoveredId,
    selectedId,
    hoverNode: handleMouseOver,
    leaveNode: (id: string) => {
      setHoveredId((currentId) => {
        if (currentId === id) {
          return null;
        }
        return currentId;
      });
    },
    selectNode: (id: string, defaultProps: DemoProps) => {
      setNodeData((currentNodes) => {
        return {
          ...currentNodes,
          [id]: {
            ...defaultProps,
            ...currentNodes[id],
          },
        };
      });
      setSelectedId(id);
    },
    updateNode: (id: string, props: DemoProps) => {
      setNodeData((currentNodes) => {
        return {
          ...currentNodes,
          [id]: {
            ...currentNodes[id],
            ...props,
          },
        };
      });
    },
  };
};

export const registerNode = <T extends React.ComponentType<DemoProps>>(
  Component: T,
  config: {
    id: string;
    displayName: string;
    supportedProps: Array<keyof DemoProps>;
  },
) => {
  nodeMap.set(config.id, { ...config, defaultProps: {} });
  return (({ children, ...props }) => {
    const context = React.useContext(DemoContext);
    const ref = React.useRef<HTMLElement | null>(null);
    if (!context) {
      return null;
    }
    const { hoveredId, selectedId, nodeData, hoverNode, leaveNode, selectNode } = context;
    const defaultProps: DemoProps = {};
    Object.entries(props).forEach((item) => {
      const [key, value] = item as [keyof DemoProps, any];
      if (config.supportedProps.includes(key)) {
        defaultProps[key] = value;
      }
    });
    nodeMap.set(config.id, { ...config, defaultProps });
    return (
      // @ts-ignore internal component
      <Component
        ref={ref}
        {...props}
        {...nodeData[config.id]}
        onMouseOver={(event: React.MouseEvent) => {
          event.stopPropagation(); // prevent calling onMouseOver on the upper parents
          hoverNode(config.id);
        }}
        onMouseLeave={() => {
          leaveNode(config.id);
        }}
        onClick={(event: React.SyntheticEvent) => {
          event.stopPropagation(); // prevent calling onClick on the upper parents
          selectNode(config.id, defaultProps);
        }}
      >
        <InnerFrame
          displayName={config.displayName}
          state="hidden"
          {...(hoveredId === config.id && { state: 'hovered' })}
          {...(selectedId === config.id && { state: 'selected' })}
        />
        {children}
      </Component>
    );
  }) as T;
};
