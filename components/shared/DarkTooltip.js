import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const DarkTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);