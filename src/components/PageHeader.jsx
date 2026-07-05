import React, { memo } from 'react';
import { Box, Typography, Stack } from '@mui/material';

const PageHeader = memo(function PageHeader({ title, subtitle, action }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      {action && <Stack direction="row">{action}</Stack>}
    </Box>
  );
});

export default PageHeader;
