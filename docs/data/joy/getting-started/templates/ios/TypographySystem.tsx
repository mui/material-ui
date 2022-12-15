import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function TypographySystem() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 5,
        gridTemplateColumns: 'repeat(4, 240px)',
        justifyContent: 'center',
        material: 'thin',
        p: 2,
        borderRadius: 'sm',
        '& > .wrapper': {
          display: 'flex',
          flexDirection: 'column',
          gap: '11px',
        },
      }}
    >
      <Typography level="caption2">Label Color</Typography>
      <Typography level="caption2">Secondary Label Color</Typography>
      <Typography level="caption2">Tertiary Label Color</Typography>
      <Typography level="caption2">Quarternary Label Color</Typography>

      <Box className="wrapper">
        <Typography level="largeTitle">LargeTitle</Typography>
        <Typography level="largeTitle" fontWeight="bold">
          LargeTitle
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="largeTitle" textColor="label.secondary">
          LargeTitle
        </Typography>
        <Typography level="largeTitle" textColor="label.secondary" fontWeight="bold">
          LargeTitle
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="largeTitle" textColor="label.tertiary">
          LargeTitle
        </Typography>
        <Typography level="largeTitle" textColor="label.tertiary" fontWeight="bold">
          LargeTitle
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="largeTitle" textColor="label.quarternary">
          LargeTitle
        </Typography>
        <Typography
          level="largeTitle"
          textColor="label.quarternary"
          fontWeight="bold"
        >
          LargeTitle
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography level="title1">TITLE1</Typography>
        <Typography level="title1" fontWeight="bold">
          Title1
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="title1" textColor="label.secondary">
          Title1
        </Typography>
        <Typography level="title1" textColor="label.secondary" fontWeight="bold">
          Title1
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="title1" textColor="label.tertiary">
          Title1
        </Typography>
        <Typography level="title1" textColor="label.tertiary" fontWeight="bold">
          Title1
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="title1" textColor="label.quarternary">
          Title1
        </Typography>
        <Typography level="title1" textColor="label.quarternary" fontWeight="bold">
          Title1
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography level="title2">Title2</Typography>
        <Typography level="title2" fontWeight="bold">
          Title2
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="title2" textColor="label.secondary">
          Title2
        </Typography>
        <Typography level="title2" textColor="label.secondary" fontWeight="bold">
          Title2
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="title2" textColor="label.tertiary">
          Title2
        </Typography>
        <Typography level="title2" textColor="label.tertiary" fontWeight="bold">
          Title2
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="title2" textColor="label.quarternary">
          Title2
        </Typography>
        <Typography level="title2" textColor="label.quarternary" fontWeight="bold">
          Title2
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography level="title3">Title3</Typography>
        <Typography level="title3" fontWeight="bold">
          Title3
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="title3" textColor="label.secondary">
          Title3
        </Typography>
        <Typography level="title3" textColor="label.secondary" fontWeight="bold">
          Title3
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="title3" textColor="label.tertiary">
          Title3
        </Typography>
        <Typography level="title3" textColor="label.tertiary" fontWeight="bold">
          Title3
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="title3" textColor="label.quarternary">
          Title3
        </Typography>
        <Typography level="title3" textColor="label.quarternary" fontWeight="bold">
          Title3
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography level="headline">Headline</Typography>
        <Typography level="headline" fontStyle="italic">
          Headline
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="headline" textColor="label.secondary">
          Headline
        </Typography>
        <Typography level="headline" textColor="label.secondary" fontStyle="italic">
          Headline
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="headline" textColor="label.tertiary">
          Headline
        </Typography>
        <Typography level="headline" textColor="label.tertiary" fontStyle="italic">
          Headline
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="headline" textColor="label.quarternary">
          Headline
        </Typography>
        <Typography
          level="headline"
          textColor="label.quarternary"
          fontStyle="italic"
        >
          Headline
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography>Body</Typography>
        <Typography fontWeight="600">Body</Typography>
        <Typography fontStyle="italic">Body</Typography>
        <Typography fontStyle="italic" fontWeight="600">
          Body
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography textColor="label.secondary">Body</Typography>
        <Typography textColor="label.secondary" fontWeight="600">
          Body
        </Typography>
        <Typography textColor="label.secondary" fontStyle="italic">
          Body
        </Typography>
        <Typography textColor="label.secondary" fontStyle="italic" fontWeight="600">
          Body
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography textColor="label.tertiary">Body</Typography>
        <Typography textColor="label.tertiary" fontWeight="600">
          Body
        </Typography>
        <Typography textColor="label.tertiary" fontStyle="italic">
          Body
        </Typography>
        <Typography textColor="label.tertiary" fontStyle="italic" fontWeight="600">
          Body
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography textColor="label.quarternary">Body</Typography>
        <Typography textColor="label.quarternary" fontWeight="600">
          Body
        </Typography>
        <Typography textColor="label.quarternary" fontStyle="italic">
          Body
        </Typography>
        <Typography
          textColor="label.quarternary"
          fontStyle="italic"
          fontWeight="600"
        >
          Body
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography level="callout">Callout</Typography>
        <Typography level="callout" fontWeight="600">
          Callout
        </Typography>
        <Typography level="callout" fontStyle="italic">
          Callout
        </Typography>
        <Typography level="callout" fontStyle="italic" fontWeight="600">
          Callout
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="callout" textColor="label.secondary">
          Callout
        </Typography>
        <Typography level="callout" textColor="label.secondary" fontWeight="600">
          Callout
        </Typography>
        <Typography level="callout" textColor="label.secondary" fontStyle="italic">
          Callout
        </Typography>
        <Typography
          level="callout"
          textColor="label.secondary"
          fontStyle="italic"
          fontWeight="600"
        >
          Callout
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="callout" textColor="label.tertiary">
          Callout
        </Typography>
        <Typography level="callout" textColor="label.tertiary" fontWeight="600">
          Callout
        </Typography>
        <Typography level="callout" textColor="label.tertiary" fontStyle="italic">
          Callout
        </Typography>
        <Typography
          level="callout"
          textColor="label.tertiary"
          fontStyle="italic"
          fontWeight="600"
        >
          Callout
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="callout" textColor="label.quarternary">
          Callout
        </Typography>
        <Typography level="callout" textColor="label.quarternary" fontWeight="600">
          Callout
        </Typography>
        <Typography level="callout" textColor="label.quarternary" fontStyle="italic">
          Callout
        </Typography>
        <Typography
          level="callout"
          textColor="label.quarternary"
          fontStyle="italic"
          fontWeight="600"
        >
          Callout
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography level="subheadline">Subheadline</Typography>
        <Typography level="subheadline" fontWeight="600">
          Subheadline
        </Typography>
        <Typography level="subheadline" fontStyle="italic">
          Subheadline
        </Typography>
        <Typography level="subheadline" fontStyle="italic" fontWeight="600">
          Subheadline
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="subheadline" textColor="label.secondary">
          Subheadline
        </Typography>
        <Typography level="subheadline" textColor="label.secondary" fontWeight="600">
          Subheadline
        </Typography>
        <Typography
          level="subheadline"
          textColor="label.secondary"
          fontStyle="italic"
        >
          Subheadline
        </Typography>
        <Typography
          level="subheadline"
          textColor="label.secondary"
          fontStyle="italic"
          fontWeight="600"
        >
          Subheadline
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="subheadline" textColor="label.tertiary">
          Subheadline
        </Typography>
        <Typography level="subheadline" textColor="label.tertiary" fontWeight="600">
          Subheadline
        </Typography>
        <Typography
          level="subheadline"
          textColor="label.tertiary"
          fontStyle="italic"
        >
          Subheadline
        </Typography>
        <Typography
          level="subheadline"
          textColor="label.tertiary"
          fontStyle="italic"
          fontWeight="600"
        >
          Subheadline
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="subheadline" textColor="label.quarternary">
          Subheadline
        </Typography>
        <Typography
          level="subheadline"
          textColor="label.quarternary"
          fontWeight="600"
        >
          Subheadline
        </Typography>
        <Typography
          level="subheadline"
          textColor="label.quarternary"
          fontStyle="italic"
        >
          Subheadline
        </Typography>
        <Typography
          level="subheadline"
          textColor="label.quarternary"
          fontStyle="italic"
          fontWeight="600"
        >
          Subheadline
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography level="footnote">FOOTNOTE</Typography>
        <Typography level="footnote" fontWeight="600">
          Footnote
        </Typography>
        <Typography level="footnote" fontStyle="italic">
          Footnote
        </Typography>
        <Typography level="footnote" fontStyle="italic" fontWeight="600">
          Footnote
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="footnote" textColor="label.secondary">
          FOOTNOTE
        </Typography>
        <Typography level="footnote" textColor="label.secondary" fontWeight="600">
          FOOTNOTE
        </Typography>
        <Typography level="footnote" textColor="label.secondary" fontStyle="italic">
          Footnote
        </Typography>
        <Typography
          level="footnote"
          textColor="label.secondary"
          fontStyle="italic"
          fontWeight="600"
        >
          Footnote
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="footnote" textColor="label.tertiary">
          Footnote
        </Typography>
        <Typography level="footnote" textColor="label.tertiary" fontWeight="600">
          Footnote
        </Typography>
        <Typography level="footnote" textColor="label.tertiary" fontStyle="italic">
          Footnote
        </Typography>
        <Typography
          level="footnote"
          textColor="label.tertiary"
          fontStyle="italic"
          fontWeight="600"
        >
          Footnote
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="footnote" textColor="label.quarternary">
          Footnote
        </Typography>
        <Typography level="footnote" textColor="label.quarternary" fontWeight="600">
          Footnote
        </Typography>
        <Typography
          level="footnote"
          textColor="label.quarternary"
          fontStyle="italic"
        >
          Footnote
        </Typography>
        <Typography
          level="footnote"
          textColor="label.quarternary"
          fontStyle="italic"
          fontWeight="600"
        >
          Footnote
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography level="caption1">Caption1</Typography>
        <Typography level="caption1" fontWeight="600">
          Caption1
        </Typography>
        <Typography level="caption1" fontStyle="italic">
          Caption1
        </Typography>
        <Typography level="caption1" fontStyle="italic" fontWeight="600">
          Caption1
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="caption1" textColor="label.secondary">
          Caption1
        </Typography>
        <Typography level="caption1" textColor="label.secondary" fontWeight="600">
          Caption1
        </Typography>
        <Typography level="caption1" textColor="label.secondary" fontStyle="italic">
          Caption1
        </Typography>
        <Typography
          level="caption1"
          textColor="label.secondary"
          fontStyle="italic"
          fontWeight="600"
        >
          Caption1
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="caption1" textColor="label.tertiary">
          Caption1
        </Typography>
        <Typography level="caption1" textColor="label.tertiary" fontWeight="600">
          Caption1
        </Typography>
        <Typography level="caption1" textColor="label.tertiary" fontStyle="italic">
          Caption1
        </Typography>
        <Typography
          level="caption1"
          textColor="label.tertiary"
          fontStyle="italic"
          fontWeight="600"
        >
          Caption1
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="caption1" textColor="label.quarternary">
          Caption1
        </Typography>
        <Typography level="caption1" textColor="label.quarternary" fontWeight="600">
          Caption1
        </Typography>
        <Typography
          level="caption1"
          textColor="label.quarternary"
          fontStyle="italic"
        >
          Caption1
        </Typography>
        <Typography
          level="caption1"
          textColor="label.quarternary"
          fontStyle="italic"
          fontWeight="600"
        >
          Caption1
        </Typography>
      </Box>

      <Box className="wrapper">
        <Typography level="caption2">Caption2</Typography>
        <Typography level="caption2" fontWeight="600">
          Caption2
        </Typography>
        <Typography level="caption2" fontStyle="italic">
          Caption2
        </Typography>
        <Typography level="caption2" fontStyle="italic" fontWeight="600">
          Caption2
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="caption2" textColor="label.secondary">
          Caption2
        </Typography>
        <Typography level="caption2" textColor="label.secondary" fontWeight="600">
          Caption2
        </Typography>
        <Typography level="caption2" textColor="label.secondary" fontStyle="italic">
          Caption2
        </Typography>
        <Typography
          level="caption2"
          textColor="label.secondary"
          fontStyle="italic"
          fontWeight="600"
        >
          Caption2
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="caption2" textColor="label.tertiary">
          Caption2
        </Typography>
        <Typography level="caption2" textColor="label.tertiary" fontWeight="600">
          Caption2
        </Typography>
        <Typography level="caption2" textColor="label.tertiary" fontStyle="italic">
          Caption2
        </Typography>
        <Typography
          level="caption2"
          textColor="label.tertiary"
          fontStyle="italic"
          fontWeight="600"
        >
          Caption2
        </Typography>
      </Box>
      <Box className="wrapper">
        <Typography level="caption2" textColor="label.quarternary">
          Caption2
        </Typography>
        <Typography level="caption2" textColor="label.quarternary" fontWeight="600">
          Caption2
        </Typography>
        <Typography
          level="caption2"
          textColor="label.quarternary"
          fontStyle="italic"
        >
          Caption2
        </Typography>
        <Typography
          level="caption2"
          textColor="label.quarternary"
          fontStyle="italic"
          fontWeight="600"
        >
          Caption2
        </Typography>
      </Box>
    </Box>
  );
}
