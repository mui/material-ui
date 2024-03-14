# Callouts

<p class="description">Type of callouts.</p>

## Header chips

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Feature list

### Approach 1: Componentized

Easier to protect the styles, but worse to read and write

{{"component": "modules/components/FeatureList.js", "features": ["Manages modal stacking when one-at-a-time just isn't enough.", "Creates a backdrop, for disabling interaction below the modal.", "It disables scrolling of the page content while open.", "It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.", "Adds the appropriate ARIA roles automatically."]}}

### Approach 2: Plain HTML

Easier to write and read, and potentially easier to violate the styles?

<ul class='feature-list'>
 <li>Manages modal stacking when one-at-a-time just isn't enough.</li>
 <li>Creates a backdrop, for disabling interaction below the modal.est</li>
 <li>It disables scrolling of the page content while open.</li>
 <li>It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.</li>
 <li>Adds the appropriate ARIA roles automatically.</li>
</ul>

### Approach 3: Custom markdown

<featureList>
- Manages modal stacking when one-at-a-time just isn't enough.
- Creates a backdrop, for disabling interaction below the modal.est
- It disables scrolling of the page content while open.
- It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
- Adds the appropriate ARIA roles automatically.
</featureList>
