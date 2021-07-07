---
title: React Masonry component
components: Masonry
githubLabel: 'component: Masonry'
---

# Masonry

<p class="description">With horizontal ordering and column stacking, Masonry lays out content of different sizes without leaving gaps.</p>

Masonry maintains a list of content blocks with a consistent width but variable height. The contents are ordered from left to right and top to bottom. If a row is already filled with the specified number of columns, the next item starts another row starts, and it is added to the shortest column.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic Masonry

{{"demo": "pages/components/masonry/BasicMasonry.js", "bg": true}}

```js
<Masonry cols={4} gap={10}>
  {divData.map((item, idx) => (
    <MasonryItem key={idx}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: item.height,
          border: '1px solid black',
          backgroundColor: 'white',
        }}
      >
        {idx + 1}
      </div>
    </MasonryItem>
  ))}
</Masonry>
```

## Image Masonry

{{"demo": "pages/components/masonry/ImageMasonry.js", "bg": true}}
