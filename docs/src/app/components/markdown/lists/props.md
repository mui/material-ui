## List Props

### insetSubheader

Type: `bool`
Default: `false`

If true, the subheader will be indented by 72px.

### selectedItemStyle
Type: `object`
`optional`

Override the choosen inline-styles to indicate a <ListItem> is highlighted. You can set e.g. the background color here like this way: {{backgroundColor: #da4e49}}.


## List Props

<dl>
  <dt>insetSubheader</dt> 
  <dd><b>type: bool</b> <i>default: false</i></dd>
  <dd>If true, the subheader will be indented by 72px.</dd>

  <dt>
    insetSubheader
    <span style="font-style: normal; font-weight: normal; padding-left:20px; color:rgba(0, 0, 0, 0.54)">
      bool
    </span> 
    <span style="padding-left: 20px; font-weight: normal">
      default: false
    </span>
  </dt>
  <dd>If true, the subheader will be indented by 72px.</dd>

  <dt>selectedItemStyle</dt>
  <dd><b>type: object</b> <i>optional</i></dd>
  <dd>
   Override the choosen inline-styles to indicate a <ListItem> is
   highlighted. You can set e.g. the background color here like 
   this way: `{{backgroundColor: #da4e49}}`.
  </dd>

  <dt>style</dt>
  <dd><b>type: object</b> <i>optional</i></dd>
  <dd>
    Override the inline-styles of the list's root element.
  </dd>

  <dt>subheader</dt>
  <dd><b>type: node</b> <i>optional</i></dd>
  <dd>
    The subheader string that will be displayed at the top of the list.
  </dd>

  <dt>subheaderStyle</dt>
  <dd><b>type: object</b> <i>optional</i></dd>
  <dd>
    The style object to override subheader styles.
  </dd>

  <dt>valueLink</dt>
  <dd><b>type: valueLink</b> <i>optional</i> (only available if HOC SelectableContainerEnhance is used)</dd>
  <dd>
    Makes List controllable. Highlights the ListItem whose index prop 
    matches this `valueLink.value`. `valueLink.requestChange` represents 
    a callback function to change that value (e.g. in state).
  </dd>
</dl>
