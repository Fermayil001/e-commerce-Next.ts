'use client';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { SlBasket } from "react-icons/sl";
import { NoSsr } from '@mui/material';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const OrderCount = () => {
  return (
    <NoSsr>
      <IconButton aria-label="cart" className='p-0! pr-2!'>
        <StyledBadge badgeContent={4} color="success">
          <SlBasket />
        </StyledBadge>
      </IconButton>
    </NoSsr>

  )
}

export default OrderCount
