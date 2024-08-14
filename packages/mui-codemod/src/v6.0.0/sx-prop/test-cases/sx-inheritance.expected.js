<Layout
  {...layoutProps}
  {...slotProps.layout}
  slots={slots}
  slotProps={slotProps}
  sx={[
    ...(Array.isArray(sx) ? sx : [sx]),
    ...(Array.isArray(slotProps?.layout?.sx) ? slotProps.layout.sx : [slotProps.layout.sx]),
  ]}
  className={clsx(className, slotProps.layout.className)}
  ref={ref}
/>;

<FormControl
  disabled={disabled}
  id={id}
  sx={[...(Array.isArray(formControlSx) ? formControlSx : [formControlSx])]}
/>;