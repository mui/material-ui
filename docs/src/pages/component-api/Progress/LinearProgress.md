LinearProgress
==============



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| className | string |  |  |
| mode | enum:&nbsp;'determinate'<br>&nbsp;'indeterminate'<br>&nbsp;'buffer'<br>&nbsp;'query'<br> | 'indeterminate' | The mode of show your progress, indeterminate for when there is no value for progress. |
| value | number | 0 | The value of progress, only works in determinate and buffer mode. Value between 0 and 100. |
| valueBuffer | number |  | The value of buffer, only works in buffer mode. Value between 0 and 100. |

Any other properties supplied will be spread to the root element.
