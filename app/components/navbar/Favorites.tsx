'use client';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { GrFavorite } from "react-icons/gr";
import { NoSsr } from '@mui/material';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Favorites = () => {
  return (
    <NoSsr>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={2} color="secondary">
          <GrFavorite />
        </StyledBadge>
      </IconButton>
    </NoSsr>

  )
}

export default Favorites
